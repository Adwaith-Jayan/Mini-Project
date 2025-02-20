import React, { useState,useEffect } from 'react';
import './Addstock.css';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

const AddStocksic = () => {
    const navigate = useNavigate();
    const [Email, setEmail] = useState(null);
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
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const decoded = jwtDecode(token);
            setEmail(decoded.email);
          } catch (error) {
            console.error("Invalid Token:", error);
          }
        }
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dbData = { ...formData, Email};

        try {
            const response = await axios.post('http://localhost:5000/api/add-stock-sic', dbData);
            setMessage(response.data.message);
            alert("Stock Added Successfully!");
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
                    name="specification" 
                    value={formData.specification} 
                    onChange={handleChange} 
                    required 
                />
                <TextField 
                    label="Quantity" 
                    variant="outlined" 
                    name="qty" 
                    value={formData.qty} 
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
