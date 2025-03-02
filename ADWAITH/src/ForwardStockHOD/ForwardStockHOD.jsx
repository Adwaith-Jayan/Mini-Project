import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, MenuItem, Select, InputLabel, FormControl, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import './ForwardStockHOD.css';

const ForwardStockHOD = () => {
    const navigate = useNavigate();
    
    // State for form data
    const [formData, setFormData] = useState({
        sl_no: '',
        indent_no: '',
        item_name: '',  // User must enter this
        quantity: '',
        price: '',
        date_of_purchase: '',
        premise: '',
    });

    const [message, setMessage] = useState('');
    const [inventoryList, setInventoryList] = useState([]); // Room names
    const [availableStock, setAvailableStock] = useState([]); // Available stock data

    // Fetch available stock when component loads
    useEffect(() => {
        const fetchAvailableStock = async () => {
            try {
                const response = await axios.get("http://localhost:5000/fetch-stock");
                if (response.data.length > 0) {
                    const stockData = response.data[0]; // Fetch first available stock
                    setFormData({
                        sl_no: stockData.sl_no,
                        indent_no: stockData.indent_no,
                        price: stockData.price,
                        date_of_purchase: stockData.date_of_purchase,
                        quantity: stockData.remaining, // Remaining stock is pre-filled
                        premise: ''
                    });
                }
                setAvailableStock(response.data);
            } catch (error) {
                console.error("Error fetching stock:", error);
                setMessage("Failed to fetch available stock.");
            }
        };

        fetchAvailableStock();
    }, []);

    // Fetch room names for premise dropdown
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get("http://localhost:5000/inventory");
                setInventoryList(response.data); // Set room names from DB
            } catch (error) {
                console.error("Error fetching inventory:", error);
            }
        };

        fetchInventory();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedStock = {
            ...formData,
            sl_no: parseInt(formData.sl_no, 10),
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity, 10),
            department: 'CSE'
        };

        if (isNaN(updatedStock.sl_no) || isNaN(updatedStock.price) || isNaN(updatedStock.quantity)) {
            setMessage("Serial Number, Price, and Quantity must be valid numbers.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/forward-stock-hod", updatedStock);
            alert("Stock Forwarded Successfully!");
            navigate('/Tskdash');
        } catch (error) {
            console.error("Error forwarding stock:", error);
            setMessage(error.response?.data?.error || "Something went wrong!");
        }
    };

    return (
        <div className="forward-container">
            <h1>Forward Stock</h1>
            {message && <p className="message">{message}</p>}
            
            <form className="forward-form" onSubmit={handleSubmit}>
                <TextField 
                    label="Serial No" 
                    variant="outlined" 
                    name="sl_no" 
                    value={formData.sl_no} 
                    onChange={handleChange} 
                    required 
                    disabled 
                />

                <TextField 
                    label="Indent No" 
                    variant="outlined" 
                    name="indent_no" 
                    value={formData.indent_no} 
                    onChange={handleChange} 
                    required 
                    disabled 
                />

                <TextField 
                    label="Item Name" 
                    variant="outlined" 
                    name="item_name" 
                    value={formData.item_name} 
                    onChange={handleChange} 
                    required 
                />

                <TextField 
                    label="Quantity"  
                    type="number" 
                    variant="outlined" 
                    name="quantity" 
                    value={formData.quantity} 
                    onChange={handleChange} 
                    required 
                />

                <TextField 
                    label="Price" 
                    type="number" 
                    variant="outlined" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    required 
                    disabled 
                />

                <TextField 
                    label="Date of Purchase" 
                    type="date" 
                    variant="outlined" 
                    name="date_of_purchase" 
                    value={formData.date_of_purchase} 
                    onChange={handleChange} 
                    InputLabelProps={{ shrink: true }} 
                    required 
                    disabled 
                />

                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Premise</InputLabel>
                    <Select
                        name="premise"
                        value={formData.premise}
                        onChange={handleChange}
                        label="Premise"
                    >
                        {inventoryList.map((room) => (
                            <MenuItem key={room._id} value={room.name}>
                                {room.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    endIcon={<SendIcon />}
                >
                    Forward
                </Button>
            </form>
        </div>
    );
};

export default ForwardStockHOD;
