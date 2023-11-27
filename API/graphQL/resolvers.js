const { employeeRecords, createEmployee, updateEmployee, deleteEmployee, employeeTypeList, employeeData } = require('../db')

module.exports = {
   Query: {
    employeeRecords: async function() {  
      return await employeeRecords() 
    },
    employeeTypeList: async function(_, employee) {  
      return await employeeTypeList(employee) 
    },
    employeeData: async function(_, employee) {  
      return await employeeData(employee) 
    },
  },
  Mutation: {
    createEmployee: async function(_, employee) { 
      return await createEmployee(employee)
    },
    deleteEmployee: async function(_, employee) { 
      return await deleteEmployee(employee)
    },
    updateEmployee: async function(_, employee) { 
      return await updateEmployee(employee)
    },
  }
}