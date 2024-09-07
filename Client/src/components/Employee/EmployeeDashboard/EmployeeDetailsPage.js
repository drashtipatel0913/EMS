import React, { Component } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Table, ProgressBar } from "react-bootstrap";
import Card from "react-bootstrap/Card"
import Navbar from '../../Navbar'
import { fetchEmployeeData } from "../../../services/EmployeeCRUD.js";

function wrapper(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class EmployeeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      firstName: "",
      lastName: "",
      dateOfJoining: "",
      age: "",
      title: "",
      employeeType: "",
      department: "",
      currentStatus: "",
      retirementDate: "",
      timeLeft: {},
    };
  }

  componentDidMount() {
    this.fetchEmployeeDetails();
  }

  async fetchEmployeeDetails() {
    const { id } = this.props.params;

    try {
      const data = await fetchEmployeeData(id);
      const dateOfJoining = new Date(data.dateOfJoining);
      const retirementDate = new Date(dateOfJoining);
      retirementDate.setFullYear(dateOfJoining.getFullYear() + 40);

      this.setState({
        ...data,
        retirementDate,
        timeLeft: this.calculateTimeLeft(new Date(), retirementDate),
      });
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  }

  calculateTimeLeft(fromDate, toDate) {
    const diff = toDate - fromDate;
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const days = Math.floor(diff / millisecondsPerDay);
    const years = Math.floor(days / 365.25);
    const months = Math.floor((days % 365.25) / 30.44);

    return {
      years,
      months,
      days: days % 30.44,
    };
  }

  render() {
    const dateOfJoining = new Date(this.state.dateOfJoining);
    const dateOfRetirement = new Date(this.state.retirementDate);
    const { years, months, days } = this.state.timeLeft;

    const totalDays = Math.floor((dateOfRetirement - dateOfJoining) / (24 * 60 * 60 * 1000));
    const daysLeft = Math.floor((dateOfRetirement - new Date()) / (24 * 60 * 60 * 1000));
    const percentageComplete = 100 - (daysLeft / totalDays) * 100;

    return (
      <React.Fragment>
        <Container className="mt-4">
          <Navbar />
          <Card className="m-3 border-0" >
            <h5 className="pb-4">Employee Details</h5>
            <Table
              striped="columns"
              bordered
              hover
              variant="light"
              className="w-50 mb-5"
            >
              <thead>
                <tr>
                  <th>First Name</th>
                  <td>{this.state.firstName}</td>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <td>{this.state.lastName}</td>
                </tr>
                <tr>
                  <th>Date of Joining</th>
                  <td>{dateOfJoining.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "2-digit" })}</td>
                </tr>
                <tr>
                  <th>Age</th>
                  <td>{this.state.age}</td>
                </tr>
                <tr>
                  <th>Title</th>
                  <td>{this.state.title}</td>
                </tr>
                <tr>
                  <th>Employee Type</th>
                  <td>{this.state.employeeType}</td>
                </tr>
                <tr>
                  <th>Department</th>
                  <td>{this.state.department}</td>
                </tr>
                <tr>
                  <th>Current Status</th>
                  <td>{this.state.currentStatus ? "Working" : "Retired"}</td>
                </tr>
                <tr>
                  <th>Date of Retirement</th>
                  <td>{dateOfRetirement.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "2-digit" })}</td>
                </tr>
                <tr>
                  <th>Time Left for Retirement</th>
                  <td>
                    {years} years, {months} months, and {Math.floor(days)} days
                  </td>
                </tr>
              </thead>
            </Table>
            <h5 className="mt-4">Retirement Countdown</h5>
            <ProgressBar style={{ height: '2px' }} className="my-3 mt-4" now={percentageComplete} />
            <ProgressBar animated className="mb-4" now={percentageComplete} label={`${percentageComplete.toFixed(2)}%`} />
            <Link
              to="/view-employee"
              className="ms-3 mt-5 w-25 fw-bold text-decoration-none text-dark"
            >
              <i className="bi-arrow-left me-2"></i>
              Go Back
            </Link>
          </Card>
        </Container>
      </React.Fragment>
    );
  }
}

export default wrapper(EmployeeDetails);