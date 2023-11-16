const express = require('express');
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

const MongoDB = "mongodb+srv://admin:admin@cluster0.hnixyaw.mongodb.net/EMS?retryWrites=true&w=majority"
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
   // Wait for Apollo Server to start
   await server.start();

   // Apply Apollo Server middleware to Express
   server.applyMiddleware({ app });

   // Connect to MongoDB
   await mongoose.connect(MongoDB);
}

startServer()
   .then(() => {
      // Start Express server
      app.listen({ port: 5000 }, () => {
         console.log(`Server running at http://localhost:5000${server.graphqlPath}`);
      });
   })
   .catch((error) => {
      console.error("Error starting server:", error);
   });