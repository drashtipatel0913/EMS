import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function EmsNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-light">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontFamily:
              "Afacad, sans-serif, Klee One, cursive, Quicksand, sans-serif, Tangerine, cursive",
            fontSize: "2.5rem",
            color: "#0a53be",
          }}
        >
          EMS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link
              as={NavLink}
              to="/create-employee"
              className="fw-bold me-3"
            >
              Create Employees
            </Nav.Link>
            <Nav.Link as={NavLink} to="/view-employee" className="fw-bold">
              View Employees
            </Nav.Link>
            <Nav.Link as={NavLink} to="/retirements" className="fw-bold">
              Upcoming Retirements
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default EmsNavbar;
