import ActionTypes from "./user.types";
import { SoundCloud } from "../../../soundcloud";

type Action = {
  type: string;
  payload?: any;
  meta?: any;
  error?: boolean;
};

const loginPending = (): Action => ({
  type: ActionTypes.LOGIN_PENDING
});

export default {};
