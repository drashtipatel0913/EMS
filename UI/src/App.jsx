class EmployeeSearch extends React.Component {
   render() {
      return (
         <div>This is EmployeeSearch</div>
      )
   }
}

class EmployeeRow extends React.Component {
   render() {
      return (
         <tr>
            <td>id</td>
            <td>firstname</td>
            <td>lastname</td>
            <td>age</td>
            <td>title</td>
            <td>dob</td>
         </tr>
      )
   }
}

class EmployeeTable extends React.Component {
   render() {
      return (
         <table className="bordered-table">
            <thead>
               <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Title</th>
                  <th>Date of Birth</th>
               </tr>
            </thead>
            <tbody>
               <EmployeeRow />
               <EmployeeRow />
               <EmployeeRow />
            </tbody>
         </table>
      )
   }
}
class EmployeeCreate extends React.Component {
   render() {
      return (
         <div>This is EmployeeCreate</div>
      )
   }
}
class EmployeeDirectory extends React.Component {
   render() {
      return (
         <React.Fragment>
            <h1>Employee Management System</h1>
            <EmployeeSearch />
            <hr />
            <EmployeeTable />
            <hr />
            <EmployeeCreate />
         </React.Fragment>
      )
   }
}

const element = <EmployeeDirectory />

ReactDOM.render(element, document.getElementById('contents'));