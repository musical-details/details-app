import React, { Dispatch, ComponentClass } from "react";
import "./login-bar.scss";
import { AppState } from "../../../core/store/store";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { ConnectedComponent } from "react-redux";

import * as tasks from "../../../core/store/ducks/tasks";

const mapStateToProps = (state: AppState): LoginBarProps | any => ({
  isLogged: state.user.isLogged,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): LoginBarProps | any => ({
  signIn: (login: string, password: string) => {
    dispatch(tasks.userOperations.signIn(login, password));
  },
});

type LoginBarProps = {
  isLogged: boolean;
  signIn: (login: string, password: string) => void;
};

type LoginBarState = {
  formStage: number;
  loginEntered: string;
  passwordEntered: string;
};

class LoginBar extends React.Component<LoginBarProps, LoginBarState> {
  state: LoginBarState = {
    formStage: 1,
    loginEntered: "",
    passwordEntered: "",
  };

  constructor(props: LoginBarProps) {
    super(props);
  }

  handleLoginInputKeyUp = (event: React.KeyboardEvent | any): void => {
    if (this.props.isLogged || event.keyCode != 13) return;
    this.setState({
      formStage: 2,
      loginEntered: event.target.value,
    });
  };

  handlePasswordInputKeyUp = (event: React.KeyboardEvent | any): void => {
    if (this.props.isLogged || event.keyCode != 13) return;
    this.setState(
      {
        formStage: 1,
        passwordEntered: event.target.value,
      },
      () => {
        this.props.signIn(this.state.loginEntered, this.state.passwordEntered);
      }
    );
  };

  render() {
    const loginInput = (
      <input
        type="text"
        autoFocus
        placeholder="Type login..."
        disabled={this.props.isLogged}
        onKeyUp={this.handleLoginInputKeyUp}
      />
    );

    const passwordInput = (
      <input
        type="password"
        autoFocus
        placeholder="Type password..."
        disabled={this.props.isLogged}
        onKeyUp={this.handlePasswordInputKeyUp}
      />
    );
    let loginIcon: string = "";
    if (this.state.formStage == 1) loginIcon = "icon-user";
    if (this.state.formStage == 2) loginIcon = "icon-key";
    return (
      <div className="login-bar">
        <div>
          <div className="login-box">
            <div className="login-input">
              {this.state.formStage == 1 && loginInput}
              {this.state.formStage == 2 && passwordInput}
            </div>
            <div className="login-icon">
              <div>
                <i className={loginIcon}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const LoginBarContainer: ComponentClass = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginBar) as ConnectedComponent<
    typeof LoginBar,
    any
  >
);

export default LoginBarContainer;
