const express = require('express');
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors');

const { ConnectToDB } = require('./db')
const typeDefs = require('./graphQL/typeDefs')
const resolvers = require('./graphQL/resolvers/index')

const app = express();
app.use(cors());

const port = process.env.API_SERVER_PORT

// Middleware to check query parameters
app.use((req, res, next) => {
   // Check for query parameter 'access_key'
   if (req.query.access_key === '3540f3f751f2a6fd0584dd35f836c32a') {
     next();
   } else {
     res.status(403).send('Forbidden');
   }
 });

const server = new ApolloServer({
   typeDefs,
   resolvers
})

server.start().then(() => {
   server.applyMiddleware({ app, path: "api/graphql" });
   ConnectToDB();
   app.listen({ port }, () => {
      console.log(`🚀 Server running at https://api.quinpoolwellnesscentre.ca${server.graphqlPath}`);
   });
})