import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex justify-center pt-48">
      <div className="flex flex-col space-y-12">
        <h1 className="text-center font-bold text-6xl">404</h1>
        <h2 className="text-center font-bold text-3xl">
          Halaman tidak ditemukan
        </h2>
        <Link className="w-full" to="/">
          <Button className="w-full">Kembali ke Beranda</Button>
        </Link>
      </div>
    </main>
  );
}
