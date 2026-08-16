import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Home,
  MapPin,
  Phone,
  Save,
  UserRound,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function PendataanWarga() {
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
                  <Users size={25} />
                </div>

                <div>
                  <p className="text-sm font-bold text-emerald-600">
                    Layanan Kependudukan
                  </p>

                  <h1 className="mt-1 text-3xl font-black text-slate-950">
                    Pendataan Warga
                  </h1>

                  <p className="mt-2 leading-7 text-slate-500">
                    Lengkapi data diri untuk membantu pengurus RT 01
                    memperbarui data kependudukan warga.
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

                  <div className="relative">
                    <FileText
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="nik"
                      name="nik"
                      type="text"
                      maxLength={16}
                      placeholder="Masukkan 16 digit NIK"
                      className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                {/* Nomor KK */}
                <div>
                  <label
                    htmlFor="no_kk"
                    className="mb-2 block text-sm font-bold text-slate-800"
                  >
                    Nomor Kartu Keluarga
                  </label>

                  <div className="relative">
                    <Home
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="no_kk"
                      name="no_kk"
                      type="text"
                      maxLength={16}
                      placeholder="Masukkan 16 digit nomor KK"
                      className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                {/* Nama */}
                <div>
                  <label
                    htmlFor="nama"
                    className="mb-2 block text-sm font-bold text-slate-800"
                  >
                    Nama Lengkap
                  </label>

                  <div className="relative">
                    <UserRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="nama"
                      name="nama"
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                {/* Data pribadi */}
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Tempat Lahir */}
                  <div>
                    <label
                      htmlFor="tempat_lahir"
                      className="mb-2 block text-sm font-bold text-slate-800"
                    >
                      Tempat Lahir
                    </label>

                    <input
                      id="tempat_lahir"
                      name="tempat_lahir"
                      type="text"
                      placeholder="Contoh: Bandung"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>

                  {/* Tanggal Lahir */}
                  <div>
                    <label
                      htmlFor="tanggal_lahir"
                      className="mb-2 block text-sm font-bold text-slate-800"
                    >
                      Tanggal Lahir
                    </label>

                    <input
                      id="tanggal_lahir"
                      name="tanggal_lahir"
                      type="date"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                {/* Jenis Kelamin */}
                <div>
                  <label
                    htmlFor="jenis_kelamin"
                    className="mb-2 block text-sm font-bold text-slate-800"
                  >
                    Jenis Kelamin
                  </label>

                  <select
                    id="jenis_kelamin"
                    name="jenis_kelamin"
                    defaultValue=""
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  >
                    <option value="" disabled>
                      Pilih jenis kelamin
                    </option>

                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>

                {/* Nomor HP */}
                <div>
                  <label
                    htmlFor="no_hp"
                    className="mb-2 block text-sm font-bold text-slate-800"
                  >
                    Nomor HP
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="no_hp"
                      name="no_hp"
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                {/* Alamat */}
                <div>
                  <label
                    htmlFor="alamat"
                    className="mb-2 block text-sm font-bold text-slate-800"
                  >
                    Alamat
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-4 text-slate-400"
                    />

                    <textarea
                      id="alamat"
                      name="alamat"
                      rows={4}
                      placeholder="Masukkan alamat lengkap"
                      className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3.5 pl-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                {/* RT / RW */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="rt"
                      className="mb-2 block text-sm font-bold text-slate-800"
                    >
                      RT
                    </label>

                    <input
                      id="rt"
                      name="rt"
                      type="text"
                      value="01"
                      readOnly
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-semibold text-slate-600 outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="rw"
                      className="mb-2 block text-sm font-bold text-slate-800"
                    >
                      RW
                    </label>

                    <input
                      id="rw"
                      name="rw"
                      type="text"
                      placeholder="Nomor RW"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label
                    htmlFor="status_perkawinan"
                    className="mb-2 block text-sm font-bold text-slate-800"
                  >
                    Status Perkawinan
                  </label>

                  <select
                    id="status_perkawinan"
                    name="status_perkawinan"
                    defaultValue=""
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  >
                    <option value="" disabled>
                      Pilih status perkawinan
                    </option>

                    <option value="belum_menikah">
                      Belum Menikah
                    </option>

                    <option value="menikah">
                      Menikah
                    </option>

                    <option value="cerai_hidup">
                      Cerai Hidup
                    </option>

                    <option value="cerai_mati">
                      Cerai Mati
                    </option>
                  </select>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                >
                  <Save size={18} />
                  Simpan Data Warga
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
                    Informasi Pendataan
                  </h2>
                </div>

                <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
                  <li>
                    • Pastikan seluruh data yang dimasukkan sudah benar.
                  </li>

                  <li>
                    • NIK dan Nomor KK harus sesuai dengan dokumen
                    kependudukan.
                  </li>

                  <li>
                    • Data digunakan untuk kebutuhan administrasi RT 01.
                  </li>

                  <li>
                    • Perubahan data dapat diperbarui kembali apabila
                    terdapat perubahan.
                  </li>
                </ul>
              </div>

              {/* Data yang dibutuhkan */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Users
                    size={22}
                    className="text-emerald-600"
                  />

                  <h2 className="font-black text-slate-950">
                    Data yang Dibutuhkan
                  </h2>
                </div>

                <ul className="mt-5 space-y-3 text-sm text-slate-500">
                  <li>• NIK</li>
                  <li>• Nomor KK</li>
                  <li>• Nama lengkap</li>
                  <li>• Tempat dan tanggal lahir</li>
                  <li>• Jenis kelamin</li>
                  <li>• Nomor HP</li>
                  <li>• Alamat</li>
                  <li>• Status perkawinan</li>
                </ul>
              </div>

              {/* Status */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Pendataan RT 01
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                  <p className="font-bold text-slate-900">
                    Sistem pendataan aktif
                  </p>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Data warga akan digunakan untuk membantu pengurus
                  dalam pengelolaan administrasi dan pelayanan RT.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}