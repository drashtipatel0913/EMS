import React, { Component } from 'react'
import EmployeeSearch from "./EmployeeSearch.jsx"
import EmployeeTable from "./EmployeeTable.jsx";
import EmployeeCreate from "./EmployeeCreate.jsx";

export default class EmployeeDirectory extends Component {

   constructor(props) {
      super(props)
      this.state = {
         employees: [],
      }
      this.createEmployee = this.createEmployee.bind(this);
      this.getemployees = this.getemployees.bind(this);
   }

   getemployees() {
      fetch('http://localhost:3000/graphql', {
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
           `
         })
      })
         .then(res => res.json())
         .then(data => {
            this.setState({ employees: data.data.getEmployees });
         })
         .catch(error => {
            console.error('GraphQL error:', error);
         })
   }

   componentDidMount() {
      this.getemployees()
   }

   createEmployee(inputdata) {

      fetch("http://localhost:3000/graphql", {
         method: 'POST',
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
                `, variables: inputdata
         })
      })
         .then(res => res.json())
         .then(function (res) {
               console.log(res)
         })
      this.getemployees()
   }

   render() {
      return (
         <React.Fragment>
            <h1 className='text-center m-3'>Employee Management System</h1>
            <EmployeeSearch />
            <EmployeeTable employees={this.state.employees} getemployees={this.getemployees}/>
            <EmployeeCreate createEmployee={this.createEmployee} />
         </React.Fragment>
      )
   }
}