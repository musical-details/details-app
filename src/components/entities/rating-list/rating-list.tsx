import React, { Dispatch, ComponentClass } from "react";

import "./rating-list.scss";
import { AppState } from "../../../core/state/store";

import viewedTrackSelectors from "../../../core/state/ducks/viewed-track/viewed-track.selectors";

import { connect, ConnectedComponent } from "react-redux";
import { withRouter } from "react-router";
import CSS from "csstype";
import viewedTrackActions from "../../../core/state/ducks/viewed-track/viewed-track.actions";
import { Rating } from "../../../core/shared";

const mapStateToProps = (state: AppState): RatingListProps | any => ({
  userRating: viewedTrackSelectors.getUserRating(state),
  otherRatings: viewedTrackSelectors.getOtherRatings(state),
  selectedRatingId: state.viewedTrack.selectedRatingId
});

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): RatingListProps | any => ({
  onChangeRating: (ratingId: number): void => {
    dispatch(viewedTrackActions.setSelectedRatingId(ratingId));
  }
});

type RatingListProps = {
  userRating: Rating;
  otherRatings: Array<Rating>;
  selectedRatingId: number;
  onChangeRating: (ratingId: number) => void;
  match?: any;
};

type RatingListState = {};

class RatingList extends React.Component<RatingListProps, RatingListState> {
  constructor(props: RatingListProps) {
    super(props);
  }

  componentDidMount() {}

  renderButtons(): Array<JSX.Element> {
    const { userRating, otherRatings } = this.props;
    let buttons: Array<JSX.Element> = [];

    buttons.push(this.renderUserButton(userRating));

    for (const rating of otherRatings) {
      buttons.push(this.renderButton(rating));
    }

    return buttons;
  }

  renderUserButton(rating: Rating): JSX.Element {
    const { ratingId } = rating;
    const { avatar } = rating.user;

    const ratingButtonClassName: string =
      ratingId === this.props.selectedRatingId
        ? "rating-button selected"
        : "rating-button";
    const avatarStyles: CSS.Properties = {
      backgroundImage: `url(${avatar})`
    };
    return (
      <div
        className={ratingButtonClassName}
        onClick={(event: React.MouseEvent) => {
          this.props.onChangeRating(ratingId);
        }}
      >
        <div className="avatar-box">
          <div className="avatar" style={avatarStyles}></div>
        </div>
        <div className="text-box">
          <div>
            <div className="nickname">
              <span>Your</span>
            </div>
            <div>
              <span>Rating</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderButton = (rating: Rating): JSX.Element => {
    const { nickname, avatar } = rating.user;
    const { selectedRatingId } = this.props;

    const ratingButtonClassName: string =
      rating.ratingId === selectedRatingId
        ? "rating-button selected"
        : "rating-button";
    const avatarStyles: CSS.Properties = {
      backgroundImage: `url(${avatar})`
    };

    return (
      <div
        className={ratingButtonClassName}
        onClick={(event: React.MouseEvent) => {
          this.props.onChangeRating(rating.ratingId);
        }}
      >
        <div className="avatar-box">
          <div className="avatar" style={avatarStyles}></div>
        </div>
        <div className="text-box">
          <div>
            <div className="nickname">
              <span>{`${nickname}'s`}</span>
            </div>
            <div>
              <span>Rating</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="rating-list">
        <div>{this.renderButtons()}</div>
      </div>
    );
  }
}

const RatingListContainer: ComponentClass = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RatingList) as ConnectedComponent<typeof RatingList, any>
);

export default RatingListContainer;
