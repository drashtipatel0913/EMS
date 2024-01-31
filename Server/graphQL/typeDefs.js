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
   currentStatus: Boolean
}

type User{
   id: ID!
   username: String
   email: String
   password: String
   token: String
}

input RegisterInput{
   username: String,
   email: String,
   password: String,
   confirmPassword: String
}

input LoginInput{
   email: String
   password: String
}

type Query{
   # Employee Queries
   employee(ID: ID!): Employee!
   getEmployees(amount: Int): [Employee]
   getEmployeesByTitle(title: Title!): [Employee]
   getEmployeesByDepartment(department: Department!): [Employee]
   getEmployeesByEmployeeType(employeeType: EmployeeType!): [Employee]
   getEmployeesByCurrentStatus(currentStatus: Boolean!): [Employee]
   getEmployeesByUpcoming(age: Int): [Employee]

   # User Queries
   user(iD: ID!): User
}

type Mutation{
   createEmployee(employeeInput: employeeInput): Employee!
   deleteEmployee(ID: ID!):Boolean
   updateEmployee(ID: ID!, employeeInput: employeeInput): Boolean
   registerUser(registerInput: RegisterInput): User
   loginUser(loginInput: LoginInput): User
}
`