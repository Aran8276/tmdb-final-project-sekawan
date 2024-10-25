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
import { FormEvent, useState } from "react";

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
        return setErrormsg(error.response?.data);
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
    const sessionId = await getSessionId(verifiedToken);
    str.setItem(sessionKeyName, sessionId);
    window.location.replace("/");
  };

  // const handleRequestToken = async () => {
  //   if (!requestToken) {
  //     console.log("Request token is not present, adding one");
  //     await getRequestToken();
  //     return;
  //   }
  //   console.log("Request token exists");
  //   const parsedRequestToken: RequestToken = JSON.parse(requestToken);
  //   if (new Date() > new Date(parsedRequestToken.expires_at)) {
  //     console.log("Request token expired");
  //     getRequestToken();
  //     return;
  //   }
  //   console.log("Request token is all valid");
  // };

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
    const sessionId = await getSessionId(verifiedToken);
    str.setItem(sessionKeyName, sessionId);
    window.location.replace("/");
  };

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
