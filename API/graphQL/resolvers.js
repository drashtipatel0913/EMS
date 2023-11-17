const Employee = require('../models/Employee')

module.exports = {
   Query: {
      async employee(_, { ID }) {
         return await Employee.findById(ID)
      },
      async getEmployees(_, { amount }) {
         return await Employee.find().limit(amount)
      }
   },
   Mutation: {
      async createEmployee(_, { employeeInput: { firstName, lastName, age, dateOfJoining, title, department, employeeType } }) {
         const createEmployee = new Employee({
            firstName: firstName,
            lastName: lastName,
            age: age,
            dateOfJoining: new Date().toISOString(),
            title: title,
            department: department,
            employeeType: employeeType,
            currentStatus: 1
         })

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
      async updateEmployee(_, { ID, employeeInput: { firstName, lastName, age, dateOfJoining, title, department, employeeType } }) {
         const wasUpdated = (await Employee.updateOne({ _id: ID }, { firstName: firstName, lastName: lastName, age: age, dateOfJoining: dateOfJoining, title: title, department: department, employeeType: employeeType })).modifiedCount
         return wasUpdated
         // 1 if something was updated, 0 if nothing was updated
      }
   }
}