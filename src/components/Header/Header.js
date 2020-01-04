import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import "./Header.css";

export default class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  };

  renderLogoutLink() {
    return (
      <div className="Header__logged-in">
        <div className='user-name'>
        {window.localStorage.currentUser}
        </div>
        <Link className='logout-button' onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <Link className="login-button" to="/login">
          Log in
        </Link>
        <Link to="/register">Register</Link>
      </div>
    );
  }

  renderBackgroundImg() {
    if (window.location.href === "http://localhost:3000/home") {
      //replace with hosing page url
      return "HomePage";
    } else return "Header";
  }

  render() {
    return (
      <>
        <nav className={`${this.renderBackgroundImg()}`}>
          <h1>
            <Link className="PageName" to="/home">
              AI Audio
            </Link>
          </h1>
          <div className="login-register-buttons">
            {TokenService.hasAuthToken()
              ? this.renderLogoutLink()
              : this.renderLoginLink()}
          </div>
        </nav>
      </>
    );
  }
}
