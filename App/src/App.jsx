import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, HashRouter } from "react-router-dom";
import { ColorModeContext, useMode } from "../src/theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";

import EmployeeDirectory from "./Components/Employee/EmployeeDirectory.jsx";
import EmployeeDetails from "./Components/Employee/EmployeeDetails.jsx";
import EmployeeCreate from "./Components/Employee/EmployeeCreate.jsx";
import EmployeeUpdate from "./Components/Employee/EmployeeUpdate.jsx";
import EmployeeTable from "./Components/Employee/EmployeeTable.jsx";
import EmployeeRetirement from "./Components/Employee/EmployeeRetirement.jsx";
import TopBar from "./pages/global/Topbar.jsx";

const App = () => {
  const { colorMode, theme } = useMode();
console.log("colorMode:", colorMode); // Add this line
  return (
    <ColorModeContext.Provider value={{ colorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<EmployeeDirectory />} />
          <Route path="/create-employee" element={<EmployeeCreate />} />
          <Route path="/view-employee" element={<EmployeeTable />} />
          <Route path="/Update/:id" element={<EmployeeUpdate />} />
          <Route path="/Details/:id" element={<EmployeeDetails />} />
          <Route path="/retirements" element={<EmployeeRetirement />} />
        </Routes>
        <main className="content">
          <TopBar />
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const element = document.getElementById("contents");

// Use createRoot to render your app
const root = ReactDOM.createRoot(element);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);