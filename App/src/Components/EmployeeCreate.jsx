import React, { Component } from 'react'

export default class EmployeeCreate extends Component {

   constructor(props) {
      super(props);
      this.state = {
         errorlist: {
            fname: [],
            lname: [],
            doj: [],
            age: [],
            title: [],
            empType: [],
            dep: []
         },
         message: ''
      },
         this.createForm = this.createForm.bind(this);
   }

   createForm(formData) {
      formData.preventDefault();
      this.setState({ msg: '' })

      let errors = {
         fname: [],
         lname: [],
         doj: [],
         age: [],
         title: [],
         empType: [],
         dep: []
      }

      if (!formData.target.firstName.value) {
         errors.fname.push('Firstname is required');
      }
      if (!formData.target.lastName.value) {
         errors.lname.push('Lastname is required');
      }
      if (!formData.target.dateOfJoining.value) {
         errors.doj.push('Date of Joining is required');
      }
      if (!formData.target.age.value) {
         errors.age.push('Age is required');
      }
      if (parseInt(formData.target.age.value) < 20 || parseInt(formData.target.age.value) > 70) {
         errors.age.push('Age should be between 20 to 70');
      }
      if (!formData.target.title.value) {
         errors.title.push('Title is required');
      }
      if (!formData.target.employeeType.value) {
         errors.empType.push('Employee type is required');
      }
      if (!formData.target.department.value) {
         errors.dep.push('Department is required');
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
      const { errorlist } = this.state;

      const renderErrors = () => {
         return Object.keys(errorlist).map((key) => {
            const errors = errorlist[key];
            return errors.map((error, index) => (
               <p key={index} className="text-danger">{error}</p>
            ));
         });
      };

      return <React.Fragment>
         <form onSubmit={this.createForm} className=" text-center form">
            <h3 className="success-txt">{this.state.msg}</h3>
            <table className='container w-50 table-borderless table' cellPadding={10}>
               <tbody>
                  <tr>
                     <th>
                        <label htmlFor='firstname'>First Name:</label>
                     </th>
                     <td>
                        <input type="text" id='firstname' className='form-control' name="firstName" />
                     </td>
                     <td rowSpan={8}>
                        {renderErrors()}
                     </td>
                  </tr>
                  <tr>
                     <th>
                        <label htmlFor='lastName'>Last Name:</label>
                     </th>
                     <td>
                        <input type="text" className='form-control' name="lastName" id="lastName" />
                     </td>
                  </tr>
                  <tr>
                     <th>
                        <label htmlFor='age'>Age:</label>
                     </th>
                     <td>
                        <input type="number" id="age" name="age" className='form-control' />

                     </td>
                  </tr>
                  <tr>
                     <th>
                        <label htmlFor='dateOfJoining'>Date of joining:</label>
                     </th>
                     <td>
                        <input type="date" name="dateOfJoining" id="dateOfJoining" className='form-control' />
                     </td>
                  </tr>
                  <tr>
                     <th>
                        <label htmlFor='title'>Title:</label>
                     </th>
                     <td>
                        <select name="title" className="form-select" id='title'>
                           <option value="Director">Director</option>
                           <option value="Employee">Employee</option>
                           <option value="VP">VP</option>
                           <option value="Manager">Manager</option>
                        </select>
                     </td>
                  </tr>
                  <tr>
                     <th>
                        <label htmlFor='department'>Department:</label>
                     </th>
                     <td>
                        <select name="department" className="form-select" id='department'>
                           <option value="Engineering">Engineering</option>
                           <option value="HR">HR</option>
                           <option value="IT">IT</option>
                           <option value="Marketing">Marketing</option>
                        </select>
                     </td>
                  </tr>
                  <tr>
                     <th>
                        <label htmlFor='employeeType'>Employee of Type:</label>
                     </th>
                     <td>
                        <select name="employeeType" className="form-select" id='employeeType'>
                           <option value="FullTime">FullTime</option>
                           <option value="PartTime">PartTime</option>
                           <option value="Contract">Contract</option>
                           <option value="Seasonal">Seasonal</option>
                        </select>
                     </td>
                  </tr>
                  <tr>
                     <td colSpan="2">
                        <button className='btn w-100 btn-outline-dark' type="submit">Create Employee</button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </form>
      </React.Fragment>
   }
}