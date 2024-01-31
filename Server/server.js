const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('apollo-server-express')

const { dbConnection } = require('./db/connection/index')

const app = express();
app.use(cors());

const port = process.env.API_SERVER_PORT

const typeDefs = require('./graphQL/types/index')
const resolvers = require('./graphQL/resolvers/index')

const server = new ApolloServer({
   typeDefs,
   resolvers
})

server.start().then(() => {
   server.applyMiddleware({ app, path: "/graphql" });
   dbConnection();
   app.listen({ port }, () => {
      console.log(`🚀 Server running at http://localhost:${port + server.graphqlPath}`);
   });
})