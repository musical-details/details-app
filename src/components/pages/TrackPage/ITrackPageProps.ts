import { RouteComponentProps } from "react-router-dom";
import { RatingEditorMode } from "../../../core/state/ducks/rating-editor/rating-editor.state";

export type ITrackPageRouteParams = {
  trackId: string;
  ratingId: string;
};

export type ITrackPageStateProps = {
  playerTrackId: number;
  viewedTrackId: number;
  isSetInPlayer: boolean;
  isPlaying: boolean;
  mode: RatingEditorMode;
};

export type ITrackPageDispatchProps = {
  unsetPlayer: () => void;
  setPlayer: () => void;
  fetchTrack: (trackId: number, ratingId: number) => void;
};

export type ITrackPageOwnProps = {};

export type ITrackPageProps = ITrackPageStateProps &
  ITrackPageDispatchProps &
  ITrackPageOwnProps &
  RouteComponentProps<ITrackPageRouteParams>;
