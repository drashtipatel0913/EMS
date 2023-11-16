const { gql } = require('apollo-server')

module.exports = gql`
type Employee{
      firstName: String
      lastName: String
      age: Int
      dateOfJoining: String
      title: String
      department: String
      employeeType: String
      currentStatus: Boolean
}

input employeeInput{
   firstName: String
   lastName: String
   age: Int
   title: String
   department: String
   employeeType: String
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