import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CheckCircle2,
  Clock3,
  FileText,
  Loader2,
  Search,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import Navbar from "../components/Navbar";

import {
  getAllApplications,
  updateApplicationStatus,
  type Application,
  type ApplicationStatus,
} from "../api/api";

export default function AdminApplications() {
  const [applications, setApplications] =
    useState<Application[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<"semua" | ApplicationStatus>(
      "semua",
    );

  const [updatingId, setUpdatingId] =
    useState<number | null>(null);

  // =========================================================
  // LOAD APPLICATIONS
  // =========================================================

  async function loadApplications() {
  try {
    const data =
      await getAllApplications();

    setApplications(data);
    setError("");
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Gagal mengambil data pengajuan.",
    );
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  let mounted = true;

  async function fetchApplications() {
    try {
      const data =
        await getAllApplications();

      if (mounted) {
        setApplications(data);
        setError("");
        setLoading(false);
      }
    } catch (err) {
      if (mounted) {
        setError(
          err instanceof Error
            ? err.message
            : "Gagal mengambil data pengajuan.",
        );

        setLoading(false);
      }
    }
  }

  fetchApplications();

  return () => {
    mounted = false;
  };
}, []);

  // =========================================================
  // UPDATE STATUS
  // =========================================================

  async function handleUpdateStatus(
    application: Application,
    status: ApplicationStatus,
  ) {
    let catatan: string | undefined;

    if (status === "ditolak") {
      const input = window.prompt(
        "Masukkan alasan penolakan:",
        application.catatan || "",
      );

      if (input === null) {
        return;
      }

      catatan = input.trim();

      if (!catatan) {
        window.alert(
          "Alasan penolakan wajib diisi.",
        );

        return;
      }
    }

    if (
      status === "disetujui" &&
      !window.confirm(
        `Setujui pengajuan ${application.nomor_pengajuan}?`,
      )
    ) {
      return;
    }

    if (
      status === "diproses" &&
      !window.confirm(
        `Proses pengajuan ${application.nomor_pengajuan}?`,
      )
    ) {
      return;
    }

    if (
      status === "selesai" &&
      !window.confirm(
        `Tandai pengajuan ${application.nomor_pengajuan} sebagai selesai?`,
      )
    ) {
      return;
    }

    try {
      setUpdatingId(application.id);

      const updated =
        await updateApplicationStatus(
          application.id,
          status,
          catatan,
        );

      setApplications((current) =>
        current.map((item) =>
          item.id === updated.id
            ? updated
            : item,
        ),
      );
    } catch (err) {
      window.alert(
        err instanceof Error
          ? err.message
          : "Gagal memperbarui status pengajuan.",
      );
    } finally {
      setUpdatingId(null);
    }
  }

  // =========================================================
  // FILTER
  // =========================================================

  const filteredApplications =
    useMemo(() => {
      const keyword =
        search.trim().toLowerCase();

      return applications.filter(
        (application) => {
          const matchesSearch =
            !keyword ||
            application.nomor_pengajuan
              .toLowerCase()
              .includes(keyword) ||
            (
              application.user?.name || ""
            )
              .toLowerCase()
              .includes(keyword) ||
            (
              application.service
                ?.nama_layanan || ""
            )
              .toLowerCase()
              .includes(keyword) ||
            (
              application.user?.email || ""
            )
              .toLowerCase()
              .includes(keyword);

          const matchesStatus =
            statusFilter === "semua" ||
            application.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        },
      );
    }, [
      applications,
      search,
      statusFilter,
    ]);

  // =========================================================
  // STATISTICS
  // =========================================================

  const total =
    applications.length;

  const menunggu =
    applications.filter(
      (item) =>
        item.status === "menunggu",
    ).length;

  const diproses =
    applications.filter(
      (item) =>
        item.status === "diproses",
    ).length;

  const selesai =
    applications.filter(
      (item) =>
        item.status === "selesai",
    ).length;

  // =========================================================
  // FORMAT DATE
  // =========================================================

  function formatDate(
    value: string | null,
  ) {
    if (!value) {
      return "-";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime(),
      )
    ) {
      return "-";
    }

    return date.toLocaleDateString(
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

  function statusLabel(
    status: ApplicationStatus,
  ) {
    switch (status) {
      case "menunggu":
        return "Menunggu";

      case "diproses":
        return "Diproses";

      case "disetujui":
        return "Disetujui";

      case "ditolak":
        return "Ditolak";

      case "selesai":
        return "Selesai";

      default:
        return status;
    }
  }

  // =========================================================
  // STATUS STYLE
  // =========================================================

  function statusClass(
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
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">

              <ShieldCheck size={18} />

              Admin Panel

            </div>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Pengajuan Warga
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Kelola dan proses pengajuan layanan
              warga RT 01.
            </p>

          </div>

          <button
            type="button"
            onClick={loadApplications}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2
                size={17}
                className="animate-spin"
              />
            ) : (
              <Clock3 size={17} />
            )}

            Refresh
          </button>

        </div>

        {/* ===================================================
            STATISTICS
        =================================================== */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Total Pengajuan
                </p>

                <p className="mt-2 text-3xl font-black text-slate-950">
                  {loading ? "..." : total}
                </p>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <FileText size={21} />
              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Menunggu
                </p>

                <p className="mt-2 text-3xl font-black text-slate-950">
                  {loading ? "..." : menunggu}
                </p>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Clock3 size={21} />
              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Diproses
                </p>

                <p className="mt-2 text-3xl font-black text-slate-950">
                  {loading ? "..." : diproses}
                </p>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Clock3 size={21} />
              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Selesai
                </p>

                <p className="mt-2 text-3xl font-black text-slate-950">
                  {loading ? "..." : selesai}
                </p>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <CheckCircle2 size={21} />
              </div>

            </div>

          </div>

        </div>

        {/* ===================================================
            FILTER
        =================================================== */}

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row">

            <div className="relative flex-1">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value,
                  )
                }
                placeholder="Cari nomor pengajuan, nama warga, layanan, atau email..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />

            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as
                    | "semua"
                    | ApplicationStatus,
                )
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            >
              <option value="semua">
                Semua Status
              </option>

              <option value="menunggu">
                Menunggu
              </option>

              <option value="diproses">
                Diproses
              </option>

              <option value="disetujui">
                Disetujui
              </option>

              <option value="ditolak">
                Ditolak
              </option>

              <option value="selesai">
                Selesai
              </option>
            </select>

          </div>

        </div>

        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">

            <div className="flex items-start gap-3">

              <XCircle
                size={21}
                className="mt-0.5 shrink-0 text-red-600"
              />

              <div>

                <p className="font-bold text-red-800">
                  Gagal mengambil pengajuan
                </p>

                <p className="mt-1 text-sm leading-6 text-red-700">
                  {error}
                </p>

              </div>

            </div>

          </div>
        )}

        {/* ===================================================
            LOADING
        =================================================== */}

        {loading && (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">

            <Loader2
              size={32}
              className="mx-auto animate-spin text-emerald-600"
            />

            <p className="mt-4 text-sm font-semibold text-slate-500">
              Memuat pengajuan warga...
            </p>

          </div>
        )}

        {/* ===================================================
            EMPTY
        =================================================== */}

        {!loading &&
          !error &&
          filteredApplications.length === 0 && (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                <FileText size={25} />
              </div>

              <h2 className="mt-4 text-lg font-black text-slate-900">
                Tidak Ada Pengajuan
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Tidak ada data pengajuan yang
                sesuai dengan pencarian atau
                filter yang dipilih.
              </p>

            </div>
          )}

        {/* ===================================================
            APPLICATION LIST
        =================================================== */}

        {!loading &&
          !error &&
          filteredApplications.length > 0 && (
            <div className="mt-6 space-y-4">

              {filteredApplications.map(
                (application) => {

                  const isUpdating =
                    updatingId ===
                    application.id;

                  return (
                    <div
                      key={application.id}
                      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                    >

                      <div className="flex flex-col gap-6">

                        {/* HEADER */}

                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                          <div className="flex items-start gap-4">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                              <FileText size={21} />
                            </div>

                            <div>

                              <div className="flex flex-wrap items-center gap-2">

                                <h2 className="text-lg font-black text-slate-950">
                                  { application.nomor_surat ||
                                    application.nomor_pengajuan
                                  }
                                </h2>

                                <span
                                  className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(
                                    application.status,
                                  )}`}
                                >
                                  {statusLabel(
                                    application.status,
                                  )}
                                </span>

                              </div>

                              <p className="mt-1 text-sm font-semibold text-emerald-600">
                                {
                                  application
                                    .service
                                    ?.nama_layanan ||
                                  "Layanan tidak diketahui"
                                }
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                Diajukan pada{" "}
                                {formatDate(
                                  application.created_at,
                                )}
                              </p>

                            </div>

                          </div>

                        </div>

                        {/* WARGA */}

                        <div className="grid gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">

                          <div>

                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Nama Warga
                            </p>

                            <p className="mt-1 font-bold text-slate-800">
                              {
                                application
                                  .user?.name ||
                                "-"
                              }
                            </p>

                          </div>

                          <div>

                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Email
                            </p>

                            <p className="mt-1 break-all font-semibold text-slate-700">
                              {
                                application
                                  .user?.email ||
                                "-"
                              }
                            </p>

                          </div>

                        </div>

                        {/* CATATAN */}

                        {application.catatan && (
                          <div className="rounded-2xl border border-slate-200 bg-white p-4">

                            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                              Catatan
                            </p>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {application.catatan}
                            </p>

                          </div>
                        )}

                        {/* ACTIONS */}

                        <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-5">

                          {application.status ===
                            "menunggu" && (
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() =>
                                handleUpdateStatus(
                                  application,
                                  "diproses",
                                )
                              }
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isUpdating ? (
                                <Loader2
                                  size={16}
                                  className="animate-spin"
                                />
                              ) : (
                                <Clock3
                                  size={16}
                                />
                              )}

                              Proses
                            </button>
                          )}

                          {(application.status ===
                            "menunggu" ||
                            application.status ===
                              "diproses") && (
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() =>
                                handleUpdateStatus(
                                  application,
                                  "disetujui",
                                )
                              }
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isUpdating ? (
                                <Loader2
                                  size={16}
                                  className="animate-spin"
                                />
                              ) : (
                                <CheckCircle2
                                  size={16}
                                />
                              )}

                              Setujui
                            </button>
                          )}

                          {(application.status ===
                            "menunggu" ||
                            application.status ===
                              "diproses") && (
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() =>
                                handleUpdateStatus(
                                  application,
                                  "ditolak",
                                )
                              }
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isUpdating ? (
                                <Loader2
                                  size={16}
                                  className="animate-spin"
                                />
                              ) : (
                                <XCircle
                                  size={16}
                                />
                              )}

                              Tolak
                            </button>
                          )}

                          {application.status ===
                            "disetujui" && (
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() =>
                                handleUpdateStatus(
                                  application,
                                  "selesai",
                                )
                              }
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isUpdating ? (
                                <Loader2
                                  size={16}
                                  className="animate-spin"
                                />
                              ) : (
                                <CheckCircle2
                                  size={16}
                                />
                              )}

                              Tandai Selesai
                            </button>
                          )}

                        </div>

                      </div>

                    </div>
                  );
                },
              )}

            </div>
          )}

      </main>

    </div>
  );
}