const Employee = require('../../db/models/Employee');

async function employee(_, { ID }) {
   return await Employee.findById(ID);
}

async function getEmployees(_, { amount }) {
   return await Employee.find().limit(amount);
}

async function getEmployeesByTitle(_, { title }) {
   return await Employee.find({ title: title });
}

async function getEmployeesByDepartment(_, { department }) {
   return await Employee.find({ department: department });
}

async function getEmployeesByEmployeeType(_, { employeeType }) {
   return await Employee.find({ employeeType: employeeType })
}

async function getEmployeesByCurrentStatus(_, { currentStatus }) {
   return await Employee.find({ currentStatus: currentStatus })
}

async function getEmployeesByUpcoming(_, { age }) {
   try {
      return await Employee.find({ age: { $gte: age } })
   } catch (error) {
      console.error('Error fetching employees by upcoming retirement date:', error);
      throw new Error('Unable to fetch employees by upcoming retirement date');
   }
}

module.exports = {
   employee,
   getEmployees,
   getEmployeesByTitle,
   getEmployeesByDepartment,
   getEmployeesByEmployeeType,
   getEmployeesByCurrentStatus,
   getEmployeesByUpcoming
};