const { gql } = require('apollo-server')

module.exports = gql`

scalar DateTime

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
   id: ID!
   firstName: String
   lastName: String
   age: Int
   dateOfJoining: DateTime
   title: Title
   department: Department
   employeeType: EmployeeType
   currentStatus: Boolean
}

input employeeInput{
   firstName: String
   lastName: String
   age: Int
   dateOfJoining: DateTime
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