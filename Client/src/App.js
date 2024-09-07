import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/Employee/EmployeeDashboard/EmployeeList.js';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import EmployeeCreate from './components/Employee/EmployeeDashboard/EmployeeCreate.js';
import EmployeeUpdate from './components/Employee/EmployeeDashboard/EmployeeUpdate.js';
import EmployeeDetailsPage from './components/Employee/EmployeeDashboard/EmployeeDetailsPage.js';

function App() {
  return (
    <HashRouter>
        <Routes>
          <Route path="/" element={<EmployeeDashboard />} />
          <Route path="/view-employee" element={<EmployeeList />} />
          <Route path="/create-employee" element={<EmployeeCreate />} />
          <Route path="/update/:id" element={<EmployeeUpdate />} />
          <Route path="/details/:id" element={<EmployeeDetailsPage />} />
          {/* <Route path="/retirements" element={<EmployeeRetirement />} /> */}
        </Routes>
    </HashRouter>
  );
}

export default App;