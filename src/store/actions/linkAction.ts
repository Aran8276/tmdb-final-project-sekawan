// ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]cd=-[ooooooooooooooooooooooooooooooooooooooooooooooooooo[{},k======================================}+]]

import { VerifyStatus } from "@/types/VerifyStatus";

export const SET_TOKEN = "SET_TOKEN";

export const SET_VERIFY_STATUS = "SET_VERIFY_STATUS";

export const SET_SESSION_EXPIRED = "SET_SESSION_EXPIRED";

export const SET_HAS_TOKEN = "SET_HAS_TOKEN";

export const SET_HAS_ERROR = "SET_HAS_ERROR";

export const setToken = (token: string) => {
  return { type: SET_TOKEN, payload: token };
};

export const setVerify = (verifyStatus: VerifyStatus) => {
  return { type: SET_VERIFY_STATUS, payload: verifyStatus };
};

export const setSessionExpired = (expired: boolean) => {
  return { type: SET_SESSION_EXPIRED, payload: expired };
};

export const setHasToken = (hasToken: boolean) => {
  return { type: SET_HAS_TOKEN, payload: hasToken };
};

export const setHasError = (hasError: string) => {
  return { type: SET_HAS_ERROR, payload: hasError };
};

/*
token
verifyStatus
isSessionExpired
userHasToken
hasError
*/
