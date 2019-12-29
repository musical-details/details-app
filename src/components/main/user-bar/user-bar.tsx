import React, { Dispatch, ComponentClass } from "react";
import "./user-bar.scss";
import { SoundCloud, API_KEY } from "../../../core/soundcloud";
import { AppState } from "../../../core/state/store";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { ConnectedComponent } from "react-redux";

type UserBarProps = {
  isLogged: boolean;
  nickname: string;
  avatar: string;
};

type UserBarState = {
  id: number;
  nickname: string | null;
  avatar: string;
  data: any;
};

const mapStateToProps = (state: AppState): UserBarProps | any => ({
  isLogged: state.user.isLogged,
  nickname: state.user.nickname,
  avatar: state.user.avatar
});

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): UserBarProps | any => ({});

class UserBar extends React.Component<UserBarProps, UserBarState> {
  state: UserBarState = {
    id: 140438034,
    nickname: null,
    avatar: "",
    data: null
  };

  constructor(props: UserBarProps) {
    super(props);
  }

  componentDidMount() {
    fetch(
      `https://api.soundcloud.com/users/${this.state.id}?client_id=${API_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ nickname: data.username, avatar: data.avatar_url });
      });
  }

  render() {
    return (
      <div className="user-bar">
        <div>
          <div className="user-box">
            <div className="user-nickname">
              <span>{this.state.nickname}</span>
            </div>
            <div className="user-photo">
              <div
                style={{ backgroundImage: `url(${this.state.avatar})` }}
              ></div>
            </div>
          </div>
          <div className="user-logout">
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
