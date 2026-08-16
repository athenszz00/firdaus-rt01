import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function KegiatanWarga() {
  const agenda = [
    {
      tanggal: "Sabtu, 20 Juni 2026",
      waktu: "19.30 - 21.00",
      kegiatan: "Rapat Warga RT 01",
      lokasi: "Balai Pertemuan RT 01",
      kategori: "Rapat Warga",
    },
    {
      tanggal: "Minggu, 28 Juni 2026",
      waktu: "07.00 - 10.00",
      kegiatan: "Kerja Bakti Lingkungan",
      lokasi: "Lingkungan RT 01",
      kategori: "Lingkungan",
    },
    {
      tanggal: "Sabtu, 11 Juli 2026",
      waktu: "19.30 - 21.00",
      kegiatan: "Pertemuan Warga",
      lokasi: "Balai Pertemuan RT 01",
      kategori: "Kemasyarakatan",
    },
    {
      tanggal: "Minggu, 19 Juli 2026",
      waktu: "08.00 - 11.00",
      kegiatan: "Kegiatan Sosial Warga",
      lokasi: "Lingkungan RT 01",
      kategori: "Sosial",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:py-14">
        <div className="mb-8">
          {/* Back */}
          <Link
            to="/layanan"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-emerald-600"
          >
            <ArrowLeft size={17} />
            Kembali ke Layanan
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Main Content */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <CalendarDays size={25} />
                </div>

                <div>
                  <p className="text-sm font-bold text-emerald-600">
                    Sosial Kemasyarakatan
                  </p>

                  <h1 className="mt-1 text-3xl font-black text-slate-950">
                    Kegiatan Warga
                  </h1>

                  <p className="mt-2 leading-7 text-slate-500">
                    Informasi kegiatan dan agenda warga RT 01 agar
                    seluruh warga dapat mengetahui jadwal kegiatan
                    lingkungan.
                  </p>
                </div>
              </div>

              <div className="my-8 border-t border-slate-100" />

              {/* Info */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                  <div className="flex items-center gap-3">
                    <Users
                      size={21}
                      className="text-emerald-600"
                    />

                    <h2 className="font-black text-slate-900">
                      Partisipasi Warga
                    </h2>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Seluruh warga RT 01 dapat mengikuti kegiatan
                    sesuai dengan jadwal dan ketentuan yang telah
                    ditetapkan.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      size={21}
                      className="text-emerald-600"
                    />

                    <h2 className="font-black text-slate-900">
                      Agenda Terjadwal
                    </h2>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Informasi agenda membantu warga mempersiapkan
                    waktu dan berpartisipasi dalam kegiatan RT.
                  </p>
                </div>
              </div>

              {/* Agenda */}
              <div className="mt-8">
                <div className="flex items-center gap-3">
                  <CalendarDays
                    size={21}
                    className="text-emerald-600"
                  />

                  <h2 className="text-xl font-black text-slate-950">
                    Agenda Kegiatan
                  </h2>
                </div>

                <div className="mt-5 space-y-4">
                  {agenda.map((item) => (
                    <article
                      key={`${item.tanggal}-${item.kegiatan}`}
                      className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-200 hover:shadow-sm"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                            {item.kategori}
                          </span>

                          <h3 className="mt-3 text-lg font-black text-slate-900">
                            {item.kegiatan}
                          </h3>
                        </div>

                        <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                          Terjadwal
                        </span>
                      </div>

                      <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 text-sm text-slate-500 sm:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={16} />
                          {item.tanggal}
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock3 size={16} />
                          {item.waktu}
                        </div>

                        <div className="flex items-center gap-2 sm:col-span-2">
                          <MapPin size={16} />
                          {item.lokasi}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Ketentuan */}
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-100 px-5 py-4">
                  <h2 className="font-black text-slate-900">
                    Ketentuan Kegiatan
                  </h2>
                </div>

                <div className="p-5">
                  <ul className="space-y-3 text-sm leading-6 text-slate-600">
                    <li>
                      • Warga diharapkan hadir sesuai waktu kegiatan.
                    </li>

                    <li>
                      • Ikuti arahan pengurus RT selama kegiatan
                      berlangsung.
                    </li>

                    <li>
                      • Jaga ketertiban dan kebersihan lokasi kegiatan.
                    </li>

                    <li>
                      • Apabila terdapat perubahan jadwal, informasi
                      akan diperbarui oleh pengurus RT.
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
                  <CalendarDays
                    size={22}
                    className="text-emerald-600"
                  />

                  <h2 className="font-black text-slate-950">
                    Agenda RT 01
                  </h2>
                </div>

                <div className="mt-5 rounded-2xl bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Status Agenda
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="font-black text-slate-900">
                      Aktif
                    </p>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Berjalan
                    </span>
                  </div>
                </div>
              </div>

              {/* Jenis Kegiatan */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Users
                    size={22}
                    className="text-emerald-600"
                  />

                  <h2 className="font-black text-slate-950">
                    Jenis Kegiatan
                  </h2>
                </div>

                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-500">
                  <li>• Rapat warga</li>
                  <li>• Kegiatan lingkungan</li>
                  <li>• Kegiatan sosial</li>
                  <li>• Kegiatan kemasyarakatan</li>
                  <li>• Kegiatan lainnya</li>
                </ul>
              </div>

              {/* Informasi */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Informasi
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Jadwal dan agenda kegiatan dapat diperbarui oleh
                  pengurus RT sesuai kebutuhan dan kondisi lingkungan.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}