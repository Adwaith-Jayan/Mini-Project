import express from 'express';
import mongoose from 'mongoose';
import Stock from './Stock.js';
import Room from './Roommodel.js';
import Item from './Item.js';
import Includes from './Includes.js';
import BelongsTo from './BelongsTo.js';
import Access from './Access.js';
import Counter from './Counter.js';

const router = express.Router();



router.post('/api/add-stock-sic', async (req, res) => {
    try {
        const { name,sl_no, indent_no,qty,warranty_period, date_of_purchase, price, specification,type,Email } = req.body;

      
        if (!sl_no || !indent_no || !date_of_purchase || !price ||!name || !qty || !warranty_period || !specification) {
            return res.status(400).json({ error: "All fields are required!" });
        }
 
       
        const newStock = new Stock({
            name,
            sl_no,
            indent_no,
            qty,
            warranty_period,
            date_of_purchase,
            price,
            specification
        });

       
        await newStock.save();
        if (!Email) {
            return res.status(400).json({ error: "Email is required!" });
        }

        const accessdata = await Access.findOne({ email_id: Email });
        if (!accessdata) {
            return res.status(404).json({ error: "Access data not found for the provided email." });
        }
        const roomnodata = accessdata.room_no;

        const roomdata = await Room.findOne({ room_no: roomnodata });
        const labname = roomdata.name;

        let counter = await Counter.findOne({ labname: labname,itemname: name });
        

        if (!counter) {
            
            counter = new Counter({ labname: labname,itemname: name, value: 0 });
            await counter.save();
        }

        let startCount = counter.value; 
        let endCount = startCount + (parseInt(qty, 10) || 0);

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            for (let i = startCount + 1; i <= endCount; i++) {
                let itemnoformat = `RIT/CSE/${labname}/${name} ${i}`;

                await new BelongsTo({ item_no: itemnoformat, room_no: roomnodata }).save({ session });
                await new Includes({ item_no: itemnoformat, indent_no, sl_no }).save({ session });
                await new Item({ item_no: itemnoformat, status: "Working", type }).save({ session });
            }

            counter.value = endCount;
            await counter.save({ session });

            await session.commitTransaction();
            return res.status(201).json({ message: 'Stock added successfully' });
        } catch (error) {
            await session.abortTransaction();
            console.error('Error adding stock:', error);
            return res.status(500).json({ message: 'Failed to add stock', error: error.message })
        } finally {
            session.endSession();
        }
    } catch (error) {
        console.error("Error forwarding stock:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
