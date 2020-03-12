import React, { Dispatch, ComponentClass } from "react";

import "./rating-list.scss";
import { AppState } from "../../../core/state/store";

import * as tasks from "../../../core/state/ducks/tasks";

import { connect, ConnectedComponent } from "react-redux";
import { withRouter } from "react-router";
import CSS from "csstype";
import { Rating } from "../../../core/shared";
import { RatingEditorMode } from "../../../core/state/ducks/rating-editor/rating-editor.state";

const mapStateToProps = (state: AppState): RatingListProps | any => ({
  userRating: tasks.viewedTrackSelectors.getUserRating(state),
  otherRatings: tasks.viewedTrackSelectors.getOtherRatings(state),
  selectedRatingId: state.viewedTrack.selectedRatingId,
  mode: state.ratingEditor.mode
});

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): RatingListProps | any => ({
  onChangeRating: (ratingId: number): void => {
    dispatch(tasks.viewedTrackActions.setSelectedRatingId(ratingId));
  }
});

type RatingListProps = {
  userRating: Rating;
  otherRatings: Array<Rating>;
  selectedRatingId: number;
  mode: RatingEditorMode;
  onChangeRating: (ratingId: number) => void;
  match?: any;
};

type RatingListState = {};

class RatingList extends React.Component<RatingListProps, RatingListState> {
  constructor(props: RatingListProps) {
    super(props);
  }

  renderButtons(): Array<JSX.Element> {
    const { userRating, otherRatings } = this.props;
    const buttons: Array<JSX.Element> = [this.renderUserButton(userRating, -1)];
    return buttons.concat(otherRatings.map(this.renderButton));
  }

  renderUserButton(rating: Rating, index: number): JSX.Element {
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
        key={index}
        className={ratingButtonClassName}
        onClick={(event: React.MouseEvent) => {
          this.props.onChangeRating(ratingId);
        }}
      >
        <div className="avatar-box">
          <div className="avatar" style={avatarStyles} />
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

  renderButton = (rating: Rating, index: number): JSX.Element => {
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
        key={index}
        className={ratingButtonClassName}
        onClick={(event: React.MouseEvent) => {
          this.props.onChangeRating(rating.ratingId);
        }}
      >
        <div className="avatar-box">
          <div className="avatar" style={avatarStyles} />
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
