import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssignFaculty from "./AssignFaculty/AssignFaculty";
import MaintenanceList from "./MaintenanceList/MaintenanceList";
import Login from "./Loginpage/Login";
import Home from "./Homepage/Home";
import SicDash from "../../ANAND/dash/src/SIC/SicDash"
import Stockdetails from "./Stockdetailspage/Stockdetails";

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
      </Routes>
    </Router>
   
  );
}

export default App;
