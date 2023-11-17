const { gql } = require('apollo-server')

module.exports = gql`

enum Title{
   Employee
   Manager
   Director
   VP
}

enum Department{
   IT
   Marketing
   HR
   Engineering
}

enum EmployeeType{
   FullTime
   PartTime
   Contract
   Seasonal
}

type Employee{
      firstName: String
      lastName: String
      age: Int
      dateOfJoining: String
      title: Title
      department: Department
      employeeType: EmployeeType
      currentStatus: Boolean
}

input employeeInput{
   firstName: String
   lastName: String
   age: Int
   title: Title
   department: Department
   employeeType: EmployeeType
}

type Query{
   employee(ID: ID!): Employee!
   getEmployees(amount: Int): [Employee]
}

type Mutation{
   createEmployee(employeeInput: employeeInput): Employee!
   deleteEmployee(ID: ID!):Boolean
   updateEmployee(ID: ID!, employeeInput: employeeInput): Boolean
}
`