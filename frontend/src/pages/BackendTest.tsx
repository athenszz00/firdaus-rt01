import { useEffect, useState } from "react";
import {
  CheckCircle2,
  LoaderCircle,
  Server,
  XCircle,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { checkBackend } from "../api/api";

type BackendResponse = {
  success: boolean;
  status: string;
  service: string;
};

export default function BackendTest() {
  const [data, setData] = useState<BackendResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    checkBackend()
      .then((result) => {
        setData(result);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Server size={27} />
          </div>

          <p className="mt-6 text-sm font-bold text-emerald-600">
            Backend Connection Test
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-950">
            Koneksi React → Flask
          </h1>

          <p className="mt-3 leading-7 text-slate-500">
            Halaman ini digunakan untuk memastikan frontend Firdaus RT 01
            dapat berkomunikasi dengan backend Flask.
          </p>

          {loading && (
            <div className="mt-8 flex items-center gap-3 rounded-2xl bg-slate-50 p-5 text-slate-600">
              <LoaderCircle
                size={22}
                className="animate-spin"
              />

              <span className="font-semibold">
                Menghubungkan ke backend...
              </span>
            </div>
          )}

          {!loading && data && (
            <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">

              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={25}
                  className="text-emerald-600"
                />

                <div>
                  <p className="font-black text-emerald-800">
                    Backend Terhubung!
                  </p>

                  <p className="mt-1 text-sm text-emerald-700">
                    React berhasil menerima response dari Flask.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 rounded-xl bg-white p-5">

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Status
                  </p>

                  <p className="mt-1 font-bold text-slate-800">
                    {data.status}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Service
                  </p>

                  <p className="mt-1 font-bold text-slate-800">
                    {data.service}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Success
                  </p>

                  <p className="mt-1 font-bold text-emerald-600">
                    {String(data.success)}
                  </p>
                </div>

              </div>

            </div>
          )}

          {!loading && error && (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">

              <div className="flex items-center gap-3">
                <XCircle
                  size={25}
                  className="text-red-600"
                />

                <div>
                  <p className="font-black text-red-800">
                    Backend Tidak Terhubung
                  </p>

                  <p className="mt-1 text-sm text-red-700">
                    {error}
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}