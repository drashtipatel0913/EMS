import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT;

export default class EmployeeTable extends Component {

   constructor(props) {
      super(props)
      this.doDelete = this.doDelete.bind(this);
   }

   doDelete(employeeId) {
      const variables = { id: employeeId }
      fetch(UI_API_ENDPOINT, {
         method: 'POST',
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            query: `
               mutation DeleteEmployee($id: ID!) {
                  deleteEmployee(ID: $id)
               }
                `, variables: variables
         })
      }).then(res => res.json()).then(function (res) {
         console.log(res)
      })
      alert('Employee Data Deleted Successfully!');
      this.props.getemployees();
   }

   render() {
      const rows = this.props.employees.map((row) => {
         const dateOfJoining = new Date(row.dateOfJoining);
         return (
            <tr key={row.id}>
               <td>{row.firstName}</td>
               <td>{row.lastName}</td>
               <td>
               {
                  dateOfJoining.toLocaleDateString('en-GB', {
                     year: 'numeric',
                     month: 'long',
                     day: '2-digit',
                     timeZone: 'UTC'  // Specify the UTC time zone
                  })
               }
               </td>
               <td>{row.age}</td>
               <td>{row.title}</td>
               <td>{row.employeeType}</td>
               <td>{row.department}</td>
               <td>{row.currentStatus ? 'Working' : 'Retired'}</td>
               <td>
               <Link className='btn btn-primary me-3' to={"/Update/" + row.id}>Update</Link>
               <button className='btn btn-danger' onClick={() => this.doDelete(row.id)}>Delete</button>
               </td>
            </tr>
         );
      });

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