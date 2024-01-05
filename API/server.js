require('dotenv').config()

const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('apollo-server-express')

const { ConnectToDB } = require('./db')

const app = express();
app.use(cors());
app.use(express.static('public'));

const port = process.env.API_SERVER_PORT || 3000

const typeDefs = require('./graphQL/typeDefs')
const resolvers = require('./graphQL/resolvers')

const server = new ApolloServer({
   typeDefs,
   resolvers
})

server.start().then(() => {
   server.applyMiddleware({ app, path: "/graphql" });
   ConnectToDB();
   app.listen({ port }, () => {
      console.log(`🚀 Server running at http://localhost:${port + server.graphqlPath}`);
   });
})