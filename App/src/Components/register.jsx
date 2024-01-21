import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../Context/authContext.js";
import { useForm } from "../utility/hooks.js";

import { TextField, Button, Container, Stack, Alert } from "@mui/material";

import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

const REGISTER_USER = gql`
  mutation Mutation($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      id
      email
      username
      token
    }
  }
`;

function Register(props) {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const registerUserCallback = () => {
    console.log("registerUserCallback");
  };

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { registerInput: values },
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <h3>Register</h3>
      <p>Regiter below to create an account</p>
    </Container>
  );
}

export default Register;
