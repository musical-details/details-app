import React, { Dispatch, ComponentClass } from "react";
import "./JoinPage.scss";
import { AppState } from "../../../core/store/store";
import { ConnectedComponent, connect } from "react-redux";
import { withRouter, Redirect } from "react-router";
import * as tasks from "../../../core/store/ducks/tasks";
import {
  LoginStage,
  RegisterStage,
  FeedbackError,
} from "../../../core/store/ducks/user/user.state";
import {
  IJoinPageDispatchProps,
  IJoinPageProps,
  IJoinPageStateProps,
} from "./IJoinPageProps";
import { IJoinPageState } from "./IJoinPageState";

const mapStateToProps = (state: AppState): IJoinPageStateProps => ({
  isLogged: state.user.isLogged,
  loginStage: state.user.loginStage,
  loginError: state.user.loginError,
  registerStage: state.user.registerStage,
  registerError: state.user.registerError,
});

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): IJoinPageDispatchProps => ({
  signIn: (login: string, password: string): void => {
    dispatch(tasks.userOperations.signIn(login, password));
  },
  signUp: (login: string, password: string, nickname: string): void => {
    dispatch(tasks.userOperations.signUp(login, password, nickname));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class JoinPage extends React.Component<IJoinPageProps, IJoinPageState> {
  signInLoginRef: React.RefObject<HTMLInputElement>;
  signInPasswordRef: React.RefObject<HTMLInputElement>;
  signUpLoginRef: React.RefObject<HTMLInputElement>;
  signUpSoundCloudUriRef: React.RefObject<HTMLInputElement>;
  signUpPasswordRef: React.RefObject<HTMLInputElement>;

  constructor(props: IJoinPageProps) {
    super(props);
    this.signInLoginRef = React.createRef();
    this.signInPasswordRef = React.createRef();
    this.signUpLoginRef = React.createRef();
    this.signUpSoundCloudUriRef = React.createRef();
    this.signUpPasswordRef = React.createRef();
  }

  handleLoginButtonClick = (
    event: React.MouseEvent<HTMLInputElement>
  ): void => {
    const { signInLoginRef, signInPasswordRef } = this;
    if (!signInLoginRef.current) return;
    if (!signInPasswordRef.current) return;
    const login: string = signInLoginRef.current.value;
    const password: string = signInPasswordRef.current.value;
    this.props.signIn(login, password);
  };

  handleRegisterButtonClick = (
    event: React.MouseEvent<HTMLInputElement>
  ): void => {
    const { signUpLoginRef, signUpPasswordRef, signUpSoundCloudUriRef } = this;
    if (!signUpLoginRef.current) return;
    if (!signUpPasswordRef.current) return;
    if (!signUpSoundCloudUriRef.current) return;
    const login: string = signUpLoginRef.current.value;
    const password: string = signUpPasswordRef.current.value;
    const soundcloudUri: string = signUpSoundCloudUriRef.current.value;
    this.props.signUp(login, password, soundcloudUri);
  };

  render() {
    if (this.props.isLogged) {
      return <Redirect to="/my-profile" />;
    }

    const isDisabled: boolean =
      this.props.loginStage === LoginStage.PENDING ||
      this.props.registerStage === RegisterStage.PENDING
        ? true
        : false;
    return (
      <div className="access">
        <div>
          <section className="sign-in-area">
            <div>
              <h2>Sign in</h2>
              <div className="form">
                <div className="error-box">
                  <span>
                    {this.props.loginError === undefined
                      ? ""
                      : this.props.loginError.message}
                  </span>
                </div>
                <div className="input-box" tabIndex={0}>
                  <input
                    type="text"
                    placeholder="Type login..."
                    disabled={isDisabled}
                    ref={this.signInLoginRef}
                  />
                  <div className="icon">
                    <i className="icon-user"></i>
                  </div>
                </div>

                <div className="input-box" tabIndex={1}>
                  <input
                    type="password"
                    placeholder="Type password..."
                    disabled={isDisabled}
                    ref={this.signInPasswordRef}
                  />
                  <div className="icon">
                    <i className="icon-key"></i>
                  </div>
                </div>

                <div className="input-box button" tabIndex={2}>
                  <input
                    className="button"
                    type="button"
                    value="Sign in"
                    disabled={isDisabled}
                    onClick={this.handleLoginButtonClick}
                  />
                  <div className="icon"></div>
                </div>
              </div>
            </div>
          </section>
          <section className="sign-up-area">
            <div>
              <h2>Sign up</h2>
              <div className="form">
                <div className="error-box">
                  <span>
                    {this.props.registerError === undefined
                      ? ""
                      : this.props.registerError.message}
                  </span>
                </div>
                <div className="input-box" tabIndex={3}>
                  <input
                    type="text"
                    placeholder="Type login..."
                    disabled={isDisabled}
                    ref={this.signUpLoginRef}
                  />
                  <div className="icon">
                    <i className="icon-user"></i>
                  </div>
                </div>

                <div className="input-box" tabIndex={4}>
                  <input
                    className="input"
                    type="text"
                    placeholder="Type url to your SoundCloud Profile..."
                    disabled={isDisabled}
                    ref={this.signUpSoundCloudUriRef}
                  />
                  <div className="icon">
                    <i className="icon-soundcloud"></i>
                  </div>
                </div>

                <div className="input-box" tabIndex={5}>
                  <input
                    type="password"
                    placeholder="Type password..."
                    disabled={isDisabled}
                    ref={this.signUpPasswordRef}
                  />
                  <div className="icon">
                    <i className="icon-key"></i>
                  </div>
                </div>

                <div className="input-box button" tabIndex={2}>
                  <input
                    type="button"
                    value="Sign up"
                    disabled={isDisabled}
                    onClick={this.handleRegisterButtonClick}
                  />
                  <div className="icon"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default withRouter(connector(JoinPage));
