import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssignFaculty from "./AssignFaculty/AssignFaculty";
import MaintenanceList from "./MaintenanceList/MaintenanceList";
import Login from "./Loginpage/Login";
import Home from "./Homepage/Home";
import SicDash from "./SIC/SicDash";  // Import SicDash component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assign-faculty" element={<AssignFaculty />} />
        <Route path="/maintenance-list" element={<MaintenanceList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SicDash" element={<SicDash />} />  {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
