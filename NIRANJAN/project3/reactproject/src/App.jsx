//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import AssignFaculty from "./AssignFaculty/AssignFaculty";
//import MaintenanceList from "./MaintenanceList/MaintenanceList";
import Login from "./Loginpage/Login";
import Home from "./Homepage/Home";
// import SicDash from "./SIC/SicDash";  // Import SicDash component
// import Stockdetails from "./Stockdetailspage/Stockdetails";
// import TskDash from "./TSK/TskDash";
// import MainStockdetails from "./MainStock/MainStockdetails";
// import ForwardStockTsk from "./ForwardStockTsk/ForwardStockTsk";
import HodDash from "./HOD/HodDash";
//import NotificationPanel from "./notificationpanel/notificationpanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
         
        <Route path="/login" element={<Login />} />
         
        <Route path="/Hoddash" element={<HodDash/>}/>
         
      </Routes>
    </Router>
   
  );
}

export default App;
