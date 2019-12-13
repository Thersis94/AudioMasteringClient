import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import "./App.css";
import Upload from "../Upload/Upload";
import Header from "../Header/Header";
import userPage from "../userPage/userPage"

class App extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <Header />
        </header>
        <main className="App__main">
          {this.state.hasError && (
            <p className="red">There was an error! Oh no!</p>
          )}
          <Switch>
            <PublicOnlyRoute path={"/login"} component={LoginPage} />
            <PublicOnlyRoute path={"/register"} component={RegistrationPage} />
            <PrivateRoute exact path={"/"} component={userPage} />
            <PrivateRoute path={"/upload"} component={Upload} />
          </Switch>
        </main>


      </div>
    );
  }
}

export default App;
