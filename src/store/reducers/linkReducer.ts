import { VerifyStatus } from "@/types/VerifyStatus";
import {
  SET_HAS_ERROR,
  SET_HAS_TOKEN,
  SET_SESSION_EXPIRED,
  SET_TOKEN,
  SET_VERIFY_STATUS,
} from "../actions/linkAction";

export interface LinkDataState {
  token: string;
  verifyStatus: VerifyStatus | undefined;
  isSessionExpired: boolean;
  userHasToken: boolean;
  hasError: string;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: LinkDataState = {
  token: "",
  verifyStatus: undefined,
  isSessionExpired: false,
  userHasToken: false,
  hasError: "",
};

export const linkReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case SET_VERIFY_STATUS:
      return {
        ...state,
        verifyStatus: action.payload,
      };

    case SET_SESSION_EXPIRED:
      return {
        ...state,
        isSessionExpired: action.payload,
      };

    case SET_HAS_TOKEN:
      return {
        ...state,
        userHasToken: action.payload,
      };

    case SET_HAS_ERROR:
      return {
        ...state,
        hasError: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
