import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  UserRound,
  X,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

import {
  getMyApplications,
  type Application,
  type ApplicationStatus,
} from "../api/api";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const [applications, setApplications] =
    useState<Application[]>([]);

  const [applicationsLoading, setApplicationsLoading] =
    useState(true);

  const [applicationsError, setApplicationsError] =
    useState("");

  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error(
      "Dashboard harus digunakan di dalam AuthProvider.",
    );
  }

  const {
    user,
    loading,
    logout,
  } = auth;

  const navigate = useNavigate();

  // =========================================================
  // LOAD USER APPLICATIONS
  // =========================================================

  useEffect(() => {
    if (loading || !user) {
      return;
    }

    let mounted = true;

    async function loadApplications() {
      try {
        setApplicationsLoading(true);
        setApplicationsError("");

        const data =
          await getMyApplications();

        if (mounted) {
          setApplications(data);
        }
      } catch (error) {
        if (mounted) {
          setApplicationsError(
            error instanceof Error
              ? error.message
              : "Gagal mengambil data pengajuan.",
          );
        }
      } finally {
        if (mounted) {
          setApplicationsLoading(false);
        }
      }
    }

    loadApplications();

    return () => {
      mounted = false;
    };
  }, [loading, user]);

  // =========================================================
  // LOGOUT
  // =========================================================

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(
        "Logout gagal:",
        error,
      );
    }
  }
  
  function handleOpenPdf(
    application: Application,
      ) {
        if (application.status !== "selesai") {
          return;
        }

        const apiUrl =
          import.meta.env.VITE_API_URL ||
          (import.meta.env.DEV
            ? "http://localhost:5000"
            : "");

        const pdfUrl =
          `${apiUrl}/api/applications/${application.id}/pdf`;

        window.open(
          pdfUrl,
          "_blank",
          "noopener,noreferrer",
        );
      }
  // =========================================================
  // FORMAT DATE
  // =========================================================

  function formatDate(
    date: string | null,
  ) {
    if (!date) {
      return "-";
    }

    const parsedDate =
      new Date(date);

    if (Number.isNaN(
      parsedDate.getTime(),
    )) {
      return "-";
    }

    return parsedDate.toLocaleDateString(
      "id-ID",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      },
    );
  }

  // =========================================================
  // STATUS LABEL
  // =========================================================

  function getStatusLabel(
    status: ApplicationStatus,
  ) {
    switch (status) {
      case "menunggu":
        return "Menunggu Verifikasi";

      case "diproses":
        return "Sedang Diproses";

      case "disetujui":
        return "Disetujui";

      case "ditolak":
        return "Ditolak";

      case "selesai":
        return "Selesai";

      default:
        return "Tidak Diketahui";
    }
  }

  // =========================================================
  // STATUS STYLE
  // =========================================================

  function getStatusClass(
    status: ApplicationStatus,
  ) {
    switch (status) {
      case "menunggu":
        return "bg-amber-50 text-amber-700";

      case "diproses":
        return "bg-blue-50 text-blue-700";

      case "disetujui":
        return "bg-emerald-50 text-emerald-700";

      case "ditolak":
        return "bg-red-50 text-red-700";

      case "selesai":
        return "bg-purple-50 text-purple-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  }

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalApplications =
    applications.length;

  const waitingApplications =
    applications.filter(
      (application) =>
        application.status ===
        "menunggu",
    ).length;

  const approvedApplications =
    applications.filter(
      (application) =>
        application.status ===
        "disetujui",
    ).length;

  const completedApplications =
    applications.filter(
      (application) =>
        application.status ===
        "selesai",
    ).length;

  // =========================================================
  // LOADING AUTH
  // =========================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />

          <p className="mt-4 text-sm font-semibold text-slate-500">
            Memuat dashboard...
          </p>

        </div>
      </div>
    );
  }

  // =========================================================
  // BELUM LOGIN
  // =========================================================

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5">

        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <UserRound size={25} />
          </div>

          <h1 className="mt-5 text-2xl font-black text-slate-950">
            Anda Belum Login
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Silakan login terlebih dahulu
            untuk mengakses Dashboard Warga.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700"
          >
            Login
            <ArrowRight size={17} />
          </Link>

        </div>

      </div>
    );
  }

  // =========================================================
  // USER DATA
  // =========================================================

  const firstName =
    user.name.trim().split(" ")[0];

  const initials =
    user.name
      .trim()
      .split(/\s+/)
      .map(
        (word: string) =>
          word.charAt(0),
      )
      .slice(0, 2)
      .join("")
      .toUpperCase() || "WR";

  const roleLabel =
    user.role === "admin"
      ? "Administrator"
      : "Warga RT 01";

  // =========================================================
  // MAIN
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="mx-auto flex max-w-7xl">

        {/* =====================================================
            MOBILE OVERLAY
        ===================================================== */}

        {isSidebarOpen && (
          <button
            type="button"
            aria-label="Tutup sidebar"
            onClick={() =>
              setIsSidebarOpen(false)
            }
            className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          />
        )}

        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white pt-24 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:pt-24 ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >

          <div className="flex h-full flex-col px-5 py-6">

            {/* Mobile Close */}

            <div className="mb-5 flex items-center justify-between lg:hidden">

              <span className="font-black text-slate-900">
                Menu
              </span>

              <button
                type="button"
                onClick={() =>
                  setIsSidebarOpen(false)
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
                aria-label="Tutup menu"
              >
                <X size={20} />
              </button>

            </div>

            {/* User Mini Profile */}

            <div className="rounded-2xl bg-emerald-50 p-4">

              <div className="flex items-center gap-3">

                {user.photo_url ? (
                  <img
                    src={user.photo_url}
                    alt={user.name}
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-black text-white">
                    {initials}
                  </div>
                )}

                <div className="min-w-0">

                  <p className="truncate text-sm font-black text-slate-900">
                    {user.name}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {roleLabel}
                  </p>

                </div>

              </div>

            </div>

            {/* Navigation */}

            <nav className="mt-7 space-y-1">

              <Link
                to="/dashboard"
                onClick={() =>
                  setIsSidebarOpen(false)
                }
                className="flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>

              <Link
                to="/layanan"
                onClick={() =>
                  setIsSidebarOpen(false)
                }
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-emerald-600"
              >
                <FileText size={18} />
                Ajukan Layanan
              </Link>

              <a
                href="#pengajuan"
                onClick={() =>
                  setIsSidebarOpen(false)
                }
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-emerald-600"
              >
                <FileCheck2 size={18} />
                Pengajuan Saya
              </a>

              <a
                href="#notifikasi"
                onClick={() =>
                  setIsSidebarOpen(false)
                }
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-emerald-600"
              >
                <Bell size={18} />
                Notifikasi
              </a>

              <a
                href="#profil"
                onClick={() =>
                  setIsSidebarOpen(false)
                }
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-emerald-600"
              >
                <UserRound size={18} />
                Profil Saya
              </a>

            </nav>

            {/* Bottom */}

            <div className="mt-auto border-t border-slate-100 pt-5">

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
              >
                <LogOut size={18} />
                Keluar
              </button>

            </div>

          </div>

        </aside>

        {/* =====================================================
            MAIN
        ===================================================== */}

        <main className="min-w-0 flex-1">

          {/* Mobile Dashboard Header */}

          <div className="border-b border-slate-200 bg-white px-5 py-4 lg:hidden">

            <button
              type="button"
              onClick={() =>
                setIsSidebarOpen(true)
              }
              className="flex items-center gap-3 text-sm font-bold text-slate-800"
            >
              <Menu size={21} />
              Dashboard Warga
            </button>

          </div>

          <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

            {/* =================================================
                WELCOME
            ================================================= */}

            <section>

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-sm font-bold text-emerald-600">
                    Dashboard Warga
                  </p>

                  <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                    Halo, {firstName} 👋
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                    Kelola pengajuan dan layanan RT
                    01 dari satu tempat.
                  </p>

                </div>

                <Link
                  to="/layanan"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                >
                  <Plus size={18} />
                  Ajukan Layanan
                </Link>

              </div>

            </section>

            {/* =================================================
                STATISTICS
            ================================================= */}

            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {/* Total */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-slate-500">
                      Total Pengajuan
                    </p>

                    <p className="mt-2 text-3xl font-black text-slate-950">
                      {applicationsLoading
                        ? "..."
                        : totalApplications}
                    </p>

                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FileText size={21} />
                  </div>

                </div>

              </div>

              {/* Waiting */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-slate-500">
                      Menunggu
                    </p>

                    <p className="mt-2 text-3xl font-black text-slate-950">
                      {applicationsLoading
                        ? "..."
                        : waitingApplications}
                    </p>

                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Clock3 size={21} />
                  </div>

                </div>

              </div>

              {/* Approved */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-slate-500">
                      Disetujui
                    </p>

                    <p className="mt-2 text-3xl font-black text-slate-950">
                      {applicationsLoading
                        ? "..."
                        : approvedApplications}
                    </p>

                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={21} />
                  </div>

                </div>

              </div>

              {/* Completed */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-slate-500">
                      Selesai
                    </p>

                    <p className="mt-2 text-3xl font-black text-slate-950">
                      {applicationsLoading
                        ? "..."
                        : completedApplications}
                    </p>

                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <FileCheck2 size={21} />
                  </div>

                </div>

              </div>

            </section>

            {/* =================================================
                CONTENT GRID
            ================================================= */}

            <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_340px]">

              {/* =================================================
                  SUBMISSIONS
              ================================================= */}

              <div
                id="pengajuan"
                className="rounded-3xl border border-slate-200 bg-white shadow-sm"
              >

                <div className="flex items-center justify-between border-b border-slate-100 p-6">

                  <div>

                    <h2 className="text-lg font-black text-slate-950">
                      Pengajuan Terbaru
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Riwayat layanan yang pernah kamu
                      ajukan.
                    </p>

                  </div>

                  <a
                    href="#pengajuan"
                    className="hidden text-sm font-bold text-emerald-600 hover:text-emerald-700 sm:block"
                  >
                    Lihat Semua
                  </a>

                </div>

                {/* APPLICATION ERROR */}

                {applicationsError && (
                  <div className="m-6 rounded-2xl border border-red-200 bg-red-50 p-4">

                    <p className="text-sm font-bold text-red-700">
                      Gagal memuat pengajuan
                    </p>

                    <p className="mt-1 text-sm leading-6 text-red-600">
                      {applicationsError}
                    </p>

                  </div>
                )}

                {/* APPLICATION LOADING */}

                {applicationsLoading && (
                  <div className="flex items-center justify-center p-10">

                    <div className="text-center">

                      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />

                      <p className="mt-3 text-sm font-semibold text-slate-500">
                        Memuat pengajuan...
                      </p>

                    </div>

                  </div>
                )}

                {/* EMPTY */}

                {!applicationsLoading &&
                  !applicationsError &&
                  applications.length === 0 && (
                    <div className="p-10 text-center">

                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                        <FileText size={25} />
                      </div>

                      <h3 className="mt-4 font-black text-slate-900">
                        Belum Ada Pengajuan
                      </h3>

                      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                        Kamu belum memiliki pengajuan
                        layanan. Silakan pilih layanan
                        yang tersedia untuk membuat
                        pengajuan pertama.
                      </p>

                      <Link
                        to="/layanan"
                        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                      >
                        Ajukan Layanan
                        <ArrowRight size={16} />
                      </Link>

                    </div>
                  )}

                {/* APPLICATION LIST */}

                {!applicationsLoading &&
                  !applicationsError &&
                  applications.length > 0 && (
                    <div className="divide-y divide-slate-100">

                      {applications.map(
                        (application) => (
                          <div
                                key={application.id}
                                onClick={() => {
                                  if (application.status === "selesai") {
                                    handleOpenPdf(application);
                                  }
                                }}
                                role={
                                  application.status === "selesai"
                                    ? "button"
                                    : undefined
                                }
                                tabIndex={
                                  application.status === "selesai"
                                    ? 0
                                    : undefined
                                }
                                onKeyDown={(event) => {
                                  if (
                                    application.status === "selesai" &&
                                    (event.key === "Enter" ||
                                      event.key === " ")
                                  ) {
                                    handleOpenPdf(application);
                                  }
                                }}
                                className={`group p-6 transition ${
                                  application.status === "selesai"
                                    ? "cursor-pointer hover:bg-emerald-50/50"
                                    : "hover:bg-slate-50"
                                }`}
                              >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                              <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                  <FileText size={19} />
                                </div>

                                <div className="min-w-0">

                                  <h3 className="font-bold text-slate-900">
                                    {application
                                      .service
                                      ?.nama_layanan ||
                                      "Layanan"}
                                  </h3>

                                  <p className="mt-1 text-xs text-slate-400">
                                    {
                                      application.nomor_surat ||
                                      application.nomor_pengajuan
                                    }{" "}
                                    •{" "}
                                    {formatDate(
                                      application.created_at,
                                    )}
                                  </p>

                                </div>

                              </div>

                              <div className="flex items-center justify-between gap-4 sm:justify-end">

                                <span
                                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${getStatusClass(
                                    application.status,
                                  )}`}
                                >
                                  {getStatusLabel(
                                    application.status,
                                  )}
                                </span>

                                <button
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();

                                    if (application.status === "selesai") {
                                      handleOpenPdf(application);
                                    }
                                  }}
                                  disabled={application.status !== "selesai"}
                                  className={`transition ${
                                    application.status === "selesai"
                                      ? "text-emerald-500 hover:text-emerald-700"
                                      : "cursor-default text-slate-300"
                                  }`}
                                  aria-label={
                                    application.status === "selesai"
                                      ? `Buka PDF ${
                                          application.service?.nama_layanan ||
                                          "surat"
                                        }`
                                      : `Pengajuan ${application.status}`
                                  }
                                >
                                  <ArrowRight
                                    size={18}
                                    className={
                                      application.status === "selesai"
                                        ? "transition group-hover:translate-x-1"
                                        : ""
                                    }
                                  />
                                </button>

                              </div>

                            </div>

                          </div>
                        ),
                      )}

                    </div>
                  )}

              </div>

              {/* =================================================
                  PROFILE CARD
              ================================================= */}

              <div
                id="profil"
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >

                <div className="flex items-center justify-between">

                  <h2 className="font-black text-slate-950">
                    Profil Saya
                  </h2>

                  <button
                    type="button"
                    className="text-sm font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    Edit
                  </button>

                </div>

                <div className="mt-6 flex items-center gap-4">

                  {user.photo_url ? (
                    <img
                      src={user.photo_url}
                      alt={user.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-lg font-black text-white">
                      {initials}
                    </div>
                  )}

                  <div>

                    <h3 className="font-black text-slate-900">
                      {user.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {roleLabel}
                    </p>

                  </div>

                </div>

                <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">

                  <div>

                    <p className="text-xs font-semibold text-slate-400">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm font-semibold text-slate-700">
                      {user.email}
                    </p>

                  </div>

                  <div>

                    <p className="text-xs font-semibold text-slate-400">
                      Status Warga
                    </p>

                    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">

                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                      Warga Terdaftar

                    </div>

                  </div>

                </div>

              </div>

            </section>

            {/* =================================================
                QUICK ACTION
            ================================================= */}

            <section
              id="notifikasi"
              className="mt-6 rounded-3xl bg-emerald-600 p-6 text-white shadow-xl shadow-emerald-600/10 sm:p-8"
            >

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-sm font-bold text-emerald-100">
                    Butuh layanan RT?
                  </p>

                  <h2 className="mt-1 text-xl font-black">
                    Ajukan kebutuhan administrasi
                    kamu sekarang.
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-100">
                    Pilih layanan yang tersedia dan
                    lengkapi data pengajuan melalui
                    website Firdaus RT 01.
                  </p>

                </div>

                <Link
                  to="/layanan"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-emerald-700 transition hover:bg-emerald-50"
                >
                  Lihat Layanan
                  <ArrowRight size={17} />
                </Link>

              </div>

            </section>

          </div>

        </main>

      </div>

    </div>
  );
}