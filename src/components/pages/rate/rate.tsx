import React, { ComponentClass, Dispatch } from "react";

import "./rate.scss";
import { API_KEY, SoundCloud } from "../../../core/soundcloud";
import { withRouter, NavLink } from "react-router-dom";
import CSS from "csstype";
import * as tasks from "../../../core/state/ducks/tasks";
import { AppState } from "../../../core/state/store";
import { connect, ConnectedComponent } from "react-redux";
import SpinnerComponent from "../../shared/spinner/spinner";

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
  isUserFavourtiesLoaded: boolean;
  userFavourites: Array<SoundCloud.UserFavouritesData>;
  progress: number;
};

class RateComponent extends React.Component<
  RateComponentProps,
  RateComponentState
> {
  interval: any;
  state: RateComponentState = {
    isUserFavourtiesLoaded: false,
    userFavourites: [],
    progress: 0
  };

  constructor(props: RateComponentProps) {
    super(props);
  }

  componentWillMount() {
    this.fetchUserFavourites();

    this.interval = setInterval(() => {
      if (this.state.progress > 100) {
        clearInterval(this.interval);
        return;
      }
      this.setState({ progress: this.state.progress + 1 });
    }, 100);
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
    this.setState({ isUserFavourtiesLoaded: false });

    if (!isLogged) return;

    const apiUrl: string = `https://api.soundcloud.com/users/${soundcloudId}/favorites?client_id=${API_KEY}`;
    try {
      const response: Response = await fetch(apiUrl);
      const data: Array<SoundCloud.UserFavouritesData> = await response.json();
      this.setState({
        userFavourites: data,
        isUserFavourtiesLoaded: true
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
    const artUrl: string =
      artwork_url === null
        ? ""
        : artwork_url.toString().replace("large", "t500x500");

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
              <input
                type="text"
                autoFocus
                onKeyDown={this.handleKeyDown}
                placeholder="Type url to track on SoundCloud..."
              />
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
          {this.props.isLogged && !this.state.isUserFavourtiesLoaded && (
            <div className="spinner-wrapper">
              <SpinnerComponent progress={this.state.progress} />
            </div>
          )}
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
