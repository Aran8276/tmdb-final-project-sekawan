import React, { useEffect, useState } from "react";
import LinkTMDBView from "./LinkTMDBView";
import { accessToken, baseUrl, requestHeader, verifyURL } from "@/Routes";
import axios from "axios";
import { Token } from "@/types/Token";

export default function LinkTMDB() {
  const [token, setToken] = useState("");
  const [verifyStatus, setVerifyStatus] = useState();
  const [isSessionExpired, setSessionExpired] = useState(false);
  const [userHasToken, setUserHasToken] = useState(false);
  const [hasError, setError] = useState("");
  const session = window.sessionStorage;
  const sessionToken = session.getItem("tmdb_session_data");

  const urlHandler = () => {
    if (!sessionToken || !token) {
      return;
    }
    const w = window.open(
      verifyURL + JSON.parse(token).request_token,
      "_blank"
    );
    if (w) {
      w.focus();
    }
  };

  const verifyRequestToken = async () => {
    if (!sessionToken || !token) {
      console.log("denied");
      return;
    }
    try {
      const res = await axios.post(
        baseUrl + "/authentication/session/new",
        JSON.parse(token),
        requestHeader
      );
      console.log(res);
      setVerifyStatus(res.data);
    } catch (error: any) {
      //   setVerifyStatus(error.response.data);
      setError("Verifikasi gagal");
    }
  };

  const createRequestToken = async () => {
    if (userHasToken || sessionToken) {
      return;
    }
    try {
      const res = await axios.get(
        baseUrl + "/authentication/token/new",
        requestHeader
      );
      setToken(JSON.stringify(res.data));
      setUserHasToken(true);
      setSessionExpired(false);
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
    setToken(sessionToken);
    setUserHasToken(true);
  }, []);

  useEffect(() => {
    if (token) {
      session.setItem("tmdb_session_data", token);
    }
  }, [token]);

  useEffect(() => {
    console.log(verifyStatus);
  }, [verifyStatus]);

  return (
    <LinkTMDBView
      hasError={hasError}
      urlHandler={urlHandler}
      isSessionExpired={isSessionExpired}
      createTokenHandler={createRequestToken}
      verifyRequestTokenHandler={verifyRequestToken}
      userHasToken={userHasToken}
      token={token ? JSON.parse(token).request_token : ""}
    />
  );
}
