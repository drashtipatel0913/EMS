const Employee = require('../../db/models/Employee');

async function deleteEmployee(_, { ID }) {
   const wasDeleted = (await Employee.deleteOne({ _id: ID })).deletedCount;
   return wasDeleted;
   // 1 if something was deleted, 0 if nothing was deleted
}

module.exports = deleteEmployee;