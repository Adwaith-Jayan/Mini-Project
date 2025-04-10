import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssignFaculty from "./AssignFaculty/AssignFaculty";
import MaintenanceList from "./MaintenanceList/MaintenanceList";
import Login from "./Loginpage/Login";
import Home from "./Homepage/Home";
import SicDash from "./SIC/SicDash";  // Import SicDash component
import Stockdetails from "./Stockdetailspage/Stockdetails";
import TskDash from "./TSK/TskDash";
import MainStockdetails from "./MainStock/MainStockdetails";
import ForwardStockTsk from "./ForwardStockTsk/ForwardStockTsk";
import HodDash from "./HOD/HodDash";
import NotificationPanel from "./notificationpanel/notificationpanel";
import ForwardStockHOD from "./ForwardStockHOD/ForwardStockHOD";
import AddStockforward from "./addstocksic/Addstockforward";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assign-faculty" element={<AssignFaculty />} />
        <Route path="/maintenance-list" element={<MaintenanceList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Sicdash" element={<SicDash />} />  {/* Add this line */}
        <Route path="stockdetails" element={<Stockdetails/>}/>
        <Route path="/Tskdash" element={<TskDash/>}/>
        <Route path="/mainstockdetails" element={<MainStockdetails/>}/>
        <Route path="/forwardstocktsk" element={<ForwardStockTsk/>}/>
        <Route path="/Hoddash" element={<HodDash/>}/>
        <Route path="/notify" element={<NotificationPanel/>}/>
        <Route path="/forwardstockhod" element={<ForwardStockHOD/>}/>
        <Route path="/addstockforward" element={<AddStockforward/>}/>
      </Routes>
    </Router>
   
  );
}

export default App;
