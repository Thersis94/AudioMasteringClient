import React, { Component } from "react";
import { Section } from "../../components/Utils/Utils";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import AuthApiService from "../../services/auth-api-service";
import TokenService from "../../services/token-service";
import { Button } from "../../components/Utils/Utils";

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    },
    onLoginSuccess: () => {}
  };

  handleRegistrationSuccess = user => {
    const { history } = this.props;
    history.push("/login");
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/";
    history.push(destination);
  };

  demoUser = ev => {
    ev.preventDefault();
    this.setState({ error: null });

    let user_name = "Demo";
    let password = "J1j@chcc.sys";

    AuthApiService.postLogin({
      user_name: user_name,
      password: password
    })
      .then(res => {
        user_name = "";
        password = "";
        TokenService.saveAuthToken(res.authToken);
        this.handleLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });

    window.localStorage.setItem("currentUser", user_name);
  };

  render() {
    return (
      <Section className="RegistrationPage">
        <h2 className="login-register-header">Register</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
        <Button className="button" onClick={this.demoUser}>
          Demo User
        </Button>
      </Section>
    );
  }
}
