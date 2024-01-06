import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import client from "../apolloClient.js";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/authContext.js";

ReactDOM.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>
  </AuthProvider>,
  document.getElementById("contents")
);
