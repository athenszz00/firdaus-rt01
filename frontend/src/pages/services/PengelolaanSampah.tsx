import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Recycle,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function PengelolaanSampah() {
  const jadwal = [
    {
      hari: "Senin",
      waktu: "06.00 - 09.00",
      jenis: "Sampah Rumah Tangga",
    },
    {
      hari: "Rabu",
      waktu: "06.00 - 09.00",
      jenis: "Sampah Rumah Tangga",
    },
    {
      hari: "Jumat",
      waktu: "06.00 - 09.00",
      jenis: "Sampah Rumah Tangga",
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
                  <Trash2 size={25} />
                </div>

                <div>
                  <p className="text-sm font-bold text-emerald-600">
                    Lingkungan
                  </p>

                  <h1 className="mt-1 text-3xl font-black text-slate-950">
                    Pengelolaan Sampah
                  </h1>

                  <p className="mt-2 leading-7 text-slate-500">
                    Informasi jadwal dan tata kelola sampah warga
                    RT 01 untuk menjaga lingkungan tetap bersih dan
                    nyaman.
                  </p>
                </div>
              </div>

              <div className="my-8 border-t border-slate-100" />

              {/* Informasi Utama */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                  <div className="flex items-center gap-3">
                    <Recycle
                      size={21}
                      className="text-emerald-600"
                    />

                    <h2 className="font-black text-slate-900">
                      Pilah Sampah
                    </h2>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Pisahkan sampah berdasarkan jenisnya agar proses
                    pengelolaan dan pemanfaatan kembali dapat dilakukan
                    dengan lebih baik.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      size={21}
                      className="text-emerald-600"
                    />

                    <h2 className="font-black text-slate-900">
                      Buang Tepat Waktu
                    </h2>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Letakkan sampah pada tempat yang telah ditentukan
                    dan sesuai dengan jadwal pengangkutan.
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
                    Jadwal Pengangkutan
                  </h2>
                </div>

                <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                  <div className="grid grid-cols-[1fr_1fr_1.5fr] border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                    <span>Hari</span>
                    <span>Waktu</span>
                    <span>Jenis Sampah</span>
                  </div>

                  {jadwal.map((item) => (
                    <div
                      key={item.hari}
                      className="grid grid-cols-[1fr_1fr_1.5fr] border-b border-slate-100 px-4 py-4 text-sm last:border-b-0"
                    >
                      <span className="font-bold text-slate-800">
                        {item.hari}
                      </span>

                      <span className="flex items-center gap-2 text-slate-600">
                        <Clock3 size={15} />
                        {item.waktu}
                      </span>

                      <span className="text-slate-600">
                        {item.jenis}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ketentuan */}
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-100 px-5 py-4">
                  <h2 className="font-black text-slate-900">
                    Ketentuan Pengelolaan Sampah
                  </h2>
                </div>

                <div className="p-5">
                  <ul className="space-y-3 text-sm leading-6 text-slate-600">
                    <li>
                      • Buang sampah pada tempat yang telah disediakan.
                    </li>

                    <li>
                      • Pisahkan sampah organik dan anorganik jika
                      fasilitas pemilahan tersedia.
                    </li>

                    <li>
                      • Hindari membuang sampah ke selokan, jalan,
                      atau fasilitas umum.
                    </li>

                    <li>
                      • Gunakan wadah tertutup untuk sampah yang dapat
                      menimbulkan bau.
                    </li>

                    <li>
                      • Jaga kebersihan area sekitar tempat pembuangan.
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
                  <Trash2
                    size={22}
                    className="text-emerald-600"
                  />

                  <h2 className="font-black text-slate-950">
                    Layanan Sampah
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

              {/* Tips */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Recycle
                    size={22}
                    className="text-emerald-600"
                  />

                  <h2 className="font-black text-slate-950">
                    Tips Warga
                  </h2>
                </div>

                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-500">
                  <li>
                    • Kurangi penggunaan plastik sekali pakai.
                  </li>

                  <li>
                    • Gunakan kembali barang yang masih layak.
                  </li>

                  <li>
                    • Pisahkan barang yang dapat didaur ulang.
                  </li>

                  <li>
                    • Jangan membakar sampah sembarangan.
                  </li>
                </ul>
              </div>

              {/* Informasi */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Informasi
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Jika terdapat perubahan jadwal pengangkutan atau
                  kendala layanan, informasi dapat diperbarui oleh
                  pengurus RT.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}