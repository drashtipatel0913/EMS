const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const Employee = require('../../models/Employee')

const DateTimeResolver = new GraphQLScalarType({

   name: 'DateTime',
   description: 'DateTime custom scalar type',
   parseValue(value) {
      return new Date(value); // value from the client
   },
   serialize(value) {
      return value.toISOString(); // value sent to the client
   },
   parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
         return new Date(ast.value) // ast value is always in string format
      }
      return null;
   },
})

module.exports = {
   DateTime: DateTimeResolver,
   Query: {
      async employee(_, { ID }) {
         return await Employee.findById(ID)
      },
      async getEmployees(_, { amount }) {
         return await Employee.find().limit(amount)
      },
      async getEmployeesByTitle(_, { title }) {
         return await Employee.find({ title: title })
      },
      async getEmployeesByDepartment(_, { department }) {
         return await Employee.find({ department: department })
      },
      async getEmployeesByEmployeeType(_, { employeeType }) {
         return await Employee.find({ employeeType: employeeType })
      },
      async getEmployeesByCurrentStatus(_, { currentStatus }) {
         return await Employee.find({ currentStatus: currentStatus })
      },
      async getEmployeesByUpcoming(_, { age}) {
         try {
            return await Employee.find({ age: { $gte: age } })
         } catch ( error ) {
            console.error('Error fetching employees by upcoming:', error);
            throw new Error('Unable to fetch employees by upcoming');
         }
      },
   },
   Mutation: {
      async createEmployee(_, { employeeInput: { firstName, lastName, age, dateOfJoining, title, department, employeeType } }) {
         const createEmployee = new Employee({
            firstName: firstName,
            lastName: lastName,
            age: age,
            dateOfJoining: new Date(dateOfJoining).toISOString(),
            title: title,
            department: department,
            employeeType: employeeType,
            currentStatus: 1
         })

         console.log(createEmployee)
         const res = await createEmployee.save(); // MongoDB Saving Happens
         console.log(res._doc)
         return {
            id: res.id,
            ...res._doc
         }
      },
      async deleteEmployee(_, { ID }) {
         const wasDeleted = (await Employee.deleteOne({ _id: ID })).deletedCount
         return wasDeleted
         // 1 if something was deleted, 0 if nothing was deleted
      },
      async updateEmployee(_, { ID, employeeInput: { firstName, lastName, age, dateOfJoining, title, department, employeeType, currentStatus } }) {
         const wasUpdated = (await Employee.updateOne({ _id: ID }, { firstName: firstName, lastName: lastName, age: age, dateOfJoining: dateOfJoining, title: title, department: department, employeeType: employeeType, currentStatus: currentStatus })).modifiedCount
         return wasUpdated
         // 1 if something was updated, 0 if nothing was updated
      }
   }
}