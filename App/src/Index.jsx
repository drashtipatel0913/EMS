import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import client from "../apolloClient.js";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/authContext.js";

const root = ReactDOM.createRoot(document.getElementById("contents"));

root.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>
  </AuthProvider>
)