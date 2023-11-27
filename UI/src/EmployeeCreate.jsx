import React, { Component } from 'react'

export default class EmployeeCreate extends Component {

   constructor(props) {
      super(props);
      this.state = {
         errorlist: [],
         message: ''
      },
         this.createForm = this.createForm.bind(this);
   }

   createForm(formData) {
      formData.preventDefault();
      this.setState({ msg: '' })

      let errors = [];

      if (!formData.target.firstName.value) {
         errors.push('Firstname is required');
      }
      if (!formData.target.lastName.value) {
         errors.push('Lastname is required');
      }
      if (!formData.target.dateOfJoining.value) {
         errors.push('Date of Joining is required');
      }
      if (!formData.target.age.value) {
         errors.push('Age is required');
      }
      if (parseInt(formData.target.age.value) < 20 || parseInt(formData.target.age.value) > 70) {
         errors.push('Age should be between 20 to 70');
      }
      if (!formData.target.title.value) {
         errors.push('Title is required');
      }
      if (!formData.target.employeeType.value) {
         errors.push('Employee type is required');
      }
      if (!formData.target.department.value) {
         errors.push('Department is required');
      }
      this.setState({ errorlist: errors })

      if (errors.length == 0) {

         let age = parseInt(formData.target.age.value);

         const data = {
            firstName: formData.target.firstName.value,
            lastName: formData.target.lastName.value,
            dateOfJoining: new Date(formData.target.dateOfJoining.value).toISOString(),
            age: age,
            department: formData.target.department.value,
            title: formData.target.title.value,
            employeeType: formData.target.employeeType.value,
            currentStatus: true
         };

         // reset  values
         formData.target.firstName.value = '';
         formData.target.lastName.value = '';
         formData.target.dateOfJoining.value = '';
         formData.target.department.value = '';
         formData.target.title.value = '';
         formData.target.employeeType.value = '';
         formData.target.age.value = '';

         this.props.createEmployee(data);
         this.setState({ msg: 'Employee added to our system successfully' })

      }
   }
   render() {

      const errorlist = this.state.errorlist.map((error, index) => <p key={index} className="error-txt">{error}</p>)

      return <React.Fragment>
         <form onSubmit={this.createForm} className="text-center form">
            {errorlist}
            <h3 className="success-txt">{this.state.msg}</h3>
            <div>
               <label>First Name:</label>
               <input type="text" name="firstName" />
            </div>
            <div>
               <label>Last Name:</label>
               <input type="text" name="lastName" />
            </div>
            <div>
               <label>Age:</label>
               <input type="number" id="age" name="age" />
            </div>
            <div>
               <label>Date of joining:</label>
               <input type="date" name="dateOfJoining" />
            </div>
            <div>
               <label>Title:</label>
               <select name="title">
                  <option value="Director">Director</option>
                  <option value="Employee">Employee</option>
                  <option value="VP">VP</option>
                  <option value="Manager">Manager</option>
               </select>
            </div>
            <div>
               <label>Department:</label>
               <select name="department">
                  <option value="Engineering">Engineering</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
               </select>
            </div>
            <div>
               <label>Employee of Type:</label>
               <select name="employeeType">
                  <option value="FullTime">FullTime</option>
                  <option value="PartTime">PartTime</option>
                  <option value="Contract">Contract</option>
                  <option value="Seasonal">Seasonal</option>
               </select>
            </div>
            <button className='btn btn-secondary' type="submit">Create Employee</button>
         </form>
      </React.Fragment>
   }
}