import React, { useState } from 'react';
import './ForwardStockTsk.css';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForwardStockTsk = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        sl_no: '',
        indent_no: '',
        date_of_purchase: '',
        price: '',
        department: 'CSE' 
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
                />

                <TextField 
                    label="Indent No" 
                    variant="outlined" 
                    name="indent_no" 
                    value={formData.indent_no} 
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
                    label="Price" 
                    type="number" 
                    variant="outlined" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    required 
                />

                <TextField 
                    label="Department" 
                    variant="outlined" 
                    name="department" 
                    value="CSE" 
                    disabled 
                />

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

export default ForwardStockTsk;
