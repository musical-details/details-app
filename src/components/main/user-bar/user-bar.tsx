import React from "react";
import "./user-bar.scss";
import { SC_API_KEY } from "../../../core/soundcloud";

type UserBarState = {
  id: number;
  nickname: string | null;
  avatar: string;
  data: any;
};

class UserBar extends React.Component {
  state: UserBarState = {
    id: 140438034,
    nickname: null,
    avatar: "",
    data: null
  };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    fetch(
      `https://api.soundcloud.com/users/${this.state.id}?client_id=${SC_API_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
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

export default UserBar;
