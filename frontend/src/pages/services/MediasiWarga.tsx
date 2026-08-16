import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  FileText,
  HeartHandshake,
  Send,
  UserRound,
} from "lucide-react";

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function MediasiWarga() {
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
            {/* Form */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <HeartHandshake size={25} />
                </div>

                <div>
                  <p className="text-sm font-bold text-emerald-600">
                    Layanan Sosial Kemasyarakatan
                  </p>

                  <h1 className="mt-1 text-3xl font-black text-slate-950">
                    Mediasi Warga
                  </h1>

                  <p className="mt-2 leading-7 text-slate-500">
                    Ajukan permohonan mediasi untuk membantu menyelesaikan
                    permasalahan antarwarga secara musyawarah dan kekeluargaan.
                  </p>
                </div>
              </div>

              <div className="my-8 border-t border-slate-100" />

              <form className="space-y-6">
                {/* Nama Pengaju */}
                <div>
                  <label
                    htmlFor="nama_pengaju"
                    className="mb-2 block text-sm font-bold text-slate-800"
                  >
                    Nama Pengaju
                  </label>

                  <div className="relative">
                    <UserRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="nama_pengaju"
                      name="nama_pengaju"
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                {/* Kategori */}
                <div>
                  <label
                    htmlFor="kategori"
                    className="mb-2 block text-sm font-bold text-slate-800"
                  >
                    Kategori Permasalahan
                  </label>

                  <select
                    id="kategori"
                    name="kategori"
                    defaultValue=""
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  >
                    <option value="" disabled>
                      Pilih kategori permasalahan
                    </option>

                    <option value="tetangga">
                      Permasalahan Antar Tetangga
                    </option>

                    <option value="batas_lahan">
                      Batas Lahan / Properti
                    </option>

                    <option value="kebisingan">
                      Kebisingan / Ketertiban Lingkungan
                    </option>

                    <option value="sosial">
                      Permasalahan Sosial
                    </option>

                    <option value="lainnya">
                      Permasalahan Lainnya
                    </option>
                  </select>
                </div>

                {/* Pihak Terkait */}
                <div>
                  <label
                    htmlFor="pihak_terkait"
                    className="mb-2 block text-sm font-bold text-slate-800"
                  >
                    Pihak yang Terlibat
                  </label>

                  <input
                    id="pihak_terkait"
                    name="pihak_terkait"
                    type="text"
                    placeholder="Nama pihak yang terlibat"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>

                {/* Kronologi */}
                <div>
                  <label
                    htmlFor="kronologi"
                    className="mb-2 block text-sm font-bold text-slate-800"
                  >
                    Kronologi Permasalahan
                  </label>

                  <textarea
                    id="kronologi"
                    name="kronologi"
                    rows={6}
                    placeholder="Jelaskan permasalahan dan kronologi kejadian secara jelas"
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>

                {/* Harapan */}
                <div>
                  <label
                    htmlFor="harapan"
                    className="mb-2 block text-sm font-bold text-slate-800"
                  >
                    Harapan Penyelesaian
                  </label>

                  <textarea
                    id="harapan"
                    name="harapan"
                    rows={4}
                    placeholder="Jelaskan solusi atau penyelesaian yang diharapkan"
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>

                {/* Dokumen */}
                <div>
                  <label
                    htmlFor="dokumen"
                    className="mb-2 block text-sm font-bold text-slate-800"
                  >
                    Dokumen Pendukung
                  </label>

                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
                    <div className="flex items-start gap-3">
                      <FileText
                        size={20}
                        className="mt-0.5 text-emerald-600"
                      />

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Upload dokumen jika diperlukan
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Gunakan PDF, JPG, atau PNG sebagai dokumen pendukung.
                        </p>
                      </div>
                    </div>

                    <input
                      id="dokumen"
                      name="dokumen"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="mt-4 block w-full text-sm text-slate-500 file:mr-4 file:rounded-xl file:border-0 file:bg-emerald-50 file:px-4 file:py-2.5 file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                    />
                  </div>
                </div>

                {/* Notice */}
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex gap-3">
                    <AlertCircle
                      size={19}
                      className="mt-0.5 shrink-0 text-amber-600"
                    />

                    <p className="text-sm leading-6 text-amber-800">
                      Mediasi dilakukan berdasarkan musyawarah dan
                      kesepakatan para pihak. Pengajuan akan terlebih dahulu
                      diperiksa oleh Admin RT.
                    </p>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                >
                  <Send size={18} />
                  Ajukan Mediasi
                </button>
              </form>
            </section>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Informasi */}
              <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={22}
                    className="text-emerald-600"
                  />

                  <h2 className="font-black text-slate-950">
                    Informasi Mediasi
                  </h2>
                </div>

                <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
                  <li>
                    • Sampaikan permasalahan dengan jujur dan jelas.
                  </li>

                  <li>
                    • Hindari penggunaan bahasa yang mengandung penghinaan
                    atau ancaman.
                  </li>

                  <li>
                    • Mediasi mengutamakan musyawarah dan penyelesaian secara
                    kekeluargaan.
                  </li>

                  <li>
                    • Admin RT akan menghubungi pihak terkait apabila
                    diperlukan.
                  </li>
                </ul>
              </div>

              {/* Tahapan */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tahapan Mediasi
                </p>

                <div className="mt-5 space-y-5">
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                      1
                    </div>

                    <div>
                      <p className="font-bold text-slate-900">
                        Pengajuan
                      </p>

                      <p className="text-xs leading-5 text-slate-500">
                        Warga mengirimkan permohonan mediasi.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500">
                      2
                    </div>

                    <div>
                      <p className="font-bold text-slate-900">
                        Pemeriksaan
                      </p>

                      <p className="text-xs leading-5 text-slate-500">
                        Admin memeriksa permasalahan dan pihak terkait.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500">
                      3
                    </div>

                    <div>
                      <p className="font-bold text-slate-900">
                        Mediasi
                      </p>

                      <p className="text-xs leading-5 text-slate-500">
                        Proses musyawarah dilakukan bersama pihak terkait.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500">
                      4
                    </div>

                    <div>
                      <p className="font-bold text-slate-900">
                        Penyelesaian
                      </p>

                      <p className="text-xs leading-5 text-slate-500">
                        Hasil kesepakatan dicatat oleh pengurus RT.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Catatan */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Catatan
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Mediasi RT ditujukan untuk membantu penyelesaian
                  permasalahan sosial di lingkungan warga. Untuk keadaan
                  darurat atau perkara yang memerlukan penanganan aparat,
                  hubungi pihak berwenang.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}