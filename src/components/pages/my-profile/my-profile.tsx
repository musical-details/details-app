import React, { Dispatch, ComponentClass } from "react";

import "./my-profile.scss";
import { Redirect, withRouter } from "react-router";
import { AppState } from "../../../core/state/store";
import { ConnectedComponent, connect } from "react-redux";

const mapStateToProps = (state: AppState): MyProfileComponentProps | any => ({
  isLogged: state.user.isLogged,
  nickname: state.user.nickname
});

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): MyProfileComponentProps | any => ({});

type MyProfileComponentProps = {
  isLogged: boolean;
  nickname: string;
};
type MyProfileComponentState = {};

class MyProfileComponent extends React.Component<
  MyProfileComponentProps,
  MyProfileComponentState
> {
  constructor(props: MyProfileComponentProps) {
    super(props);
  }

  componentDidMount() {}

  render() {
    if (!this.props.isLogged) {
      return <Redirect to="/access" />;
    }
    return <div>Hello {this.props.nickname}!</div>;
  }
}

const MyProfileContainer: ComponentClass = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyProfileComponent) as ConnectedComponent<typeof MyProfileComponent, any>
);

export default MyProfileContainer;
