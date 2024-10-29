import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { FormEvent } from "react";
import { Link } from "react-router-dom";

interface SelfProps {
  isPwHidden: boolean;
  errorMsg: string;
  handleLoginWithDemo: () => void;
  setIsPwHidden: (state: boolean) => void;
  setErrormsg: (state: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  demoIsLoading: boolean;
}

export default function LoginView(props: SelfProps) {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <Card className="mt-12 mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Masuk</CardTitle>
          <CardDescription>
            Masukan username dan password <strong>TMDB anda.</strong> Atau masuk
            melalui akun demonstrasi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => props.handleSubmit(e)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                className="transition-all"
                id="username"
                name="username"
                type="text"
                placeholder="aran8276"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="flex relative">
                <Input
                  className="transition-all"
                  name="password"
                  id="password"
                  placeholder="sekawanku"
                  type={props.isPwHidden ? "password" : "text"}
                  required
                />
                <div className="absolute flex items-center pr-2 inset-y-0 right-0">
                  {props.isPwHidden ? (
                    <Eye
                      onClick={() => props.setIsPwHidden(false)}
                      className="size-5 text-gray-500 cursor-pointer"
                    />
                  ) : (
                    <EyeOff
                      onClick={() => props.setIsPwHidden(true)}
                      className="size-5 text-gray-500 cursor-pointer"
                    />
                  )}
                </div>
              </div>
              {props.errorMsg ? (
                <span className="text-red-500 text-sm">{props.errorMsg}</span>
              ) : (
                <></>
              )}
            </div>

            {props.isLoading ? (
              <Button type="submit" disabled className="w-full">
                <LoadingSpinner />
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Login
              </Button>
            )}
          </form>
          {props.demoIsLoading ? (
            <Button
              disabled
              onClick={() => props.handleLoginWithDemo()}
              variant="outline"
              className="mt-3 w-full"
            >
              <LoadingSpinner />
              {/* Login dengan Akun Demo */}
            </Button>
          ) : (
            <Button
              onClick={() => props.handleLoginWithDemo()}
              variant="outline"
              className="mt-3 w-full"
            >
              Login dengan Akun Demo
            </Button>
          )}
          <a href="https://www.themoviedb.org/signup">
            <Button variant="outline" className="mt-3 w-full">
              Daftar
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
