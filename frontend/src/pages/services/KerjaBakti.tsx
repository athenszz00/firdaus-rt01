import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Hammer,
  MapPin,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function KerjaBakti() {
  const jadwal = [
    {
      tanggal: "Minggu, 14 Juni 2026",
      waktu: "07.00 - 10.00",
      lokasi: "Lingkungan RT 01",
      kegiatan: "Pembersihan lingkungan",
    },
    {
      tanggal: "Minggu, 12 Juli 2026",
      waktu: "07.00 - 10.00",
      lokasi: "Lingkungan RT 01",
      kegiatan: "Pembersihan fasilitas umum",
    },
    {
      tanggal: "Minggu, 9 Agustus 2026",
      waktu: "07.00 - 10.00",
      lokasi: "Lingkungan RT 01",
      kegiatan: "Pembersihan saluran air",
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
                  <Hammer size={25} />
                </div>

                <div>
                  <p className="text-sm font-bold text-emerald-600">
                    Kegiatan Lingkungan
                  </p>

                  <h1 className="mt-1 text-3xl font-black text-slate-950">
                    Kerja Bakti
                  </h1>

                  <p className="mt-2 leading-7 text-slate-500">
                    Informasi dan jadwal kegiatan kerja bakti warga
                    RT 01 untuk menjaga kebersihan dan kenyamanan
                    lingkungan.
                  </p>
                </div>
              </div>

              <div className="my-8 border-t border-slate-100" />

              {/* Informasi */}
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
                    Kerja bakti dilaksanakan bersama warga untuk
                    menjaga kebersihan dan kenyamanan lingkungan RT 01.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      size={21}
                      className="text-emerald-600"
                    />

                    <h2 className="font-black text-slate-900">
                      Lingkungan Bersih
                    </h2>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Kegiatan difokuskan pada kebersihan fasilitas
                    umum dan area lingkungan warga.
                  </p>
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
                    Jadwal Kerja Bakti
                  </h2>
                </div>

                <div className="mt-5 space-y-4">
                  {jadwal.map((item) => (
                    <div
                      key={`${item.tanggal}-${item.lokasi}`}
                      className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-200 hover:shadow-sm"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-black text-slate-900">
                            {item.tanggal}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                            <span className="flex items-center gap-2">
                              <Clock3 size={15} />
                              {item.waktu}
                            </span>

                            <span className="flex items-center gap-2">
                              <MapPin size={15} />
                              {item.lokasi}
                            </span>
                          </div>
                        </div>

                        <span className="inline-flex w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                          Terjadwal
                        </span>
                      </div>

                      <div className="mt-4 border-t border-slate-100 pt-4">
                        <p className="text-sm text-slate-600">
                          <span className="font-bold text-slate-800">
                            Kegiatan:
                          </span>{" "}
                          {item.kegiatan}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perlengkapan */}
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-100 px-5 py-4">
                  <h2 className="font-black text-slate-900">
                    Perlengkapan yang Disarankan
                  </h2>
                </div>

                <div className="grid gap-3 p-5 sm:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    • Sapu dan pengki
                  </div>

                  <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    • Cangkul atau sekop
                  </div>

                  <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    • Sarung tangan
                  </div>

                  <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    • Kantong sampah
                  </div>
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
                      • Warga diharapkan hadir sesuai jadwal yang telah
                      ditentukan.
                    </li>

                    <li>
                      • Gunakan pakaian yang nyaman dan sesuai untuk
                      kegiatan lingkungan.
                    </li>

                    <li>
                      • Jaga keselamatan selama kegiatan berlangsung.
                    </li>

                    <li>
                      • Setelah kegiatan selesai, pastikan area kerja
                      kembali dalam kondisi rapi.
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
                  <Hammer
                    size={22}
                    className="text-emerald-600"
                  />

                  <h2 className="font-black text-slate-950">
                    Kegiatan Warga
                  </h2>
                </div>

                <div className="mt-5 rounded-2xl bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Status
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

              {/* Manfaat */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={22}
                    className="text-emerald-600"
                  />

                  <h2 className="font-black text-slate-950">
                    Manfaat Kerja Bakti
                  </h2>
                </div>

                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-500">
                  <li>• Menjaga kebersihan lingkungan.</li>

                  <li>• Mencegah lingkungan menjadi kumuh.</li>

                  <li>• Mempererat hubungan antarwarga.</li>

                  <li>• Meningkatkan kepedulian terhadap lingkungan.</li>
                </ul>
              </div>

              {/* Informasi */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Informasi
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Jadwal dan lokasi kegiatan dapat diperbarui oleh
                  pengurus RT apabila terdapat perubahan.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}