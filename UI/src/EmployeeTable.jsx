import React, { Component } from 'react'
import { useParams, Link } from 'react-router-dom'

export default class EmployeeTable extends Component {

   constructor(props) {
      super(props)
      this.doDelete = this.doDelete.bind(this);
   }

   doDelete(employeeId) {
      const variables = { id: employeeId }
      fetch("http://localhost:3000/graphql", {
         method: 'POST',
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            query: `
                mutation deleteEmployee($id: ID!) {
                    deleteEmployee(Id: $id) {
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
                `, variables: variables
         })
      }).then(res => res.json()).then(function (res) {
         console.log(res)
      })
      alert('employee data Deleted!');
      this.props.getemployees();
   }

   render() {

      const rows = this.props.employees.map((row) => (
         <tr key={row.id}>
            <td>{row.firstName}</td>
            <td>{row.lastName}</td>
            <td>{new Date(parseInt(row.dateOfJoining)).toDateString()}</td>
            <td>{row.age}</td>
            <td>{row.title}</td>
            <td>{row.employeeType}</td>
            <td>{row.department}</td>
            <td>{row.currentStatus ? 'Working' : 'Retired'}</td>
            <td>
               <Link className='btn btn-primary me-3' to={"/Update/" + row.id}>Update</Link>
               {/* <button className='btn btn-primary me-3'>Edit</button> */}
               <button className='btn btn-danger' onClick={() => this.doDelete(row.id)}>Delete</button>
            </td>
         </tr>
      ));

      return (
      <div className='py-5'>
         <table className="container w-75 table table-hover bordered-table">
            <thead>
               <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Date of joining</th>
                  <th>age</th>
                  <th>Title</th>
                  <th>Employee type</th>
                  <th>Department</th>
                  <th>Current status</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {rows}
            </tbody>
         </table>
      </div>
      )
   }
}