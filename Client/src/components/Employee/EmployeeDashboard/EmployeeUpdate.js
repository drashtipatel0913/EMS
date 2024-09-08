import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { updateEmployee, fetchEmployeeData } from "../../../services/EmployeeCRUD";
import { Form, Button, Alert, Row, Col, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card"
import Navbar from '../../Navbar'

const EmployeeUpdate = () => {
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState("");
    const [employeeData, setEmployeeData] = useState({
        firstName: "",
        lastName: "",
        dateOfJoining: "",
        age: "",
        title: "",
        employeeType: "",
        department: "",
        currentStatus: "",
    });
    const { id } = useParams();

    useEffect(() => {
        fetchEmployeeData(id)
            .then((data) => {
                setEmployeeData(data);
            })
            .catch((error) => {
                console.error("Error fetching employee data:", error);
            });
    }, [id]);

    const updateForm = async (event) => {
        event.preventDefault();
        setMessage("");
        setErrors([]);

        let errors = [];

        // Validate form inputs
        if (!employeeData.firstName) errors.push("First name is required!");
        if (!employeeData.lastName) errors.push("Last name is required!");
        if (!employeeData.age) errors.push("Age is required!");
        if (employeeData.age < 20 || employeeData.age > 70)
            errors.push("Age should be between 20 to 70");
        if (!employeeData.title) errors.push("Title is required!");
        if (!employeeData.department) errors.push("Department is required!");
        if (!employeeData.employeeType) errors.push("Employee Type is required!");
        if (employeeData.currentStatus === "") errors.push("Current Status is required!");

        setErrors(errors);

        if (errors.length === 0) {
            const data = {
                firstName: employeeData.firstName,
                lastName: employeeData.lastName,
                age: parseInt(employeeData.age),
                title: employeeData.title,
                department: employeeData.department,
                employeeType: employeeData.employeeType,
                currentStatus: employeeData.currentStatus === "true", // Convert to Boolean
            };

            try {
                await updateEmployee(id, data);
                setMessage("Employee Updated Successfully");

                // Hide the message after a delay
                setTimeout(() => {
                    setMessage("");
                }, 2000); // Message disappears after 2 seconds
            } catch (error) {
                setErrors([error.message]);
            }
        }
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const errorList = errors.map((error, index) => (
        <Alert key={index} variant="danger">
            {error}
        </Alert>
    ));

    return (
        <React.Fragment>
            <Container className="mt-5">
                <Navbar />
                <Card className="m-3 border-0" >
                    {errorList}
                    <Form onSubmit={updateForm} className="form py-3">
                        <h5 className="pb-2">Employee Information Update Form</h5>
                        <Row className="py-1">
                            <Col>
                                {message && (
                                    <Alert variant="success" role="alert">
                                        {message}
                                    </Alert>
                                )}
                            </Col>
                        </Row>
                        <Row className="py-1">
                            <Col md={6}>
                                <Form.Group controlId="formFirstName">
                                    <Form.Label>First Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={employeeData.firstName}
                                        onChange={onChange}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formDateOfJoining">
                                    <Form.Label>Date of joining:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dateOfJoining"
                                        className="form-control"
                                        value={employeeData.dateOfJoining}
                                        onChange={onChange}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="py-1">
                            <Col md={6}>
                                <Form.Group controlId="formLastName">
                                    <Form.Label>Last Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={employeeData.lastName}
                                        onChange={onChange}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formDepartment">
                                    <Form.Label>Department:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="department"
                                        className="form-select"
                                        value={employeeData.department}
                                        onChange={onChange}
                                    >
                                        <option value="Engineering">Engineering</option>
                                        <option value="HR">HR</option>
                                        <option value="IT">IT</option>
                                        <option value="Marketing">Marketing</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="py-1">
                            <Col md={6}>
                                <Form.Group controlId="formAge">
                                    <Form.Label>Age:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="age"
                                        className="form-control"
                                        value={employeeData.age}
                                        onChange={onChange}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Title:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="title"
                                        className="form-select"
                                        value={employeeData.title}
                                        onChange={onChange}
                                    >
                                        <option value="Director">Director</option>
                                        <option value="Employee">Employee</option>
                                        <option value="VP">VP</option>
                                        <option value="Manager">Manager</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="py-1">
                            <Col md={6}>
                                <Form.Group controlId="formEmployeeType">
                                    <Form.Label>Employee of Type:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="employeeType"
                                        className="form-select"
                                        value={employeeData.employeeType}
                                        disabled
                                    >
                                        <option value="FullTime">FullTime</option>
                                        <option value="PartTime">PartTime</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Seasonal">Seasonal</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formCurrentStatus">
                                    <Form.Label>Current Status:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="currentStatus"
                                        className="form-select"
                                        value={employeeData.currentStatus}
                                        onChange={onChange}
                                    >
                                        <option value={true}>Working</option>
                                        <option value={false}>Retired</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="py-1">
                            <Col>
                                <Button
                                    variant="outline-dark"
                                    className="my-5 w-25"
                                    type="submit"
                                >
                                    Update Employee
                                </Button>
                            </Col>
                        </Row>
                        <Link
                            to="/view-employee"
                            className="ms-3 my-2 w-25 fw-bold text-decoration-none text-dark"
                        >
                            <i className="bi bi-arrow-left me-2"></i>
                            Go Back
                        </Link>
                    </Form>
                </Card>
            </Container>
        </React.Fragment>
    );
};

export default EmployeeUpdate;