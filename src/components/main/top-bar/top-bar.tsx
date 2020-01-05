import React from "react";
import "./top-bar.scss";
import { AppState } from "../../../core/state/store";
import { Dispatch } from "redux";
import { ConnectedComponent, connect } from "react-redux";
import UserBarContainer from "../user-bar/user-bar";
import LoginBarContainer from "../login-bar/login-bar";

const mapStateToProps = (state: AppState): TopBarProps => ({
  isLogged: state.user.isLogged
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

type TopBarProps = {
  isLogged: boolean;
};

type TopBarState = {};

class TopBar extends React.Component<TopBarProps, TopBarState> {
  constructor(props: TopBarProps) {
    super(props);
  }

  render() {
    return (
      <div className="top-bar">
        <div>
          {this.props.isLogged ? <UserBarContainer /> : <LoginBarContainer />}
        </div>
      </div>
    );
  }
}

const TopBarContainer: ConnectedComponent<typeof TopBar, any> = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar);

export default TopBarContainer;
