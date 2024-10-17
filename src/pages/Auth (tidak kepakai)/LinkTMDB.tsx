import { useEffect } from "react";
import LinkTMDBView from "./LinkTMDBView";
import { baseUrl, requestHeader, verifyURL } from "@/Routes";
import axios from "axios";
import { Token } from "@/types/Token";
import { useDispatch, useSelector } from "react-redux";
import {
  setHasError,
  setHasToken,
  setSessionExpired,
  setToken,
  setVerify,
} from "@/store/actions/linkAction";

export default function LinkTMDB() {
  const data = useSelector((state: any) => state.link);
  const dispatch = useDispatch();
  const session = window.sessionStorage;
  const sessionToken = session.getItem("tmdb_session_data");

  const urlHandler = (token: string) => {
    // if (!sessionToken || !data.token) {
    //   return;
    // }
    const w = window.open(verifyURL + token, "_blank");
    if (w) {
      w.focus();
    }
  };

  const verifyRequestToken = async () => {
    if (!sessionToken || !data.token) {
      return;
    }
    try {
      const res = await axios.post(
        baseUrl + "/authentication/session/new",
        JSON.parse(data.token),
        requestHeader
      );

      dispatch(setVerify(res.data));
    } catch (error: any) {
      dispatch(
        setHasError(`Verifikasi gagal: ${error.response.data.status_message}`)
      );
    }
  };

  const createRequestToken = async () => {
    if (data.userHasToken || sessionToken) {
      return;
    }
    try {
      const res = await axios.get(
        baseUrl + "/authentication/token/new",
        requestHeader
      );
      dispatch(setToken(JSON.stringify(res.data)));
      dispatch(setHasToken(true));
      dispatch(setSessionExpired(false));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!sessionToken) {
      return;
    }
    const parsedToken: Token = JSON.parse(sessionToken);
    const currentDate = new Date();
    if (currentDate > new Date(parsedToken.expires_at)) {
      session.removeItem("tmdb_session_data");
      setSessionExpired(true);
      return;
    }
    dispatch(setToken(sessionToken));
    dispatch(setHasToken(true));
  }, []);

  useEffect(() => {
    if (data.token) {
      urlHandler(JSON.parse(data.token).request_token);
      return;
    }
  }, [data.token]);

  useEffect(() => {
    if (data.token) {
      session.setItem("tmdb_session_data", data.token);
    }
  }, [data.token]);

  return (
    <LinkTMDBView
      hasError={data.hasError}
      urlHandler={
        data.token
          ? () => urlHandler(JSON.parse(data.token).request_token)
          : () => {}
      }
      isSessionExpired={data.isSessionExpired}
      createTokenHandler={createRequestToken}
      verifyRequestTokenHandler={verifyRequestToken}
      userHasToken={data.userHasToken}
      token={data.token ? JSON.parse(data.token).request_token : ""}
    />
  );
}
