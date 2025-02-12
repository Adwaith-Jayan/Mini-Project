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
import AssignFaculty from "../../../ADWAITH/src/AssignFaculty/AssignFaculty";
import AddStock from "../../../ANAND/dash/src/Addstock/AddStock";
import PrincipalDash from "../../../ANAND/dash/src/Principal/PrincipalDash";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/Hoddash" element={<HodDash/>}></Route>
        <Route path="/stockdetails" element={<Stockdetails />} />
        <Route path="/stockstatus" element={<Stockstatusupdate/>}></Route>
        <Route path="/stockwarranty" element={<Stockwarranty/>} />
        <Route path="/stocktransfer" element={<Stocktransfer/>} />
        <Route path="/userprofile" element={<UserProfile/>} />
        <Route path="/deleteacc" element={<Deleteacc/>}/>
        <Route path="/stockclears" element={<Stockclears/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/assign" element={<AssignFaculty/>}/>
        <Route path="/principaldash" element={<PrincipalDash/>}/>
      </Routes>
    </Router>
  );
}

export default App;
