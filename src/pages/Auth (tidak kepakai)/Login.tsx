import {
  demoUser,
  demoPass,
  requestHeader,
  sessionKeyName,
  str,
  baseUrl,
} from "@/Routes";
import axios, { AxiosError } from "axios";
import LoginView from "./LoginView";
import { FormEvent, useEffect, useState } from "react";

interface User {
  username: string;
  password: string;
}

export default function Login() {
  const [isPwHidden, setIsPwHidden] = useState(true);
  const [errorMsg, setErrormsg] = useState("");
  const demoCredentials: User = {
    username: demoUser,
    password: demoPass,
  };

  const getRequestToken = async () => {
    try {
      const res = await axios.get(
        baseUrl + "/authentication/token/new",
        requestHeader
      );
      return res.data.request_token;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  const postLogin = async (
    username: string,
    password: string,
    token: string
  ) => {
    try {
      const res = await axios.post(
        baseUrl + "/authentication/token/validate_with_login",
        {
          username: username,
          password: password,
          request_token: token,
        },
        requestHeader
      );
      return res.data.request_token;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.status_code == 30) {
          setErrormsg("Username atau password anda salah.");
        } else if (error.response?.data.status_code == 32) {
          setErrormsg("Email anda belum diverifikasi.");
        }
        setErrormsg(error.response?.data.status_message);
        return false;
      }
    }
  };

  const getSessionId = async (token: string) => {
    try {
      const res = await axios.post(
        baseUrl + "/authentication/session/new",
        {
          request_token: token,
        },
        requestHeader
      );
      return res.data.session_id;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        return error.message;
      }
    }
  };

  const loginWithDemo = async () => {
    const token = await getRequestToken();
    const verifiedToken = await postLogin(
      demoCredentials.username,
      demoCredentials.password,
      token
    );
    if (!verifiedToken) {
      return;
    }
    const sessionId = await getSessionId(verifiedToken);
    str.setItem(sessionKeyName, sessionId);
    // window.location.replace("/");
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = e.currentTarget.elements.namedItem(
      "username"
    ) as HTMLInputElement;
    const password = e.currentTarget.elements.namedItem(
      "password"
    ) as HTMLInputElement;

    const creds = {
      username: username.value,
      password: password.value,
    };

    const token = await getRequestToken();
    const verifiedToken = await postLogin(
      creds.username,
      creds.password,
      token
    );
    if (!verifiedToken) {
      return;
    }
    const sessionId = await getSessionId(verifiedToken);
    str.setItem(sessionKeyName, sessionId);
    window.location.replace("/");
  };

  useEffect(() => {
    console.log(errorMsg);
  }, [errorMsg]);

  return (
    <LoginView
      isPwHidden={isPwHidden}
      setIsPwHidden={setIsPwHidden}
      errorMsg={errorMsg}
      setErrormsg={setErrormsg}
      handleLoginWithDemo={loginWithDemo}
      handleSubmit={handleLogin}
    />
  );
}