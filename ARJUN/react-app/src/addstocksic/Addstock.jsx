import React, { useState } from 'react';
import './Addstock.css';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddStocksic = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        sl_no: '',
        indent_no: '',
        qty: '',
        warranty_period: '',
        date_of_purchase: '',
        price: '',
        specification: '',
        type: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dbData = { ...formData, department: '' };

        try {
            const response = await axios.post('http://localhost:5000/api/forward-stock-tsk', dbData);
            setMessage(response.data.message);
            alert("Stock Forwarded Successfully!");
            navigate('/Sicdash');
        } catch (error) {
            console.error("Error forwarding stock:", error);
            setMessage(error.response?.data?.error || "Something went wrong!");
        }
    };

    return (
        <div className="addstock-container">
            <h1>Add Stock</h1>
            {message && <p className="addstockmessage">{message}</p>}
            <form className="addstock-form" onSubmit={handleSubmit}>
                <TextField 
                    label="Indent No" 
                    variant="outlined" 
                    name="indent_no" 
                    value={formData.indent_no} 
                    onChange={handleChange} 
                    required 
                />
                <TextField 
                    label="Serial No" 
                    variant="outlined" 
                    name="sl_no" 
                    value={formData.sl_no} 
                    onChange={handleChange} 
                    required 
                />

                <TextField 
                    label="Name" 
                    variant="outlined" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />

                <TextField 
                    label="Type" 
                    variant="outlined" 
                    name="type" 
                    value={formData.type} 
                    onChange={handleChange} 
                    required 
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
                />
                <TextField 
                    label="Warranty Period" 
                    variant="outlined" 
                    name="warranty_period" 
                    value={formData.warranty_period} 
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
                />

                <TextField 
                    label="specification" 
                    variant="outlined" 
                    name="Specification" 
                    value={formData.specification} 
                    onChange={handleChange} 
                    required 
                />

                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    endIcon={<SendIcon />}
                >
                    Add
                </Button>
            </form>
        </div>
    );
};

export default AddStocksic;
