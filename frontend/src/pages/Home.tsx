import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  FileText,
  HeartHandshake,
  Home,
  MapPin,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


const services = [
  {
    title: "Surat Pengantar",
    description:
      "Buat surat pengantar untuk KTP, KK, SKCK, surat nikah, SKTM, dan keperluan lainnya.",
    icon: FileText,
    color: "emerald",
    path: "/layanan/surat-pengantar-ktp",
  },
  {
    title: "Surat Keterangan",
    description:
      "Ajukan berbagai surat keterangan warga melalui proses yang lebih mudah.",
    icon: FileCheck2,
    color: "blue",
    path: "/layanan/surat-keterangan",
  },
  {
    title: "Pendataan Warga",
    description:
      "Kelola informasi warga baru, pindah rumah, kelahiran, dan kematian.",
    icon: Users,
    color: "violet",
    path: "/layanan/pendataan-warga",
  },
  {
    title: "Surat Domisili",
    description:
      "Pengurusan surat keterangan tinggal atau usaha di lingkungan RT 01.",
    icon: MapPin,
    color: "amber",
    path: "/layanan/surat-domisili",
  },
  {
    title: "Siskamling",
    description:
      "Lihat jadwal ronda dan informasi keamanan lingkungan RT 01.",
    icon: ShieldCheck,
    color: "rose",
    path: "/layanan/siskamling",
  },
  {
    title: "Kerja Bakti",
    description:
      "Informasi jadwal dan kegiatan kebersihan lingkungan bersama warga.",
    icon: HeartHandshake,
    color: "cyan",
    path: "/layanan/kerja-bakti",
  },
  {
    title: "Pengelolaan Sampah",
    description:
      "Informasi jadwal pengangkutan dan pengelolaan sampah warga.",
    icon: Trash2,
    color: "lime",
    path: "/layanan/sampah",
  },
  {
    title: "Mediasi Warga",
    description:
      "Mendukung penyelesaian permasalahan antarwarga secara kekeluargaan.",
    icon: HeartHandshake,
    color: "pink",
    path: "/layanan/mediasi-warga",
  },
  {
    title: "Bantuan Sosial",
    description:
      "Informasi dan penyaluran bantuan sosial untuk masyarakat yang membutuhkan.",
    icon: HeartHandshake,
    color: "orange",
    path: "/layanan/bantuan-sosial",
  },
  {
    title: "Kegiatan Warga",
    description:
      "Informasi arisan, pengajian, kegiatan sosial, dan agenda warga lainnya.",
    icon: CalendarDays,
    color: "indigo",
    path: "/layanan/kegiatan-warga",
  },
];

const announcements = [
  {
    category: "Kerja Bakti",
    title: "Kerja Bakti Lingkungan RT 01",
    date: "23 Agustus 2026",
    description:
      "Mari bersama menjaga kebersihan lingkungan dan saluran air RT 01.",
  },
  {
    category: "Siskamling",
    title: "Jadwal Siskamling Minggu Ini",
    date: "17–23 Agustus 2026",
    description:
      "Jadwal ronda malam warga RT 01 telah diperbarui.",
  },
  {
    category: "Informasi",
    title: "Pelayanan Administrasi Warga",
    date: "15 Agustus 2026",
    description:
      "Pengajuan surat administrasi kini dapat dilakukan secara online.",
  },
];

const stats = [
  {
    value: "128+",
    label: "Warga",
    icon: Users,
  },
  {
    value: "42",
    label: "Kepala Keluarga",
    icon: Home,
  },
  {
    value: "10+",
    label: "Layanan Warga",
    icon: FileText,
  },
  {
    value: "24/7",
    label: "Akses Informasi",
    icon: Clock3,
  },
];

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}
      <section
        id="beranda"
        className="relative isolate overflow-hidden bg-white"
      >
        {/* Background Decoration */}
        <div className="absolute -right-40 -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-100/60 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 -z-10 h-[450px] w-[450px] rounded-full bg-emerald-50 blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

          {/* Hero Content */}
          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
              <Sparkles size={16} />
              Sistem Pelayanan Digital RT 01
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Pelayanan Warga
              <span className="block text-emerald-600">
                Lebih Mudah & Cepat
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Firdaus RT 01 hadir sebagai pusat informasi dan pelayanan
              warga yang membantu kebutuhan administrasi, lingkungan,
              keamanan, dan kegiatan kemasyarakatan secara lebih praktis.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

            <Link
              to="/layanan"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-xl shadow-emerald-600/20 transition hover:-translate-y-1 hover:bg-emerald-700"
            >
              Ajukan Layanan
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

              <a
                href="#tentang"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              >
                Mengenal RT 01
              </a>

            </div>

            {/* Trust */}
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="text-emerald-600"
                />
                Mudah digunakan
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="text-emerald-600"
                />
                Akses kapan saja
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="text-emerald-600"
                />
                Terintegrasi
              </div>

            </div>

          </div>

          {/* Hero Card */}
          <div className="relative">

            <div className="absolute -inset-4 rounded-[2rem] bg-emerald-100/50 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-emerald-700 p-2 shadow-2xl shadow-emerald-900/10">

              <div className="overflow-hidden rounded-[1.5rem] bg-white">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                      FIRDAUS RT 01
                    </p>

                    <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                      Portal Warga
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Home size={21} />
                  </div>

                </div>

                {/* Dashboard Preview */}
                <div className="space-y-4 p-6">

                  <div className="rounded-2xl bg-slate-50 p-5">

                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          Status Pelayanan
                        </p>

                        <p className="mt-1 text-lg font-bold text-slate-900">
                          Siap Melayani
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Aktif
                      </span>

                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-4">

                    <div className="rounded-2xl border border-slate-100 p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <Users size={19} />
                      </div>

                      <p className="mt-4 text-2xl font-black text-slate-900">
                        128+
                      </p>

                      <p className="text-xs font-medium text-slate-500">
                        Warga
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-100 p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <FileText size={19} />
                      </div>

                      <p className="mt-4 text-2xl font-black text-slate-900">
                        10+
                      </p>

                      <p className="text-xs font-medium text-slate-500">
                        Layanan
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                      <ShieldCheck size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Pelayanan lebih terorganisir
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Informasi dan pengajuan dalam satu tempat
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          STATS
      ====================================================== */}
      <section className="relative z-10 -mt-1 bg-white pb-8">

        <div className="mx-auto max-w-7xl px-5 sm:px-6">

          <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 sm:grid-cols-2 lg:grid-cols-4">

            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className={`flex items-center gap-4 p-6 ${
                    index !== 0
                      ? "border-t border-slate-100 sm:border-t-0 sm:border-l"
                      : ""
                  }`}
                >

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Icon size={21} />
                  </div>

                  <div>
                    <p className="text-2xl font-black text-slate-900">
                      {stat.value}
                    </p>

                    <p className="mt-0.5 text-xs font-medium text-slate-500">
                      {stat.label}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* =====================================================
          PROFILE
      ====================================================== */}
      <section
        id="tentang"
        className="bg-slate-50 py-24"
      >

        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-2 lg:items-center">

          {/* Visual */}
          <div className="relative">

            <div className="absolute -left-5 -top-5 h-28 w-28 rounded-3xl bg-emerald-100" />

            <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 shadow-2xl sm:p-10">

              <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-emerald-600/20 blur-3xl" />

              <div className="relative">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                  <Home size={28} />
                </div>

                <p className="mt-10 text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
                  Profil Lingkungan
                </p>

                <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
                  FIRDAUS
                  <br />
                  RT 01
                </h2>

                <div className="my-8 h-px bg-white/10" />

                <div className="space-y-4 text-sm text-slate-300">

                  <div className="flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-400"
                    />

                    <span>
                      Lingkungan RT 01 yang mengutamakan
                      kebersamaan, keamanan, dan pelayanan warga.
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-400"
                    />

                    <span>
                      Wadah informasi dan koordinasi untuk seluruh
                      warga RT 01.
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Content */}
          <div>

            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600">
              Tentang Firdaus RT 01
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Membangun lingkungan yang
              <span className="text-emerald-600">
                {" "}terhubung dan peduli.
              </span>
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Firdaus RT 01 merupakan wadah pelayanan dan informasi
              warga yang dirancang untuk mempermudah komunikasi,
              administrasi, serta berbagai kegiatan di lingkungan RT.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Melalui sistem digital ini, warga dapat memperoleh
              informasi, mengajukan layanan, dan mengikuti kegiatan
              lingkungan secara lebih mudah dan terorganisir.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <CheckCircle2
                  size={22}
                  className="text-emerald-600"
                />

                <h3 className="mt-4 font-bold text-slate-900">
                  Pelayanan Mudah
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Informasi dan layanan dapat diakses melalui satu
                  platform.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <CheckCircle2
                  size={22}
                  className="text-emerald-600"
                />

                <h3 className="mt-4 font-bold text-slate-900">
                  Lingkungan Bersama
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Mendukung koordinasi kegiatan dan kebersamaan warga.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          SERVICES
      ====================================================== */}
      <section
        id="layanan"
        className="bg-white py-24"
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-6">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600">
              Layanan RT 01
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Semua kebutuhan warga
              <span className="text-emerald-600">
                {" "}dalam satu tempat
              </span>
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Berbagai layanan administrasi, lingkungan, keamanan,
              dan kemasyarakatan yang dapat dikembangkan secara
              digital.
            </p>

          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

  {services.map((service) => {
    const Icon = service.icon;

    return (
      <Link
        key={service.title}
        to={service.path}
        className="group block rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/5"
      >

        <div className="flex items-start justify-between">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
            <Icon size={21} />
          </div>

          <ChevronRight
            size={19}
            className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-500"
          />

        </div>

        <h3 className="mt-6 text-lg font-extrabold text-slate-900">
          {service.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          {service.description}
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-600 transition group-hover:gap-3">
          Lihat layanan
          <ArrowRight size={16} />
        </div>

      </Link>
    );
  })}

</div>
        </div>

      </section>

      {/* =====================================================
          INFORMATION
      ====================================================== */}
      <section
        id="informasi"
        className="bg-slate-50 py-24"
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-6">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600">
                Informasi Terbaru
              </p>

              <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                Kabar & kegiatan warga
              </h2>

            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600"
            >
              Lihat semua
              <ArrowRight size={16} />
            </a>

          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">

            {announcements.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5"
              >

                <div className="h-2 bg-emerald-600" />

                <div className="p-7">

                  <div className="flex items-center justify-between gap-3">

                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                      {item.category}
                    </span>

                    <span className="text-xs font-medium text-slate-400">
                      {item.date}
                    </span>

                  </div>

                  <h3 className="mt-6 text-xl font-extrabold leading-snug text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {item.description}
                  </p>

                  <a
                    href="#"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-600 transition group-hover:gap-3"
                  >
                    Baca selengkapnya
                    <ArrowRight size={15} />
                  </a>

                </div>

              </article>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="bg-white py-24">

        <div className="mx-auto max-w-7xl px-5 sm:px-6">

          <div className="relative overflow-hidden rounded-[2rem] bg-emerald-700 px-7 py-14 text-center shadow-2xl shadow-emerald-900/10 sm:px-12 sm:py-16">

            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20">
                <Sparkles size={24} />
              </div>

              <h2 className="mt-7 text-3xl font-black text-white sm:text-4xl">
                Butuh layanan administrasi RT?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-7 text-emerald-50">
                Ajukan layanan dan dapatkan informasi pelayanan
                warga dengan lebih mudah melalui Firdaus RT 01.
              </p>

              <button
                type="button"
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-bold text-emerald-700 shadow-xl transition hover:-translate-y-1 hover:bg-emerald-50"
              >
                Mulai Sekarang
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="border-t border-slate-200 bg-slate-950 text-white">

        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">

          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">

            {/* Brand */}
            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600">
                  <Home size={20} />
                </div>

                <div>
                  <p className="font-extrabold tracking-wide">
                    FIRDAUS RT 01
                  </p>

                  <p className="text-xs text-slate-400">
                    Pelayanan Warga
                  </p>
                </div>

              </div>

              <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                Sistem informasi dan pelayanan warga yang membantu
                membangun lingkungan RT 01 yang lebih terhubung,
                tertib, dan peduli.
              </p>

            </div>

            {/* Navigation */}
            <div>

              <h3 className="font-bold">
                Navigasi
              </h3>

              <div className="mt-5 space-y-3 text-sm text-slate-400">

                <Link
                  to="/"
                  className="block transition hover:text-emerald-400"
                >
                  Beranda
                </Link>

                <Link
                  to="/layanan"
                  className="block transition hover:text-emerald-400"
                >
                  Layanan
                </Link>

                <Link
                  to="/informasi"
                  className="block transition hover:text-emerald-400"
                >
                  Informasi
                </Link>

                <a
                  href="#tentang"
                  className="block transition hover:text-emerald-400"
                >
                  Tentang RT
                </a>

              </div>

            </div>

            {/* Contact */}
            <div>

              <h3 className="font-bold">
                Kontak RT 01
              </h3>

              <div className="mt-5 space-y-4 text-sm text-slate-400">

                <div className="flex gap-3">
                  <MapPin
                    size={18}
                    className="shrink-0 text-emerald-400"
                  />

                  <span>
                    Lingkungan RT 01
                  </span>
                </div>

                <div className="flex gap-3">
                  <Users
                    size={18}
                    className="shrink-0 text-emerald-400"
                  />

                  <span>
                    Pelayanan Warga RT 01
                  </span>
                </div>

              </div>

            </div>

          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">

            <p>
              ©2026GanniArthaApriliana Firdaus RT 01. All rights reserved.
            </p>

            <p>
              Sistem Informasi & Pelayanan Warga
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default App;