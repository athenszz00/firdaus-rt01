import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  MapPin,
  Send,
} from "lucide-react";

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function SuratDomisili() {
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
            {/* Form */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <MapPin size={25} />
                </div>

                <div>
                  <p className="text-sm font-bold text-emerald-600">
                    Layanan Administrasi
                  </p>

                  <h1 className="mt-1 text-3xl font-black text-slate-950">
                    Surat Domisili
                  </h1>

                  <p className="mt-2 leading-7 text-slate-500">
                    Ajukan surat keterangan domisili melalui sistem pelayanan
                    digital Firdaus RT 01.
                  </p>
                </div>
              </div>

              <div className="my-8 border-t border-slate-100" />

              <form className="space-y-6">
                {/* NIK */}
                <div>
                  <label
                    htmlFor="nik"
                    className="mb-2 block text-sm font-bold text-slate-800"
                  >
                    NIK
                  </label>

                  <input
                    id="nik"
                    name="nik"
                    type="text"
                    placeholder="Masukkan 16 digit NIK"
                    maxLength={16}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>

                {/* Nama */}
                <div>
                  <label
                    htmlFor="nama"
                    className="mb-2 block text-sm font-bold text-slate-800"
                  >
                    Nama Lengkap
                  </label>

                  <input
                    id="nama"
                    name="nama"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>

                {/* No KK & No HP */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="no_kk"
                      className="mb-2 block text-sm font-bold text-slate-800"
                    >
                      Nomor KK
                    </label>

                    <input
                      id="no_kk"
                      name="no_kk"
                      type="text"
                      placeholder="16 digit nomor KK"
                      maxLength={16}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="no_hp"
                      className="mb-2 block text-sm font-bold text-slate-800"
                    >
                      Nomor HP
                    </label>

                    <input
                      id="no_hp"
                      name="no_hp"
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                {/* Alamat */}
                <div>
                  <label
                    htmlFor="alamat"
                    className="mb-2 block text-sm font-bold text-slate-800"
                  >
                    Alamat Domisili
                  </label>

                  <textarea
                    id="alamat"
                    name="alamat"
                    rows={4}
                    placeholder="Masukkan alamat tempat tinggal"
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>

                {/* Keperluan */}
                <div>
                  <label
                    htmlFor="keperluan"
                    className="mb-2 block text-sm font-bold text-slate-800"
                  >
                    Keperluan Surat
                  </label>

                  <textarea
                    id="keperluan"
                    name="keperluan"
                    rows={3}
                    placeholder="Jelaskan keperluan pembuatan surat domisili"
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
                          Upload dokumen pendukung
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Gunakan file PDF, JPG, atau PNG jika diperlukan.
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

                {/* Submit */}
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                >
                  <Send size={18} />
                  Ajukan Surat Domisili
                </button>
              </form>
            </section>

            {/* Information */}
            <aside className="space-y-5">
              <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={22}
                    className="text-emerald-600"
                  />

                  <h2 className="font-black text-slate-950">
                    Informasi Pengajuan
                  </h2>
                </div>

                <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
                  <li>• Pastikan data yang dimasukkan sudah benar.</li>
                  <li>• Gunakan NIK dan nomor KK sesuai data kependudukan.</li>
                  <li>• Pengajuan akan diverifikasi oleh Admin RT.</li>
                  <li>• Surat dapat diproses setelah pengajuan disetujui.</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Status Proses
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

                      <p className="text-xs text-slate-500">
                        Data dikirim warga
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500">
                      2
                    </div>

                    <div>
                      <p className="font-bold text-slate-900">
                        Verifikasi
                      </p>

                      <p className="text-xs text-slate-500">
                        Diperiksa Admin RT
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500">
                      3
                    </div>

                    <div>
                      <p className="font-bold text-slate-900">
                        Selesai
                      </p>

                      <p className="text-xs text-slate-500">
                        Surat siap diproses
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}