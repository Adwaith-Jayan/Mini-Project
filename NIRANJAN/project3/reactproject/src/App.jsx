import React from "react";
/*
import NewStockSystem from ".//NewStockSystem";

function App() {
  return <NewStockSystem />;
}*/
/*
import AssignedFaculties from ".//AssignedFaculties";

function App() {
  return (
    <div className="app-container">
      <AssignedFaculties />
    </div>
  );
}*/
/*
import ReportPage from ".//ReportPage"; // Import the ReportPage component
import ".//App.css";
function App() {
  return (
    <div className="App">
      <ReportPage /> {/* Display the Report Page }
    </div>
  );
}
*/

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequestStockReport from ".//RequestStockReport";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequestStockReport />} />
      </Routes>
    </Router>
  );
}



export default App;