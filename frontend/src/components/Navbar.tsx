import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

import {
  ChevronDown,
  FileText,
  Users,
  MapPin,
  ShieldCheck,
  Trash2,
  HeartHandshake,
  CalendarDays,
  Menu,
  X,
  LogIn,
  Home,
  Megaphone,
} from "lucide-react";

const serviceCategories = [
  {
    title: "Administrasi & Kependudukan",
    icon: FileText,
    items: [
      {
        title: "Surat Pengantar",
        description: "KTP, KK, SKCK, nikah, SKTM, dan lainnya",
        icon: FileText,
        path: "/layanan/surat-pengantar",
      },
      {
        title: "Surat Keterangan",
        description: "Pengajuan surat keterangan warga",
        icon: FileText,
        path: "/layanan/surat-keterangan",
      },
      {
        title: "Pendataan Warga",
        description: "Data warga, pindah, lahir, dan meninggal",
        icon: Users,
        path: "/layanan/pendataan-warga",
      },
      {
        title: "Surat Domisili",
        description: "Keterangan tinggal atau usaha",
        icon: MapPin,
        path: "/layanan/domisili",
      },
    ],
  },

  {
    title: "Keamanan & Lingkungan",
    icon: ShieldCheck,
    items: [
      {
        title: "Siskamling",
        description: "Jadwal dan kegiatan ronda warga",
        icon: ShieldCheck,
        path: "/layanan/siskamling",
      },
      {
        title: "Kerja Bakti",
        description: "Kegiatan kebersihan lingkungan",
        icon: HeartHandshake,
        path: "/layanan/kerja-bakti",
      },
      {
        title: "Pengelolaan Sampah",
        description: "Jadwal dan informasi sampah",
        icon: Trash2,
        path: "/layanan/sampah",
      },
    ],
  },

  {
    title: "Sosial & Kemasyarakatan",
    icon: HeartHandshake,
    items: [
      {
        title: "Mediasi Warga",
        description: "Membantu penyelesaian permasalahan warga",
        icon: HeartHandshake,
        path: "/layanan/mediasi-warga",
      },
      {
        title: "Bantuan Sosial",
        description: "Informasi dan penyaluran bantuan",
        icon: HeartHandshake,
        path: "/layanan/bantuan-sosial",
      },
      {
        title: "Kegiatan Warga",
        description: "Arisan, pengajian, dan kegiatan sosial",
        icon: CalendarDays,
        path: "/layanan/kegiatan-warga",
      },
    ],
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        <div className="flex h-[76px] items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 transition group-hover:scale-105">
              <Home size={21} strokeWidth={2.5} />
            </div>

            <div>
              <div className="text-[15px] font-extrabold tracking-wide text-slate-900">
                FIRDAUS <span className="text-emerald-600">RT 01</span>
              </div>

              <div className="text-[11px] font-medium text-slate-500">
                Pelayanan Warga
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">

            <Link
              to="/"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              Beranda
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsServicesOpen((value) => !value)}
                className="flex items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
              >
                Layanan
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isServicesOpen && (
                <div className="absolute left-1/2 top-full w-[760px] -translate-x-1/2 pt-3">
                  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10">

                    <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                          Layanan RT 01
                        </p>

                        <h3 className="mt-1 text-lg font-bold text-slate-900">
                          Pelayanan untuk warga
                        </h3>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <FileText size={19} />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-5">

                      {serviceCategories.map((category) => {
                        const CategoryIcon = category.icon;

                        return (
                          <div key={category.title}>
                            <div className="mb-3 flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                <CategoryIcon size={16} />
                              </div>

                              <h4 className="text-xs font-bold leading-tight text-slate-800">
                                {category.title}
                              </h4>
                            </div>

                            <div className="space-y-1">
                              {category.items.map((item) => {
                                const ItemIcon = item.icon;

                                return (
                                  <Link
                                    to={item.path}
                                    key={item.title}
                                    onClick={() => setIsServicesOpen(false)}
                                    className="group flex gap-3 rounded-xl p-2.5 transition hover:bg-emerald-50"
                                  >
                                    <ItemIcon
                                      size={16}
                                      className="mt-0.5 shrink-0 text-slate-400 transition group-hover:text-emerald-600"
                                    />

                                    <div>
                                      <p className="text-xs font-semibold text-slate-700 group-hover:text-emerald-700">
                                        {item.title}
                                      </p>

                                      <p className="mt-0.5 text-[10px] leading-relaxed text-slate-400">
                                        {item.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}

                    </div>
                  </div>
                </div>
              )}
            </div>
 
            <a
              href="#informasi"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              Informasi
            </a>

            <a
              href="#tentang"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              Tentang RT
            </a>

          </div>

          {/* Desktop Auth */}
          {user ? (
            <div className="hidden items-center gap-3 md:flex">
              <a
                href={user.role === "admin" ? "/admin" : "/dashboard"}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-emerald-600 text-sm font-black text-white">
                  {user.photo_url ? (
                    <img
                      src={user.photo_url}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  )}
                </div>

                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900">
                    {user.name}
                  </p>

                  <p className="text-xs capitalize text-slate-500">
                    {user.role === "admin"
                      ? "Administrator"
                      : "Warga RT 01"}
                  </p>
                </div>
              </a>

              <button
                type="button"
                onClick={async () => {
                  await logout();
                  window.location.href = "/";
                }}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 md:flex"
            >
              <LogIn size={17} />
              Login
            </Link>
          )}

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-emerald-200 hover:text-emerald-600 md:hidden"
            aria-label="Buka menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-slate-100 py-5 md:hidden">

            <div className="space-y-1">

              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <Home size={18} />
                Beranda
              </Link>

              <button
                type="button"
                onClick={() => setIsServicesOpen((value) => !value)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <span className="flex items-center gap-3">
                  <FileText size={18} />
                  Layanan
                </span>

                <ChevronDown
                  size={17}
                  className={`transition-transform ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isServicesOpen && (
                <div className="ml-4 space-y-1 border-l-2 border-emerald-100 pl-3">

                  {serviceCategories.flatMap((category) =>
                    category.items.map((item) => {
                      const ItemIcon = item.icon;

                      return (
                        <Link
                          key={item.title}
                          to={item.path}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsServicesOpen(false);
                          }}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          <ItemIcon size={16} />
                          {item.title}
                        </Link>
                      );
                    })
                  )}

                </div>
              )}

              <Link
                to="#informasi"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <Megaphone size={18} />
                Informasi
              </Link>

              <Link
                to="#tentang"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <Users size={18} />
                Tentang RT
              </Link>

              {user ? (
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                <Link
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-emerald-200 hover:bg-emerald-50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-600 text-sm font-black text-white">
                    {user.photo_url ? (
                      <img
                        src={user.photo_url}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      user.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {user.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {user.role === "admin"
                        ? "Administrator"
                        : "Warga RT 01"}
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={async () => {
                    setIsMenuOpen(false);
                    await logout();
                    window.location.href = "/";
                  }}
                  className="flex w-full items-center justify-center rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-700"
              >
                <LogIn size={17} />
                Login
              </Link>
            )}
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}