import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SelfProps {
  token: string;
  hasError: string;
  isSessionExpired: boolean;
  userHasToken: boolean;
  urlHandler: () => void;
  createTokenHandler: () => void;
  verifyRequestTokenHandler: () => void;
}

// {props.token}

export default function LinkTMDBView(props: SelfProps) {
  return (
    <>
      {props.isSessionExpired ? (
        <div className="flex justify-center items-center pt-48">
          <Card className="">
            <CardHeader>
              <CardTitle>Sesi Kadaluarsa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-[400px]">
                Anda telah melakukan sebuah permintaan link akun ke The Movie
                Database sebelumnya. Sesi yang diberikan telah kadaluarsa,
                silakan membuat yang baru
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={props.createTokenHandler}>Buat Sesi Baru</Button>
            </CardFooter>
          </Card>
        </div>
      ) : props.userHasToken ? (
        <div className="flex justify-center items-center pt-48">
          <Card className="">
            <CardHeader>
              <CardTitle>Verifikasi</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-3">
              <p className="w-[400px]">
                Anda telah melakukan permintaan untuk menyambungkan akun anda ke
                The Movie Database. Konfirmasi dengan klik tombol Verifikasi
                jika anda telah mengizinkannya. Jika tab tersebut tertutup atau
                anda tidak ada, klik tombol Sambungkan di bawah ini.
              </p>
              <p>
                {props.hasError ? (
                  <p className="text-red-500">{props.hasError}</p>
                ) : (
                  <></>
                )}
              </p>
            </CardContent>
            <CardFooter className="space-x-4">
              <Button onClick={props.verifyRequestTokenHandler}>
                Verifikasi
              </Button>
              <Button onClick={props.urlHandler} variant="outline">
                Sambungkan
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center items-center pt-48">
          <Card className="">
            <CardHeader>
              <CardTitle>Sambungkan Akun The Movie Database</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-[400px]">
                Sambungkan akun anda untuk mengakses fitur-fitur seperti daftar
                film favorit dan rating film.
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={props.createTokenHandler}>Sambungkan</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
