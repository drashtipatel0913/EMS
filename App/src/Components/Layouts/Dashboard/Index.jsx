import React from "react"

// Layout Imports
import Navbar from "./Navbar.jsx"
import SettingsPanel from "./SettingsPanel.jsx"
import Content from "./Content.jsx"
import Sidebar from "./Sidebar.jsx"
import Footer from "./Footer.jsx"

const Dashboard = () => (
  <>
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <SettingsPanel />
        <Sidebar />
        <Content />
      </div>
      <Footer />
    </div>
  </>
)

export default Dashboard