import React, { ComponentClass, Dispatch } from "react";

import "./rate.scss";
import { API_KEY, SoundCloud } from "../../../core/soundcloud";
import { withRouter, NavLink } from "react-router-dom";
import CSS from "csstype";
import * as tasks from "../../../core/state/ducks/tasks";
import { AppState } from "../../../core/state/store";
import { connect, ConnectedComponent } from "react-redux";

const mapStateToProps = (state: AppState): RateComponentProps | any => ({
  isLogged: state.user.isLogged,
  soundcloudId: state.user.soundcloudId
});

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): RateComponentProps | any => ({});

type RateComponentProps = {
  isLogged: boolean;
  soundcloudId: number;
  history?: any;
  match?: any;
};

type RateComponentState = {
  userFavourites: Array<SoundCloud.UserFavouritesData>;
};

class RateComponent extends React.Component<
  RateComponentProps,
  RateComponentState
> {
  state: RateComponentState = {
    userFavourites: []
  };

  constructor(props: RateComponentProps) {
    super(props);
  }

  componentWillMount() {
    this.fetchUserFavourites();
  }

  async fetchTrackInfo(url: string): Promise<any> {
    const apiUrl = `https://api.soundcloud.com/resolve?url=${url}&client_id=${API_KEY}`;
    try {
      const response: Response = await fetch(apiUrl);
      const data: any = await response.json();
      this.props.history.push(`/track/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  }

  async fetchUserFavourites(): Promise<void> {
    const { isLogged, soundcloudId } = this.props;
    if (!isLogged) return;

    const apiUrl: string = `https://api.soundcloud.com/users/${soundcloudId}/favorites?client_id=${API_KEY}`;
    try {
      const response: Response = await fetch(apiUrl);
      const data: Array<SoundCloud.UserFavouritesData> = await response.json();
      this.setState({
        userFavourites: data
      });
    } catch (error) {
      console.error(error);
    }
  }

  createBoxes = (): Array<JSX.Element> => {
    try {
      console.log(this.state);
      return this.state.userFavourites
        .filter(userFavourite => userFavourite.streamable === true)
        .slice(0, 6)
        .map(({ id, artwork_url }) => this.createBox(id, artwork_url));
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  createBox = (trackId: number, artwork_url: string | null): JSX.Element => {
    const url: string = `/track/${trackId}`;
    let artUrl: string = "";
    try {
      if (artwork_url === null) throw new Error("Field 'artwork_url' is empty");
      artUrl = artwork_url.toString().replace("large", "t500x500");
    } catch (error) {
      console.error(error);
    }

    const coverStyles: CSS.Properties = {
      backgroundImage: `url(${artUrl})`
    };
    return (
      <NavLink to={url}>
        <div className="box">
          <div className="cover" style={coverStyles}></div>
        </div>
      </NavLink>
    );
  };

  handleKeyDown = (event: React.KeyboardEvent | any) => {
    if (event.key === "Enter") {
      this.fetchTrackInfo(event.target.value);
    }
  };

  render() {
    const { isLogged } = this.props;

    const favouritesWrapperStyles: CSS.Properties = {
      display: isLogged ? "flex" : "none"
    };

    return (
      <div className="rate">
        <div>
          <div className="search-wrapper">
            <div>
              <input type="text" autoFocus onKeyDown={this.handleKeyDown} />
            </div>
          </div>
          <div className="favourites-wrapper" style={favouritesWrapperStyles}>
            <div>
              <div className="header-wrapper">
                <h2>or choose your last favourites:</h2>
              </div>
              <div className="box-list">{this.createBoxes()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const RateComponentContainer: ComponentClass = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RateComponent) as ConnectedComponent<typeof RateComponent, any>
);

export default RateComponentContainer;
