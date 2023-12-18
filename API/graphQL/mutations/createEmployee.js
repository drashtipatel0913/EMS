const Employee = require('../../db/models/Employee');

 async function createEmployee(_, { employeeInput: { firstName, lastName, age, dateOfJoining, title, department, employeeType } }) {
   const createEmployee = new Employee({
      firstName: firstName,
      lastName: lastName,
      age: age,
      dateOfJoining: new Date(dateOfJoining).toISOString(),
      title: title,
      department: department,
      employeeType: employeeType,
      currentStatus: 1
   });
   const res = await createEmployee.save(); // MongoDB Saving Happens
   return {
      id: res.id,
      ...res._doc
   };
}

module.exports = createEmployee;