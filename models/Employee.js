const { model, Schema } = require('mongoose')

const employeeSchema = new Schema({
   firstName: String,
   lastName: String,
   age: Number,
   dateOfJoining: Date,
   title: String,
   department: String,
   employeeType: String,
   currentStatus: Boolean
})

module.exports = model('Employee', employeeSchema)