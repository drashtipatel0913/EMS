import React, { Component } from "react";
import EmployeeSearch from "./EmployeeSearch.jsx";
import EmployeeTable from "./EmployeeTable.jsx";
import EmployeeCreate from "./EmployeeCreate.jsx";
import EmployeeFilter from "./EmployeeFilter.jsx";

export default class EmployeeDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };
    this.createEmployee = this.createEmployee.bind(this);
    this.getemployees = this.getemployees.bind(this);
  }

  getemployees() {
    fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
               query GetEmployees {
                  getEmployees {
                     id
                     firstName
                     lastName
                     age
                     dateOfJoining
                     title
                     department
                     employeeType
                     currentStatus
                  }
               }
           `,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ employees: data.data.getEmployees });
      })
      .catch((error) => {
        console.error("GraphQL error:", error);
      });
  }

  componentDidMount() {
    this.getemployees();
  }

  createEmployee(inputdata) {
    fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
                    mutation CreateEmployee(
                    $firstName: String!,
                    $lastName: String!,
                    $age: Int!,  
                    $title: Title,
                    $department: Department,
                    $dateOfJoining: String!,
                    $employeeType: EmployeeType,
                    $currentStatus: Boolean!
                    ) {
                        createEmployee(
                        firstName: $firstName,
                        lastName: $lastName,
                        age: $age,
                        title: $title,
                        department: $department,
                        dateOfJoining: $dateOfJoining,
                        employeeType: $employeeType,
                        currentStatus: $currentStatus
                        ) {
                           firstName
                           lastName
                           age
                           dateOfJoining
                           title
                           department
                           employeeType
                           currentStatus
                        }
                    }
                `,
        variables: inputdata,
      }),
    })
      .then((res) => res.json())
      .then(function (res) {
        console.log(res);
      });
    this.getemployees();
  }

  filter = (filterType, filterValue) => {
    console.log("Filter Type:", filterType);
    console.log("Filter Value:", filterValue);

    const lowerCaseFilterType = filterType.toLowerCase();
    console.log("Filter Type lower:", lowerCaseFilterType);

    fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
               query Query($${lowerCaseFilterType}: ${filterType}!) {
                  getEmployeesByTitle(${lowerCaseFilterType}: $${filterType}) {
                     id
                     firstName
                     lastName
                     age
                     dateOfJoining
                     title
                     department
                     employeeType
                     currentStatus
                  }
               }
            `,
        variables: { [filterType]: filterValue },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          employees: data.data[`getEmployeesBy${filterType}`],
        });
      })
      .catch((error) => {
        console.error("GraphQL error:", error);
      });
  };

  render() {
    const departments = ["IT", "Marketing", "HR", "Engineering"];
    const titles = ["Director", "Employee", "VP", "Manager"];
    const employeeTypes = ["FullTime", "PartTime", "Contract", "Seasonal"];

    return (
      <React.Fragment>
        <h1 className="text-center m-3">Employee Management System</h1>
        <EmployeeSearch />
        <EmployeeFilter
          departments={departments}
          titles={titles}
          employeeTypes={employeeTypes}
          filter={this.filter}
        />
        <EmployeeTable
          employees={this.state.employees}
          getemployees={this.getemployees}
        />
        <EmployeeCreate createEmployee={this.createEmployee} />
      </React.Fragment>
    );
  }
}
