import {
  ArrowRight,
  ClipboardList,
  FileText,
  Users,
  Wrench,
} from "lucide-react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div>
          <p className="text-sm font-bold text-emerald-600">
            Admin Panel
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            Dashboard Admin
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Kelola layanan, data warga, dan pengajuan
            layanan warga RT 01 melalui panel administrasi.
          </p>
        </div>

        {/* =====================================================
            MENU ADMIN
        ====================================================== */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          {/* ===================================================
              PENGAJUAN
          =================================================== */}

          <Link
            to="/admin/applications"
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
          >
            <div className="flex items-start justify-between">

              <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                <ClipboardList size={24} />
              </div>

              <ArrowRight
                size={19}
                className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-500"
              />

            </div>

            <h2 className="mt-6 text-xl font-black text-slate-900">
              Pengajuan Warga
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Lihat dan proses pengajuan layanan
              yang dikirim oleh warga.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-600">
              Kelola Pengajuan
              <ArrowRight size={16} />
            </div>
          </Link>

          {/* ===================================================
              LAYANAN
          =================================================== */}

          <Link
            to="/admin/services"
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
          >
            <div className="flex items-start justify-between">

              <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <Wrench size={24} />
              </div>

              <ArrowRight
                size={19}
                className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500"
              />

            </div>

            <h2 className="mt-6 text-xl font-black text-slate-900">
              Kelola Layanan
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Tambah, ubah, aktifkan, nonaktifkan,
              dan hapus layanan RT 01.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
              Kelola Layanan
              <ArrowRight size={16} />
            </div>
          </Link>

          {/* ===================================================
              DATA WARGA
          =================================================== */}

          <Link
            to="/admin/residents"
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
          >
            <div className="flex items-start justify-between">

              <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white">
                <Users size={24} />
              </div>

              <ArrowRight
                size={19}
                className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-purple-500"
              />

            </div>

            <h2 className="mt-6 text-xl font-black text-slate-900">
              Data Warga
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Kelola dan lihat data warga yang
              terdaftar di RT 01.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-purple-600">
              Kelola Data Warga
              <ArrowRight size={16} />
            </div>
          </Link>

        </div>

        {/* =====================================================
            INFORMASI
        ====================================================== */}

        <div className="mt-8 rounded-3xl border border-emerald-100 bg-emerald-50 p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
              <FileText size={21} />
            </div>

            <div>
              <h2 className="font-black text-emerald-950">
                Panel Administrasi RT 01
              </h2>

              <p className="mt-1 text-sm leading-6 text-emerald-800">
                Gunakan menu di atas untuk mengelola
                layanan, data warga, dan pengajuan
                layanan masyarakat.
              </p>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}