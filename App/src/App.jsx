import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, HashRouter } from "react-router-dom";

import EmployeeDirectory from "./Components/Employee/EmployeeDirectory.jsx";
import EmployeeDetails from "./Components/Employee/EmployeeDetails.jsx";
import EmployeeCreate from "./Components/Employee/EmployeeCreate.jsx";
import EmployeeUpdate from "./Components/Employee/EmployeeUpdate.jsx";
import EmployeeTable from "./Components/Employee/EmployeeTable.jsx";
import EmployeeRetirement from "./Components/Employee/EmployeeRetirement.jsx";

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<EmployeeDirectory />} />
        <Route path="/create-employee" element={<EmployeeCreate />} />
        <Route path="/view-employee" element={<EmployeeTable />} />
        <Route path="/Update/:id" element={ <EmployeeUpdate /> }  />
        <Route path="/Details/:id" element={<EmployeeDetails/>}/>
        <Route path="/retirements" element={<EmployeeRetirement/>}/>
      </Routes>
    );
  }
}

const element = document.getElementById("contents");

// Use createRoot to render your app
const root = ReactDOM.createRoot(element);
root.render(<HashRouter><App /></HashRouter>);