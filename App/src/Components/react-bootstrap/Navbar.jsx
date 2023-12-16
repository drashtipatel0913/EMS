import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function EmsNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-light">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              alt="EmsLogo"
              src="/assets/logo/ems-logo.png"
              width="60"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link as={NavLink} to="/create-employee" className="fw-bold me-3">Create Employees</Nav.Link>
              <Nav.Link as={NavLink} to="/view-employee" className="fw-bold">View Employees</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default EmsNavbar;
