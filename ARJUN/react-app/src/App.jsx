// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage/Home"; 
import Login from "./Loginpage/Login"; 
import Stockstatusupdate from "./Stockstatusupdatepage/Stockstatusupdate";
import StockDetails from "./Stockdetailspage/Stockdetails";
import Stocktransfer from "./Stocktransfer/stocktransfer";
import Stockverifications from "./Stockverification/Stockverification";
import Stockwarranty from "./Stockwarranty/Stockwarranty";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Stockwarranty/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
