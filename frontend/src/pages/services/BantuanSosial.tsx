import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  HeartHandshake,
  MapPin,
  Megaphone,
} from "lucide-react";

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function BantuanSosial() {
  const bantuan = [
    {
      judul: "Program Bantuan Pangan",
      kategori: "Bantuan Pemerintah",
      sumber: "Informasi Kelurahan",
      tanggal: "10 Agustus 2026",
      batas: "20 Agustus 2026",
      lokasi: "Kantor Kelurahan",
      deskripsi:
        "Informasi penyaluran bantuan pangan bagi warga yang telah terdata sebagai penerima bantuan.",
      status: "Informasi Terbaru",
    },
    {
      judul: "Bantuan Pendidikan Warga",
      kategori: "Bantuan Pendidikan",
      sumber: "Informasi RW",
      tanggal: "5 Agustus 2026",
      batas: "25 Agustus 2026",
      lokasi: "Sekretariat RW",
      deskripsi:
        "Informasi program bantuan pendidikan untuk warga yang memenuhi persyaratan.",
      status: "Pendaftaran",
    },
    {
      judul: "Program Bantuan Sosial",
      kategori: "Bantuan Sosial",
      sumber: "Pengurus RT 01",
      tanggal: "1 Agustus 2026",
      batas: "31 Agustus 2026",
      lokasi: "RT 01",
      deskripsi:
        "Informasi program bantuan sosial yang tersedia bagi warga RT 01.",
      status: "Berlangsung",
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
                  <HeartHandshake size={25} />
                </div>

                <div>
                  <p className="text-sm font-bold text-emerald-600">
                    Sosial Kemasyarakatan
                  </p>

                  <h1 className="mt-1 text-3xl font-black text-slate-950">
                    Bantuan Sosial
                  </h1>

                  <p className="mt-2 leading-7 text-slate-500">
                    Pusat informasi bantuan sosial dan program bantuan
                    yang tersedia bagi warga RT 01.
                  </p>
                </div>
              </div>

              <div className="my-8 border-t border-slate-100" />

              {/* Announcement */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                <div className="flex gap-3">
                  <Megaphone
                    size={21}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <div>
                    <h2 className="font-black text-slate-900">
                      Informasi Bantuan Terbaru
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Informasi bantuan yang ditampilkan berasal dari
                      sumber yang disampaikan kepada pengurus RT 01,
                      seperti Kelurahan/Desa, RW, maupun instansi terkait.
                    </p>
                  </div>
                </div>
              </div>

              {/* Daftar bantuan */}
              <div className="mt-8">
                <div className="flex items-center gap-3">
                  <FileText
                    size={21}
                    className="text-emerald-600"
                  />

                  <h2 className="text-xl font-black text-slate-950">
                    Program Bantuan
                  </h2>
                </div>

                <div className="mt-5 space-y-5">
                  {bantuan.map((item) => (
                    <article
                      key={item.judul}
                      className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-200 hover:shadow-sm"
                    >
                      {/* Header Card */}
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                            {item.kategori}
                          </span>

                          <h3 className="mt-3 text-lg font-black text-slate-900">
                            {item.judul}
                          </h3>
                        </div>

                        <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                          {item.status}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        {item.deskripsi}
                      </p>

                      {/* Source */}
                      <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Sumber Informasi
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-700">
                          {item.sumber}
                        </p>
                      </div>

                      {/* Detail */}
                      <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 text-sm text-slate-500 sm:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={16} />
                          Diumumkan: {item.tanggal}
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock3 size={16} />
                          Batas: {item.batas}
                        </div>

                        <div className="flex items-center gap-2 sm:col-span-2">
                          <MapPin size={16} />
                          Lokasi: {item.lokasi}
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
                    Hal yang Perlu Diperhatikan
                  </h2>
                </div>

                <div className="p-5">
                  <ul className="space-y-3 text-sm leading-6 text-slate-600">
                    <li>
                      • Pastikan memenuhi persyaratan sebelum melakukan
                      pendaftaran bantuan.
                    </li>

                    <li>
                      • Perhatikan tanggal dan batas waktu yang tercantum
                      dalam pengumuman.
                    </li>

                    <li>
                      • Bawa dokumen yang dipersyaratkan ketika melakukan
                      pengambilan atau pendaftaran bantuan.
                    </li>

                    <li>
                      • Informasi bantuan dapat berubah sesuai dengan
                      kebijakan dari pihak penyelenggara.
                    </li>

                    <li>
                      • Hubungi pengurus RT apabila membutuhkan informasi
                      tambahan.
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
                  <Megaphone
                    size={22}
                    className="text-emerald-600"
                  />

                  <h2 className="font-black text-slate-950">
                    Informasi Sosial
                  </h2>
                </div>

                <div className="mt-5 rounded-2xl bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Status Informasi
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="font-black text-slate-900">
                      Aktif
                    </p>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Diperbarui
                    </span>
                  </div>
                </div>
              </div>

              {/* Sumber */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={22}
                    className="text-emerald-600"
                  />

                  <h2 className="font-black text-slate-950">
                    Sumber Informasi
                  </h2>
                </div>

                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-500">
                  <li>• Kelurahan / Desa</li>
                  <li>• Kecamatan</li>
                  <li>• RW setempat</li>
                  <li>• Pengurus RT 01</li>
                  <li>• Instansi terkait</li>
                </ul>
              </div>

              {/* Catatan */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Catatan
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Informasi yang ditampilkan merupakan informasi yang
                  diterima dan dipublikasikan oleh pengurus RT. Warga
                  tetap disarankan memeriksa ketentuan resmi dari
                  penyelenggara bantuan.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}