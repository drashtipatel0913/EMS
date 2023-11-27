require('dotenv').config()

const mongoose = require('mongoose');
const Employee = require('./models/Employee'); //Model

function ConnectToDB() {
   const url = process.env.DB_URL || "mongodb+srv://admin:admin@cluster0.hnixyaw.mongodb.net/EMS?retryWrites=true&w=majority"
   mongoose.connect(url);
}

async function employeeRecords() {
   return await Employee.find()
}

async function createEmployee(employee) {

    let result = await Employee.create(employee);
    return result;
}


async function updateEmployee(_, { id, title, department, currentStatus }) {
   const updatedEmployee = await Employee.findByIdAndUpdate(id, {
      title,
      department,
      currentStatus
   }, { new: true });

   return updatedEmployee;
}


async function deleteEmployee(employee) {
   let currentEmployee = employeeData(employee)
   await Employee.deleteOne({ _id: employee.Id })
   return currentEmployee
}

async function employeeTypeList(employee) {
   return await Employee.find({ employeeType: employee.employeeType })
}

async function employeeData(employee) {
   return await Employee.findOne({ _id: employee.Id }).exec()
}

module.exports = { ConnectToDB, employeeRecords, createEmployee, updateEmployee, deleteEmployee, employeeTypeList, employeeData }