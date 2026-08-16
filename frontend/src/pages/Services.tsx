import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  FileText,
  HandHeart,
  LoaderCircle,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { getServices, type Service } from "../api/api";

const categoryConfig = {
  administrasi: {
    label: "Administrasi & Kependudukan",
    description:
      "Layanan administrasi dan kebutuhan dokumen kependudukan warga RT 01.",
    icon: FileText,
  },

  keamanan_lingkungan: {
    label: "Keamanan & Lingkungan",
    description:
      "Layanan untuk menjaga keamanan, kebersihan, dan kenyamanan lingkungan.",
    icon: ShieldCheck,
  },

  sosial_kemasyarakatan: {
    label: "Sosial & Kemasyarakatan",
    description:
      "Layanan dan kegiatan sosial untuk mempererat hubungan antarwarga.",
    icon: HandHeart,
  },
} as const;

type CategoryKey = keyof typeof categoryConfig;

export default function Services() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<CategoryKey>("administrasi");

  async function loadServices() {
  try {
    setError("");

    const data = await getServices();

    setServices(data);
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Terjadi kesalahan saat mengambil data layanan.");
    }
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  let cancelled = false;

  async function fetchServices() {
    try {
      setError("");

      const data = await getServices();

      if (!cancelled) {
        setServices(data);
        setLoading(false);
      }
    } catch (err) {
      if (!cancelled) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan saat mengambil data layanan.");
        }

        setLoading(false);
      }
    }
  }

  fetchServices();

  return () => {
    cancelled = true;
  };
}, []);

  const filteredServices = useMemo(() => {
    return services.filter(
      (service) => service.kategori === activeCategory,
    );
  }, [services, activeCategory]);

  const ActiveIcon = categoryConfig[activeCategory].icon;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-emerald-50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
              <Sparkles size={16} />
              Layanan Digital RT 01
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Semua layanan warga,
              <span className="block text-emerald-600">
                lebih mudah & terorganisir.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
              Temukan berbagai layanan administrasi, keamanan, lingkungan,
              serta kegiatan sosial kemasyarakatan Firdaus RT 01 dalam satu
              tempat.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

        {/* STATUS */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
              Daftar Layanan
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-950">
              Pilih kebutuhan Anda
            </h2>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
            <Users size={17} className="text-emerald-600" />

            {services.length} layanan tersedia
          </div>
        </div>

        {/* CATEGORY */}
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {(Object.keys(categoryConfig) as CategoryKey[]).map(
            (category) => {
              const config = categoryConfig[category];
              const Icon = config.icon;
              const active = activeCategory === category;

              const count = services.filter(
                (service) => service.kategori === category,
              ).length;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`group rounded-2xl border p-5 text-left transition duration-200 ${
                    active
                      ? "border-emerald-500 bg-emerald-600 text-white shadow-xl shadow-emerald-600/20"
                      : "border-slate-200 bg-white text-slate-800 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        active
                          ? "bg-white/15 text-white"
                          : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      <Icon size={23} />
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        active
                          ? "bg-white/15 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {count} layanan
                    </span>
                  </div>

                  <h3
                    className={`mt-5 text-lg font-black ${
                      active ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {config.label}
                  </h3>

                  <p
                    className={`mt-2 text-sm leading-6 ${
                      active ? "text-emerald-50" : "text-slate-500"
                    }`}
                  >
                    {config.description}
                  </p>
                </button>
              );
            },
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white">
            <LoaderCircle
              size={34}
              className="animate-spin text-emerald-600"
            />

            <p className="mt-4 font-bold text-slate-800">
              Mengambil data layanan...
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Menghubungkan website dengan server Firdaus RT 01.
            </p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <AlertCircle size={22} />
              </div>

              <div className="flex-1">
                <h3 className="font-black text-red-800">
                  Gagal mengambil layanan
                </h3>

                <p className="mt-1 text-sm leading-6 text-red-700">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={loadServices}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
                >
                  <RefreshCw size={16} />
                  Coba Lagi
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SERVICES */}
        {!loading && !error && (
          <section>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <ActiveIcon size={23} />
              </div>

              <div>
                <p className="text-sm font-semibold text-emerald-600">
                  Kategori layanan
                </p>

                <h2 className="text-2xl font-black text-slate-950">
                  {categoryConfig[activeCategory].label}
                </h2>
              </div>
            </div>

            {filteredServices.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
                <Wrench
                  size={34}
                  className="mx-auto text-slate-400"
                />

                <h3 className="mt-4 font-black text-slate-800">
                  Belum ada layanan
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Belum ada layanan aktif pada kategori ini.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map((service) => (
                  <article
                    key={service.id}
                    onClick={() =>
                      navigate(`/layanan/${service.slug}`)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" ||
                        event.key === " "
                      ) {
                        navigate(`/layanan/${service.slug}`);
                      }
                    }}
                    className="group flex cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                        {activeCategory === "administrasi" ? (
                          <FileText size={22} />
                        ) : activeCategory ===
                          "keamanan_lingkungan" ? (
                          <ShieldCheck size={22} />
                        ) : (
                          <HandHeart size={22} />
                        )}
                      </div>

                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                        Aktif
                      </span>
                    </div>

                    <h3 className="mt-6 text-lg font-black text-slate-900">
                      {service.nama_layanan}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">
                      {service.deskripsi ||
                        "Layanan warga Firdaus RT 01."}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/layanan/${service.slug}`);
                      }}
                      className="mt-6 inline-flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition group-hover:bg-emerald-50 group-hover:text-emerald-700"
                    >
                      Ajukan Layanan
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-emerald-600 px-6 py-10 shadow-xl shadow-emerald-600/20 sm:px-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-100">
                <MapPin size={17} />
                Firdaus RT 01
              </div>

              <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                Butuh layanan warga?
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50">
                Scroll ke atas untuk mengajukan layanan dan memantau status pengajuan
                Anda secara online.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}