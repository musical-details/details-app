import React, { Dispatch, ComponentClass } from "react";
import "./user-bar.scss";
import { SoundCloud, API_KEY } from "../../../core/soundcloud";
import { AppState } from "../../../core/store/store";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { ConnectedComponent } from "react-redux";

import userActions from "../../../core/store/ducks/user/user.actions";
import userOperations from "../../../core/store/ducks/user/user.operations";

const mapStateToProps = (state: AppState): UserBarProps | any => ({
  isLogged: state.user.isLogged,
  nickname: state.user.nickname,
  avatar: state.user.avatar,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): UserBarProps | any => ({
  logOut: () => {
    dispatch(userActions.logout());
  },
});

type UserBarProps = {
  isLogged: boolean;
  nickname: string;
  avatar: string;
  logOut: () => void;
};

type UserBarState = {};

class UserBar extends React.Component<UserBarProps, UserBarState> {
  constructor(props: UserBarProps) {
    super(props);
  }

  handleUserLogoutClick = (event: React.MouseEvent) => {
    this.props.logOut();
  };

  render() {
    return (
      <div className="user-bar">
        <div>
          <div className="user-box">
            <div className="user-nickname">
              <span>{this.props.nickname}</span>
            </div>
            <div className="user-photo">
              <div
                style={{ backgroundImage: `url(${this.props.avatar})` }}
              ></div>
            </div>
          </div>
          <div className="user-logout" onClick={this.handleUserLogoutClick}>
            <span>Log out</span>
          </div>
        </div>
      </div>
    );
  }
}

const UserBarContainer: ComponentClass = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserBar) as ConnectedComponent<
    typeof UserBar,
    any
  >
);

export default UserBarContainer;
