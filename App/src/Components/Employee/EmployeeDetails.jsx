import React, { Component } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import { fetchEmployeeData } from "../../Services/employeeServices.js";

function wrapper(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class EmployeeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      message: "",
      id: null,
      firstName: "",
      lastName: "",
      dateOfJoining: "",
      age: "",
      title: "",
      employeeType: "",
      department: "",
      currentStatus: "",
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

      const formattedretirementDate = retirementDate.toISOString().split("T")[0];

      const currentDate = new Date();
      const timeLeft = this.calculateTimeLeft(currentDate, retirementDate);

      this.setState({
        ...data,
        formattedretirementDate,
        timeLeft,
      });
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  }

  calculateTimeLeft(fromDate, toDate) {
    const timeLeft = {};

    const timeDiff = toDate.getTime() - fromDate.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30.44); // average days in a month
    const years = Math.floor(months / 12);

    timeLeft.days = days;
    timeLeft.months = months;
    timeLeft.years = years;

    return timeLeft;
  }

  render() {
    const dateOfJoining = new Date(this.state.dateOfJoining);
    const dateOfRetirement = new Date(this.state.formattedretirementDate);

    // Check if timeLeft is defined before accessing its properties
    const timeLeftYears = this.state.timeLeft ? this.state.timeLeft.years : 0;
    const timeLeftMonths = this.state.timeLeft ? this.state.timeLeft.months : 0;
    const timeLeftDays = this.state.timeLeft ? this.state.timeLeft.days : 0;
    return (
      <React.Fragment>
        <Container className="mt-5">
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
                <td>
                  {dateOfJoining.toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    timeZone: "UTC",
                  })}
                </td>
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
                <td>
                  {dateOfRetirement.toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    timeZone: "UTC",
                  })}
                </td>
              </tr>
              <tr>
                <th>Time Left for Retirement</th>
                <td>
                  {timeLeftYears} years, {timeLeftMonths} months, and{" "}
                  {timeLeftDays} days
                </td>
              </tr>
            </thead>
          </Table>
          <Link
            to="/view-employee"
            className="ms-3 mt-5 w-25 fw-bold text-decoration-none text-dark"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Go Back
          </Link>
        </Container>
      </React.Fragment>
    );
  }
}

export default wrapper(EmployeeDetails);
