
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
//import HodDash from "../../../ANAND/dash/src/HOD/HodDash";
import HodDash from "../../../ADWAITH/src/HOD/HodDash";
import SicDash from "../../../ANAND/dash/src/SIC/SicDash";
import PrincipalDash from "../../../ANAND/dash/src/Principal/PrincipalDash";
import CustodianDash from "../../../ANAND/dash/src/Custodian/CustodianDash";
import NotificationPanel from "./notificationpanel/notification";
import AddStocksic from "./addstocksic/Addstock";
import MaintenanceList from "./MaintenanceList/MaintenanceList";
import RegisterComplaint from "./registercomplaint/Registercomplaint";
import Maintenancehistorydetails from "./Maintenancehistory/MaintenanceHistory";
import AssignFaculty from "./Assignfacultybyprincipal/Assignfaculty";
import VerifierDash from "./verifierdashboard/verifierdash";



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
        <Route path="/Sicdash" element={<SicDash/>}/>
        <Route path="/custdash" element={<CustodianDash/>}/>
        <Route path="/principaldash" element={<PrincipalDash/>}/>
        <Route path="/notify" element={<NotificationPanel/>}/>
        <Route path="/addstocksic" element={<AddStocksic/>}/>
        <Route path="/maintenance" element={<MaintenanceList/>}/>
        <Route path="/regcomplaint" element={<RegisterComplaint/>}/>
        <Route path="/maintenancehist" element={<Maintenancehistorydetails/>}/>
        <Route path="/assignfaculty" element={<AssignFaculty/>}/>
        <Route path="/stockverify" element={<Stockverifications/>}/>
        <Route path="/verifydash" element={<VerifierDash/>}/>

      </Routes>
    </Router>
  );
}

export default App;
