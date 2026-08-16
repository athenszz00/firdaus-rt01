import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Siskamling() {
  const jadwal = [
    {
      hari: "Senin",
      waktu: "22.00 - 04.00",
      regu: "Regu 1",
    },
    {
      hari: "Selasa",
      waktu: "22.00 - 04.00",
      regu: "Regu 2",
    },
    {
      hari: "Rabu",
      waktu: "22.00 - 04.00",
      regu: "Regu 3",
    },
    {
      hari: "Kamis",
      waktu: "22.00 - 04.00",
      regu: "Regu 4",
    },
    {
      hari: "Jumat",
      waktu: "22.00 - 04.00",
      regu: "Regu 5",
    },
    {
      hari: "Sabtu",
      waktu: "22.00 - 04.00",
      regu: "Regu 6",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:py-14">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/layanan"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-emerald-600"
          >
            <ArrowLeft size={17} />
            Kembali ke Layanan
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Konten Utama */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck size={25} />
                </div>

                <div>
                  <p className="text-sm font-bold text-emerald-600">
                    Keamanan Lingkungan
                  </p>

                  <h1 className="mt-1 text-3xl font-black text-slate-950">
                    Siskamling
                  </h1>

                  <p className="mt-2 leading-7 text-slate-500">
                    Informasi dan jadwal sistem keamanan lingkungan
                    warga RT 01.
                  </p>
                </div>
              </div>

              <div className="my-8 border-t border-slate-100" />

              {/* Informasi */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                <div className="flex gap-3">
                  <CheckCircle2
                    size={21}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <div>
                    <h2 className="font-black text-slate-900">
                      Pentingnya Siskamling
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Siskamling merupakan kegiatan bersama warga untuk
                      membantu menjaga keamanan dan ketertiban lingkungan
                      RT 01.
                    </p>
                  </div>
                </div>
              </div>

              {/* Jadwal */}
              <div className="mt-8">
                <div className="flex items-center gap-3">
                  <CalendarDays
                    size={21}
                    className="text-emerald-600"
                  />

                  <h2 className="text-xl font-black text-slate-950">
                    Jadwal Siskamling
                  </h2>
                </div>

                <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                  <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                    <span>Hari</span>
                    <span>Waktu</span>
                    <span>Regu</span>
                  </div>

                  {jadwal.map((item) => (
                    <div
                      key={item.hari}
                      className="grid grid-cols-[1fr_1fr_1fr] border-b border-slate-100 px-4 py-4 text-sm last:border-b-0"
                    >
                      <span className="font-bold text-slate-800">
                        {item.hari}
                      </span>

                      <span className="flex items-center gap-2 text-slate-600">
                        <Clock3 size={15} />
                        {item.waktu}
                      </span>

                      <span className="font-semibold text-emerald-600">
                        {item.regu}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Catatan */}
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-100 px-5 py-4">
                  <h2 className="font-black text-slate-900">
                    Ketentuan Siskamling
                  </h2>
                </div>

                <div className="p-5">
                  <ul className="space-y-3 text-sm leading-6 text-slate-600">
                    <li>
                      • Warga diharapkan hadir sesuai jadwal regu masing-masing.
                    </li>

                    <li>
                      • Kegiatan dilaksanakan untuk menjaga keamanan dan
                      ketertiban lingkungan.
                    </li>

                    <li>
                      • Jika berhalangan hadir, warga diharapkan melakukan
                      koordinasi dengan anggota regu.
                    </li>

                    <li>
                      • Segera laporkan kejadian mencurigakan kepada pengurus
                      RT atau pihak yang berwenang.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Status */}
              <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    size={22}
                    className="text-emerald-600"
                  />

                  <h2 className="font-black text-slate-950">
                    Status Keamanan
                  </h2>
                </div>

                <div className="mt-5 rounded-2xl bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Siskamling
                      </p>

                      <p className="mt-1 font-black text-slate-900">
                        Aktif
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Berjalan
                    </span>
                  </div>
                </div>
              </div>

              {/* Regu */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Users
                    size={22}
                    className="text-emerald-600"
                  />

                  <h2 className="font-black text-slate-950">
                    Pembagian Regu
                  </h2>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Jadwal siskamling dibagi berdasarkan regu warga agar
                  pelaksanaan keamanan lingkungan lebih teratur.
                </p>
              </div>

              {/* Informasi Kontak */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Butuh Bantuan?
                </p>

                <h2 className="mt-2 font-black text-slate-900">
                  Hubungi Pengurus RT
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Jika terdapat masalah keamanan atau keadaan darurat,
                  segera hubungi pengurus RT 01.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}