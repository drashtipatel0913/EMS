import React, { Component } from "react";
import AppBar from "../Components/Navbar.jsx";
import { AuthContext } from "../Context/authContext.js";

export default class Homepage extends Component {
  static contextType = AuthContext;

  render() {
    const { user, logout } = this.context;

    return (
      <>
        <AppBar />
        {user ? (
          <>
            <h1>Welcome {user.username}</h1>
          </>
        ) : (
          <>
            <h1>Welcome</h1>
          </>
        )}
      </>
    );
  }
}