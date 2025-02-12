// src/App.jsx
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
import UserProfile from "./profilesetting/Profilesetting";
import { Delete } from "lucide-react";
import HodDash from "../../../ANAND/dash/src/HOD/HodDash";
<<<<<<< HEAD
import SicDash from "../../../ANAND/dash/src/SIC/SicDash"

=======
import AssignFaculty from "../../../ADWAITH/src/AssignFaculty/AssignFaculty";
import AddStock from "../../../ANAND/dash/src/Addstock/AddStock";
>>>>>>> 10c55880759eb34a4c4a2d7a3ac6e601d5c1cf23

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/Hoddash" element={<AddStock/>}></Route>
        <Route path="/stockdetails" element={<Stockdetails />} />
        <Route path="/stockstatus" element={<Stockstatusupdate/>}></Route>
        <Route path="/stockwarranty" element={<Stockwarranty/>} />
        <Route path="/stocktransfer" element={<Stocktransfer/>} />
        <Route path="/userprofile" element={<UserProfile/>} />
<<<<<<< HEAD
        <Route path="/deleteacc" element={<Deleteacc/>}/>
        <Route path="/stockclears" element={<Stockclears/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/assign" element={<AssignFaculty/>}/>

=======
        <Route path="/register" element={<Register/>} />
<<<<<<< HEAD
        <Route path="/Sicdash" element={<SicDash/>}/>
=======
>>>>>>> 83bc859d5ff52beecf3e4e02b02daef43da68ac6
>>>>>>> 10c55880759eb34a4c4a2d7a3ac6e601d5c1cf23
    
      </Routes>
    </Router>
  );
}

export default App;
