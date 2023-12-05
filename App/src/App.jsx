import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, HashRouter } from "react-router-dom";

import EmployeeDirectory from "./Components/EmployeeDirectory.jsx";
import EmployeeUpdate from "./Components/EmployeeUpdate.jsx";

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<EmployeeDirectory />} />
        <Route path="/Update/:id" element={ <EmployeeUpdate /> }  />
      </Routes>
    );
  }
}

const element = document.getElementById("contents");

// Use createRoot to render your app
const root = ReactDOM.createRoot(element);
root.render(<HashRouter><App /></HashRouter>);