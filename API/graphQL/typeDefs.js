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
   id:ID!
   firstName: String
   lastName: String
   age: Int
   dateOfJoining: String
   title: Title   
   department: Department
   employeeType: EmployeeType
   currentStatus: Boolean
}
   
type Query {
    employeeRecords : [Employee]!,
    employeeData(Id : String!) : Employee!,
    employeeTypeList(type : String!) : [Employee],
}

type Mutation{
   createEmployee(
      firstName: String
      lastName: String
      age: Int
      dateOfJoining: String
      title: Title   
      department: Department
      employeeType: EmployeeType
      currentStatus: Boolean
    ) : Employee 


    updateEmployee (
      id:ID!
      title: Title
      department: Department
      currentStatus: Boolean
    ) : Employee! 
  
    deleteEmployee (Id : ID!) 
    : Employee! 
}
`