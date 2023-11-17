require('dotenv').config()

const express = require('express');
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

const url = process.env.DB_URL || "mongodb+srv://admin:admin@cluster0.hnixyaw.mongodb.net/EMS?retryWrites=true&w=majority"

const port = process.env.API_SERVER_PORT || 3000

const typeDefs = require('./graphQL/typeDefs')
const resolvers = require('./graphQL/resolvers')

const server = new ApolloServer({
   typeDefs,
   resolvers
})

const app = express();

app.use(express.static('public'));

// Connect Apollo Server to Express
async function startServer() {

   await server.start();
   server.applyMiddleware({ app });
   await mongoose.connect(url);
}

startServer()
   .then(() => {
      // Start Express server
      app.listen({ port }, () => {
         console.log(`Server running at http://localhost:${port + server.graphqlPath}`);
      });
   })
   .catch((error) => {
      console.error("Error starting server:", error);
   });