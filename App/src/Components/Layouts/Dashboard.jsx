import React, { Component } from "react";
import { Link } from "react-router-dom";

// Bootstrap Components Imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class Dashboard extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="flex-nowrap">
          <Col xs={12} md={3} xl={2} className="px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <Link
                to="/dashboard"
                style={{
                  fontFamily:
                    "Afacad, sans-serif, Klee One, cursive, Quicksand, sans-serif, Tangerine, cursive",
                  fontSize: "2.5rem",
                  
                }}
                  className="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                EMS                
              </Link>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li className="w-100">
                  <Link
                    to="/dashboard"
                    className="nav-link text-white px-0 align-middle"
                  >
                    <i className="fs-5 bi-speedometer2 ms-2"></i>
                    <span className="ms-3 d-none d-sm-inline">Dashboard</span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link
                    to="/dashboard/employee"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-5 bi-people ms-2"></i>
                    <span className="ms-3 d-none d-sm-inline">
                      Manage Employees
                    </span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link
                    to="/dashboard/category"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-5 bi-columns ms-2"></i>
                    <span className="ms-3 d-none d-sm-inline">Category</span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link
                    to="/dashboard/profile"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-5 bi-person ms-2"></i>
                    <span className="ms-3 d-none d-sm-inline">Profile</span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link className="nav-link px-0 align-middle text-white">
                    <i className="fs-5 bi-power ms-2"></i>
                    <span className="ms-3 d-none d-sm-inline">Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col className="p-0 m-0">
            <div className="p-2 d-flex justify-content-center shadow">
              <h4>Employee Management System</h4>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
