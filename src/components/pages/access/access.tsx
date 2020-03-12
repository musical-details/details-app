import React, { Dispatch, ComponentClass } from "react";
import "./access.scss";
import { AppState } from "../../../core/state/store";
import { ConnectedComponent, connect } from "react-redux";
import { withRouter, Redirect } from "react-router";
import * as tasks from "../../../core/state/ducks/tasks";
import {
  LoginStage,
  RegisterStage,
  FeedbackError
} from "../../../core/state/ducks/user/user.state";

const mapStateToProps = (state: AppState): AccessComponentProps | any => ({
  isLogged: state.user.isLogged,
  loginStage: state.user.loginStage,
  loginError: state.user.loginError,
  registerStage: state.user.registerStage,
  registerError: state.user.registerError
});

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): AccessComponentProps | any => ({
  signIn: (login: string, password: string): void => {
    dispatch(tasks.userOperations.signIn(login, password));
  },
  signUp: (login: string, password: string, nickname: string): void => {
    dispatch(tasks.userOperations.signUp(login, password, nickname));
  }
});

type AccessComponentProps = {
  isLogged: boolean;
  loginStage: LoginStage;
  loginError: FeedbackError;
  registerStage: RegisterStage;
  registerError: FeedbackError;
  signIn: (login: string, password: string) => void;
  signUp: (login: string, password: string, nickname: string) => void;
};

type AccessComponentState = {};

class AccessComponent extends React.Component<
  AccessComponentProps,
  AccessComponentState
> {
  signInLoginRef: React.RefObject<HTMLInputElement>;
  signInPasswordRef: React.RefObject<HTMLInputElement>;
  signUpLoginRef: React.RefObject<HTMLInputElement>;
  signUpSoundCloudUriRef: React.RefObject<HTMLInputElement>;
  signUpPasswordRef: React.RefObject<HTMLInputElement>;

  constructor(props: AccessComponentProps) {
    super(props);
    this.signInLoginRef = React.createRef();
    this.signInPasswordRef = React.createRef();
    this.signUpLoginRef = React.createRef();
    this.signUpSoundCloudUriRef = React.createRef();
    this.signUpPasswordRef = React.createRef();
  }

  handleLoginButtonClick = (event: React.MouseEvent): void => {
    const { signInLoginRef, signInPasswordRef } = this;
    const login: string = (signInLoginRef.current as HTMLInputElement).value;
    const password: string = (signInPasswordRef.current as HTMLInputElement)
      .value;
    this.props.signIn(login, password);
  };

  handleRegisterButtonClick = (event: React.MouseEvent): void => {
    const { signUpLoginRef, signUpPasswordRef, signUpSoundCloudUriRef } = this;
    const login: string = (signUpLoginRef.current as HTMLInputElement).value;
    const password: string = (signUpPasswordRef.current as HTMLInputElement)
      .value;
    const soundcloudUri: string = (signUpSoundCloudUriRef.current as HTMLInputElement)
      .value;
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

const AccessContainer: ComponentClass = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AccessComponent) as ConnectedComponent<typeof AccessComponent, any>
);

export default AccessContainer;
