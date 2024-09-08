import React from 'react'
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container"

function Navbar() {
    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <Link
                    to="/"
                    className=" fw-bold text-decoration-none text-dark"
                >
                    <h3 className="mb-0">
                        Employee Management System
                    </h3>
                </Link>
                <button className="btn text-primary fw-semibold">
                    Sign In
                </button>
            </div>
        </Container>

    )
}

export default Navbar
