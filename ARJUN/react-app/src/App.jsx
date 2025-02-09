
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage/Home"; 
import Login from "./Loginpage/Login"; 
import Stockstatusupdate from "./Stockstatusupdatepage/Stockstatusupdate";
import Stocktransfer from "./Stocktransfer/stocktransfer";
import Stockverifications from "./Stockverification/Stockverification";
import Stockwarranty from "./Stockwarranty/Stockwarranty";
import Stockdetails from "./Stockdetailspage/Stockdetails";
import Stockclears from "./Stockclearence/Stockclearence";
import Register from "./Registerpage/Register";
import Deleteacc from "./deleteaccount/Deleteaccount";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Deleteacc/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
