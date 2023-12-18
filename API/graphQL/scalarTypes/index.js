const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const DateTime = new GraphQLScalarType({

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

module.exports = DateTime;