const employeeResolvers = require('./employees')
const usersResolvers = require('./users')

module.exports = {
    Query: {
        ...employeeResolvers.Query,
        ...usersResolvers.Query
    },
    Mutation: {
        ...employeeResolvers.Mutation,
        ...usersResolvers.Mutation
    },
};