const Employee = require('../../db/models/Employee');

async function updateEmployee(_, { ID, employeeInput: { firstName, lastName, age, dateOfJoining, title, department, employeeType, currentStatus } }) {
   const wasUpdated = (await Employee.updateOne({ _id: ID }, { firstName: firstName, lastName: lastName, age: age, dateOfJoining: dateOfJoining, title: title, department: department, employeeType: employeeType, currentStatus: currentStatus })).modifiedCount;
   return wasUpdated;
   // 1 if something was updated, 0 if nothing was updated
}

module.exports = updateEmployee;