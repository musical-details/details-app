import React, { Dispatch, ComponentClass } from "react";

import "./ProfilePage.scss";
import { Redirect, withRouter } from "react-router";
import { AppState } from "../../../core/store/store";
import { ConnectedComponent, connect } from "react-redux";
import {
  IProfilePageDispatchProps,
  IProfilePageProps,
  IProfilePageStateProps,
} from "./IProfilePageProps";
import { IProfileState } from "./IProfilePageState";

const mapStateToProps = (state: AppState): IProfilePageStateProps => ({});

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): IProfilePageDispatchProps => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

class ProfilePage extends React.Component<IProfilePageProps, IProfileState> {
  constructor(props: IProfilePageProps) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const {} = this.props;
    const {} = this.state;
    return <div className="ProfilePage"></div>;
  }
}

export default withRouter(connector(ProfilePage));
