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
        <div className="user-name">{window.localStorage.currentUser}</div>
        <Link className="logout-button" onClick={this.handleLogoutClick} to="/">
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
        <Link className="button" to="/register">
          Register
        </Link>
      </div>
    );
  }

  renderBackgroundImg() {
    if (window.location.href === "https://aiaudio.now.sh/home") {
      //"https://aiaudio.now.sh/home"
      return "HomePage";
    } else return "Header";
  }

  //removed until a decision is made about the prefered method of rendering the app info
  // infoButtonStatus() {
  //   if(window.location.href === "http://localhost:3000/home") {
  //     return 'info'
  //   }
  //   else
  //     return 'info-hidden'
  // }

  renderScrollMessage() {
    if (window.location.href === "https://aiaudio.now.sh/home") {
      //"https://aiaudio.now.sh/home"

      return "arrow";
    } else return "no-arrow";
  }

  render() {
    return (
      <>
        <nav className={`${this.renderBackgroundImg()}`}>
          <div className="homepage-arrow-divider">
            <div className="homepage-arrow-divider">
              <h1>
                <Link className="PageName" to="/home">
                  AI Audio
                </Link>
              </h1>
              <img
                className={this.renderScrollMessage()}
                src="https://img.icons8.com/carbon-copy/100/000000/down--v1.png"
                alt='Arrow pointing down to learn more section.'
              />
            </div>
            {/* <Link className={`${this.infoButtonStatus()}`} to="/info" >How does it work?</Link> */}
          </div>
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
