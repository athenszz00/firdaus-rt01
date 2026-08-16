import { useEffect, useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Edit3,
  LoaderCircle,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
  XCircle,
} from "lucide-react";

import Navbar from "../components/Navbar";
import {
  createService,
  deleteService,
  getServices,
  toggleService,
  updateService,
  type Service,
  type ServiceInput,
} from "../api/api";

const emptyForm: ServiceInput = {
  kategori: "administrasi",
  nama_layanan: "",
  slug: "",
  deskripsi: "",
};

const categoryLabels = {
  administrasi: "Administrasi & Kependudukan",
  keamanan_lingkungan: "Keamanan & Lingkungan",
  sosial_kemasyarakatan: "Sosial & Kemasyarakatan",
};

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<ServiceInput>(emptyForm);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("semua");

  // =========================================================
  // LOAD SERVICES
  // =========================================================

  async function loadServices() {
    try {
      setLoading(true);
      setError("");

      const data = await getServices();

      setServices(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal mengambil data layanan.",
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    let cancelled = false;

    async function fetchServices() {
      try {
        const data = await getServices();

        if (!cancelled) {
          setServices(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Gagal mengambil data layanan.",
          );

          setLoading(false);
        }
      }
    }

    fetchServices();

    return () => {
      cancelled = true;
    };
  }, []);

  // =========================================================
  // OPEN CREATE FORM
  // =========================================================

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setIsFormOpen(true);
  }

  // =========================================================
  // OPEN EDIT FORM
  // =========================================================

  function openEditForm(service: Service) {
    setEditingId(service.id);

    setForm({
      kategori: service.kategori,
      nama_layanan: service.nama_layanan,
      slug: service.slug,
      deskripsi: service.deskripsi ?? "",
    });

    setError("");
    setSuccess("");
    setIsFormOpen(true);
  }

  // =========================================================
  // CLOSE FORM
  // =========================================================

  function closeForm() {
    setIsFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  // =========================================================
  // NAME CHANGE
  // =========================================================

  function handleNameChange(value: string) {
    setForm((current) => ({
      ...current,
      nama_layanan: value,

      // Slug otomatis hanya ketika sedang membuat layanan baru
      slug:
        editingId === null
          ? generateSlug(value)
          : current.slug,
    }));
  }

  // =========================================================
  // SUBMIT FORM
  // =========================================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.nama_layanan.trim()) {
      setError("Nama layanan wajib diisi.");
      return;
    }

    if (!form.slug.trim()) {
      setError("Slug layanan wajib diisi.");
      return;
    }

    if (!form.deskripsi.trim()) {
      setError("Deskripsi layanan wajib diisi.");
      return;
    }

    try {
      setSaving(true);

      if (editingId === null) {
        await createService(form);

        setSuccess(
          "Layanan berhasil ditambahkan.",
        );
      } else {
        await updateService(editingId, form);

        setSuccess(
          "Layanan berhasil diperbarui.",
        );
      }

      closeForm();

      await loadServices();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal menyimpan layanan.",
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================================================
  // TOGGLE STATUS
  // =========================================================

  async function handleToggle(service: Service) {
    const action = service.aktif
      ? "menonaktifkan"
      : "mengaktifkan";

    const confirmed = window.confirm(
      `Yakin ingin ${action} "${service.nama_layanan}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await toggleService(service.id);

      setSuccess(
        service.aktif
          ? "Layanan berhasil dinonaktifkan."
          : "Layanan berhasil diaktifkan.",
      );

      await loadServices();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal mengubah status layanan.",
      );
    }
  }

  // =========================================================
  // DELETE
  // =========================================================

  async function handleDelete(service: Service) {
    const confirmed = window.confirm(
      `Yakin ingin menghapus "${service.nama_layanan}"?\n\nData yang sudah dihapus tidak dapat dikembalikan.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteService(service.id);

      setSuccess(
        "Layanan berhasil dihapus.",
      );

      await loadServices();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal menghapus layanan.",
      );
    }
  }

  // =========================================================
  // FILTER SERVICES
  // =========================================================

  const filteredServices = services.filter(
    (service) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        service.nama_layanan
          .toLowerCase()
          .includes(search) ||
        service.slug
          .toLowerCase()
          .includes(search);

      const matchesCategory =
        categoryFilter === "semua" ||
        service.kategori === categoryFilter;

      return matchesSearch && matchesCategory;
    },
  );

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalServices = services.length;

  const activeServices = services.filter(
    (service) => service.aktif,
  ).length;

  const inactiveServices = services.filter(
    (service) => !service.aktif,
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
              <CheckCircle2 size={14} />
              Admin Panel
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Kelola Layanan
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Kelola seluruh layanan Firdaus RT 01.
              Admin dapat menambah, mengubah, mengaktifkan,
              menonaktifkan, dan menghapus layanan.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            <Plus size={18} />
            Tambah Layanan
          </button>
        </div>

        {/* =====================================================
            ALERT SUCCESS
        ====================================================== */}

        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0"
            />

            <p className="font-semibold">
              {success}
            </p>
          </div>
        )}

        {/* =====================================================
            ALERT ERROR
        ====================================================== */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <XCircle
              size={19}
              className="mt-0.5 shrink-0"
            />

            <p className="font-semibold">
              {error}
            </p>
          </div>
        )}

        {/* =====================================================
            STATISTICS
        ====================================================== */}

        <div className="mb-8 grid gap-4 sm:grid-cols-3">

          {/* Total */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Total Layanan
            </p>

            <div className="mt-2 flex items-end justify-between">
              <p className="text-3xl font-black text-slate-950">
                {totalServices}
              </p>

              <div className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-bold text-blue-600">
                Semua
              </div>
            </div>
          </div>

          {/* Active */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Layanan Aktif
            </p>

            <div className="mt-2 flex items-end justify-between">
              <p className="text-3xl font-black text-emerald-600">
                {activeServices}
              </p>

              <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-600">
                Aktif
              </div>
            </div>
          </div>

          {/* Inactive */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Layanan Nonaktif
            </p>

            <div className="mt-2 flex items-end justify-between">
              <p className="text-3xl font-black text-red-500">
                {inactiveServices}
              </p>

              <div className="rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
                Nonaktif
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            SERVICE TABLE
        ====================================================== */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Table Header */}

          <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Daftar Layanan
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Menampilkan {filteredServices.length} dari{" "}
                  {services.length} layanan.
                </p>
              </div>

              <button
                type="button"
                onClick={loadServices}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-emerald-200 hover:text-emerald-600"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>

            {/* Search & Filter */}

            <div className="mt-5 grid gap-3 md:grid-cols-[1fr_250px]">

              {/* Search */}

              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Cari nama layanan atau slug..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              {/* Category Filter */}

              <select
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(event.target.value)
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              >
                <option value="semua">
                  Semua Kategori
                </option>

                <option value="administrasi">
                  Administrasi & Kependudukan
                </option>

                <option value="keamanan_lingkungan">
                  Keamanan & Lingkungan
                </option>

                <option value="sosial_kemasyarakatan">
                  Sosial & Kemasyarakatan
                </option>
              </select>
            </div>
          </div>

          {/* Loading */}

          {loading ? (
            <div className="flex min-h-72 flex-col items-center justify-center">
              <LoaderCircle
                size={34}
                className="animate-spin text-emerald-600"
              />

              <p className="mt-4 text-sm font-bold text-slate-700">
                Memuat layanan...
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Mengambil data dari server Firdaus RT 01.
              </p>
            </div>
          ) : filteredServices.length === 0 ? (
            /* Empty */

            <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Search size={27} />
              </div>

              <h3 className="mt-5 font-black text-slate-800">
                Layanan tidak ditemukan
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Tidak ada layanan yang sesuai dengan
                pencarian atau kategori yang dipilih.
              </p>
            </div>
          ) : (
            /* Table */

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">

                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">
                      Layanan
                    </th>

                    <th className="px-6 py-4">
                      Kategori
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4">
                      Deskripsi
                    </th>

                    <th className="px-6 py-4 text-right">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredServices.map(
                    (service) => (
                      <tr
                        key={service.id}
                        className="border-b border-slate-100 transition hover:bg-slate-50"
                      >

                        {/* Service */}

                        <td className="px-6 py-5">
                          <p className="font-bold text-slate-900">
                            {service.nama_layanan}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            /{service.slug}
                          </p>
                        </td>

                        {/* Category */}

                        <td className="px-6 py-5">
                          <span className="inline-flex max-w-[220px] rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                            {
                              categoryLabels[
                                service.kategori
                              ]
                            }
                          </span>
                        </td>

                        {/* Status */}

                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() =>
                              handleToggle(service)
                            }
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black transition ${
                              service.aktif
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                : "bg-red-100 text-red-700 hover:bg-red-200"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                service.aktif
                                  ? "bg-emerald-500"
                                  : "bg-red-500"
                              }`}
                            />

                            {service.aktif
                              ? "Aktif"
                              : "Nonaktif"}
                          </button>
                        </td>

                        {/* Description */}

                        <td className="max-w-xs px-6 py-5">
                          <p className="line-clamp-2 text-sm leading-6 text-slate-500">
                            {service.deskripsi ||
                              "Tidak ada deskripsi."}
                          </p>
                        </td>

                        {/* Actions */}

                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2">

                            {/* Edit */}

                            <button
                              type="button"
                              onClick={() =>
                                openEditForm(service)
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                              aria-label={`Edit ${service.nama_layanan}`}
                              title="Edit"
                            >
                              <Edit3 size={16} />
                            </button>

                            {/* Delete */}

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(service)
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                              aria-label={`Hapus ${service.nama_layanan}`}
                              title="Hapus"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* =======================================================
          MODAL
      ======================================================== */}

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 px-4 py-8 backdrop-blur-sm">

          <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  {editingId === null
                    ? "Layanan Baru"
                    : "Edit Layanan"}
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-950">
                  {editingId === null
                    ? "Tambah Layanan"
                    : "Edit Layanan"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                aria-label="Tutup"
              >
                <X size={19} />
              </button>
            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* Name */}

              <div>
                <label
                  htmlFor="service-name"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Nama Layanan
                </label>

                <input
                  id="service-name"
                  type="text"
                  value={form.nama_layanan}
                  onChange={(event) =>
                    handleNameChange(
                      event.target.value,
                    )
                  }
                  placeholder="Contoh: Surat Keterangan Usaha"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              {/* Category */}

              <div>
                <label
                  htmlFor="service-category"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Kategori
                </label>

                <select
                  id="service-category"
                  value={form.kategori}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      kategori:
                        event.target
                          .value as ServiceInput["kategori"],
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                >
                  <option value="administrasi">
                    Administrasi & Kependudukan
                  </option>

                  <option value="keamanan_lingkungan">
                    Keamanan & Lingkungan
                  </option>

                  <option value="sosial_kemasyarakatan">
                    Sosial & Kemasyarakatan
                  </option>
                </select>
              </div>

              {/* Slug */}

              <div>
                <label
                  htmlFor="service-slug"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Slug
                </label>

                <input
                  id="service-slug"
                  type="text"
                  value={form.slug}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      slug: event.target.value,
                    }))
                  }
                  placeholder="surat-keterangan-usaha"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Slug digunakan sebagai identitas URL layanan.
                </p>
              </div>

              {/* Description */}

              <div>
                <label
                  htmlFor="service-description"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Deskripsi
                </label>

                <textarea
                  id="service-description"
                  value={form.deskripsi}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      deskripsi:
                        event.target.value,
                    }))
                  }
                  rows={4}
                  placeholder="Jelaskan fungsi dan kegunaan layanan..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              {/* Form Footer */}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <LoaderCircle
                      size={17}
                      className="animate-spin"
                    />
                  )}

                  {editingId === null
                    ? "Simpan Layanan"
                    : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}