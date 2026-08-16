import { useState } from "react";
import {
  ArrowLeft,
  Home,
} from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import { loginWithGoogle } from "../api/api";
import { useAuth } from "../context/useAuth";

export default function Login() {
  const navigate = useNavigate();

  const { refreshUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGoogleLogin(
    credential: string
  ) {
    try {
      setLoading(true);
      setError("");

      // Kirim credential Google ke Flask
      await loginWithGoogle(credential);

      // Ambil user terbaru dari session Flask
      await refreshUser();

      // Ambil user dari session setelah login
      const API_URL =
        import.meta.env.VITE_API_URL ||
        (import.meta.env.DEV
          ? "http://localhost:5000"
          : "");

      const response = await fetch(
        `${API_URL}/api/auth/me`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          "Data pengguna tidak dapat diambil."
        );
      }

      // Redirect berdasarkan role
      if (result.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Google Login Error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Login Google gagal. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto flex min-h-screen max-w-md items-center px-5">

        <div className="w-full">

          {/* Back */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-emerald-600"
          >
            <ArrowLeft size={17} />
            Kembali ke Beranda
          </button>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 sm:p-9">

            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white">
              <Home size={25} />
            </div>

            {/* Heading */}
            <h1 className="mt-7 text-3xl font-black text-slate-950">
              Selamat Datang
            </h1>

            <p className="mt-3 leading-7 text-slate-500">
              Masuk ke Firdaus RT 01 untuk menggunakan
              layanan warga.
            </p>

            {/* Error */}
            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-700">
                {error}
              </div>
            )}

            {/* Google Login */}
            <div className="mt-8">

              {loading ? (
                <div className="flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-500">
                  Memproses login...
                </div>
              ) : (
                <div className="flex w-full justify-center">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      if (
                        credentialResponse.credential
                      ) {
                        handleGoogleLogin(
                          credentialResponse.credential
                        );
                      } else {
                        setError(
                          "Credential Google tidak ditemukan."
                        );
                      }
                    }}
                    onError={() => {
                      setError(
                        "Login Google gagal atau dibatalkan."
                      );
                    }}
                    useOneTap={false}
                    theme="outline"
                    size="large"
                    text="continue_with"
                    shape="rectangular"
                    width="100%"
                  />
                </div>
              )}

            </div>

            {/* Information */}
            <p className="mt-6 text-center text-xs leading-5 text-slate-400">
              Dengan masuk, Anda menyetujui penggunaan
              layanan digital Firdaus RT 01.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}