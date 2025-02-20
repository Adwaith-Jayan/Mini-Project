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


// API endpoint to forward stock
router.post('/api/add-stock-sic', async (req, res) => {
    try {
        const { name,sl_no, indent_no,qty,warranty_period, date_of_purchase, price, specification,type,Email } = req.body;

        // Validate input
        if (!sl_no || !indent_no || !date_of_purchase || !price ||!name || !qty || !warranty_period || !specification) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        let counter = await Counter.findOne({ name: 'item_no_counter' });

        if (!counter) {
            // Initialize counter if not found
            counter = new Counter({ name: 'item_no_counter', value: 0 });
            await counter.save();
        }

        let startCount = counter.value; 
        let endCount = startCount + qty; 
        // Create new stock entry
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

        // Save to MongoDB
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

        for(let i=startCount+1;i<=endCount;i++)
        {
            let itemnoformat = `RIT/CSE/${labname}/${name} ${i}`;
            const newbelongs = new BelongsTo({
                item_no: itemnoformat,
                room_no: roomnodata
            });
            await newbelongs.save();
            const newinclude = new Includes({
                item_no: itemnoformat,
                indent_no: indent_no,
                sl_no: sl_no
            });
            await newinclude.save();

            const newitem = new Item({
              item_no: itemnoformat,
              status: "Working",
              type: type
            });

            await newitem.save();

        }
        
        counter.value = endCount;
        await counter.save();



        res.status(201).json({ message: "Stock added successfully!", data: newStock });
    } catch (error) {
        console.error("Error forwarding stock:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
