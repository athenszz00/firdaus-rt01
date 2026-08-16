import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Users,
  UserCheck,
  UserRoundPlus,
  UserX,
  X,
  Save,
} from "lucide-react";

import {
  createResident,
  deleteResident,
  getResidents,
  updateResident,
  type Resident,
} from "../api/api";

type ResidentForm = {
  nik: string;
  no_kk: string;
  nama_lengkap: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: "L" | "P" | "";
  alamat: string;
  rt: string;
  rw: string;
  no_hp: string;
  status_warga: Resident["status_warga"];
};

const emptyForm: ResidentForm = {
  nik: "",
  no_kk: "",
  nama_lengkap: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  jenis_kelamin: "",
  alamat: "",
  rt: "01",
  rw: "",
  no_hp: "",
  status_warga: "tetap",
};

export default function AdminResidents() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("semua");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResident, setEditingResident] =
    useState<Resident | null>(null);

  const [form, setForm] = useState<ResidentForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadResidents() {
  try {
    setLoading(true);
    setError("");

    const data = await getResidents();
    setResidents(data);
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Gagal mengambil data warga."
    );
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  let isMounted = true;

  async function fetchResidents() {
    try {
      const data = await getResidents();

      if (isMounted) {
        setResidents(data);
      }
    } catch (err) {
      if (isMounted) {
        setError(
          err instanceof Error
            ? err.message
            : "Gagal mengambil data warga."
        );
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  }

  fetchResidents();

  return () => {
    isMounted = false;
  };
}, []);

  const statistics = useMemo(() => {
    return {
      total: residents.length,
      tetap: residents.filter(
        (resident) => resident.status_warga === "tetap"
      ).length,
      pendatang: residents.filter(
        (resident) => resident.status_warga === "pendatang"
      ).length,
      pindah: residents.filter(
        (resident) => resident.status_warga === "pindah"
      ).length,
      meninggal: residents.filter(
        (resident) => resident.status_warga === "meninggal"
      ).length,
    };
  }, [residents]);

  const filteredResidents = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return residents.filter((resident) => {
      const matchesSearch =
        !keyword ||
        resident.nama_lengkap.toLowerCase().includes(keyword) ||
        resident.nik.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "semua" ||
        resident.status_warga === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [residents, search, statusFilter]);

  function openCreateModal() {
    setEditingResident(null);
    setForm(emptyForm);
    setError("");
    setIsModalOpen(true);
  }

  function openEditModal(resident: Resident) {
    setEditingResident(resident);

    setForm({
      nik: resident.nik,
      no_kk: resident.no_kk || "",
      nama_lengkap: resident.nama_lengkap,
      tempat_lahir: resident.tempat_lahir || "",
      tanggal_lahir: resident.tanggal_lahir || "",
      jenis_kelamin: resident.jenis_kelamin || "",
      alamat: resident.alamat || "",
      rt: resident.rt || "01",
      rw: resident.rw || "",
      no_hp: resident.no_hp || "",
      status_warga: resident.status_warga,
    });

    setError("");
    setIsModalOpen(true);
  }

  function closeModal() {
    if (saving) return;

    setIsModalOpen(false);
    setEditingResident(null);
    setForm(emptyForm);
    setError("");
  }

  function handleChange(
    field: keyof ResidentForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!form.nik.trim()) {
      setError("NIK wajib diisi.");
      return;
    }

    if (!form.nama_lengkap.trim()) {
      setError("Nama lengkap wajib diisi.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        user_id: editingResident?.user_id ?? null,
        nik: form.nik.trim(),
        no_kk: form.no_kk.trim() || null,
        nama_lengkap: form.nama_lengkap.trim(),
        tempat_lahir: form.tempat_lahir.trim() || null,
        tanggal_lahir: form.tanggal_lahir || null,
        jenis_kelamin: form.jenis_kelamin || null,
        alamat: form.alamat.trim() || null,
        rt: form.rt.trim() || "01",
        rw: form.rw.trim() || null,
        no_hp: form.no_hp.trim() || null,
        status_warga: form.status_warga,
      };

      if (editingResident) {
        await updateResident(editingResident.id, payload);
      } else {
        await createResident(payload);
      }

      await loadResidents();
      closeModal();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(resident: Resident) {
    const confirmed = window.confirm(
      `Hapus data warga "${resident.nama_lengkap}"?`
    );

    if (!confirmed) return;

    try {
      await deleteResident(resident.id);
      await loadResidents();
    } catch (err) {
      window.alert(
        err instanceof Error
          ? err.message
          : "Gagal menghapus data warga."
      );
    }
  }

  function getStatusLabel(status: Resident["status_warga"]) {
    const labels = {
      tetap: "Tetap",
      pendatang: "Pendatang",
      pindah: "Pindah",
      meninggal: "Meninggal",
    };

    return labels[status];
  }

  function getStatusClass(status: Resident["status_warga"]) {
    const classes = {
      tetap:
        "bg-emerald-50 text-emerald-700 border-emerald-200",
      pendatang:
        "bg-blue-50 text-blue-700 border-blue-200",
      pindah:
        "bg-amber-50 text-amber-700 border-amber-200",
      meninggal:
        "bg-slate-100 text-slate-600 border-slate-200",
    };

    return classes[status];
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-emerald-600">
              Admin Panel
            </p>

            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Data Warga
            </h1>

            <p className="mt-2 text-slate-500">
              Kelola data kependudukan warga RT 01.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            <Plus size={18} />
            Tambah Warga
          </button>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
          <StatCard
            icon={<Users size={20} />}
            label="Total Warga"
            value={statistics.total}
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            icon={<UserCheck size={20} />}
            label="Warga Tetap"
            value={statistics.tetap}
            iconClass="bg-green-50 text-green-600"
          />

          <StatCard
            icon={<UserRoundPlus size={20} />}
            label="Pendatang"
            value={statistics.pendatang}
            iconClass="bg-blue-50 text-blue-600"
          />

          <StatCard
            icon={<UserX size={20} />}
            label="Pindah"
            value={statistics.pindah}
            iconClass="bg-amber-50 text-amber-600"
          />

          <StatCard
            icon={<UserX size={20} />}
            label="Meninggal"
            value={statistics.meninggal}
            iconClass="bg-slate-100 text-slate-600"
          />
        </div>

        {/* Main Card */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Search */}
          <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Cari nama atau NIK..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-700 outline-none focus:border-emerald-500"
            >
              <option value="semua">Semua Status</option>
              <option value="tetap">Tetap</option>
              <option value="pendatang">Pendatang</option>
              <option value="pindah">Pindah</option>
              <option value="meninggal">Meninggal</option>
            </select>
          </div>

          {/* Error */}
          {error && !isModalOpen && (
            <div className="m-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4">Warga</th>
                  <th className="px-6 py-4">NIK</th>
                  <th className="px-6 py-4">Jenis Kelamin</th>
                  <th className="px-6 py-4">RT / RW</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      Memuat data warga...
                    </td>
                  </tr>
                ) : filteredResidents.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center"
                    >
                      <Users
                        size={40}
                        className="mx-auto mb-3 text-slate-300"
                      />

                      <p className="font-bold text-slate-700">
                        Belum ada data warga
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        Tambahkan data warga untuk mulai
                        mengelola kependudukan.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredResidents.map((resident) => (
                    <tr
                      key={resident.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">
                          {resident.nama_lengkap}
                        </div>

                        <div className="mt-1 text-sm text-slate-400">
                          {resident.tempat_lahir || "-"}
                        </div>
                      </td>

                      <td className="px-6 py-4 font-mono text-sm text-slate-600">
                        {resident.nik}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {resident.jenis_kelamin === "L"
                          ? "Laki-laki"
                          : resident.jenis_kelamin === "P"
                            ? "Perempuan"
                            : "-"}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        RT {resident.rt || "01"} / RW{" "}
                        {resident.rw || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getStatusClass(
                            resident.status_warga
                          )}`}
                        >
                          {getStatusLabel(
                            resident.status_warga
                          )}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(resident)
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                            title="Edit"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(resident)
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            title="Hapus"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
            Menampilkan{" "}
            <span className="font-bold text-slate-700">
              {filteredResidents.length}
            </span>{" "}
            dari{" "}
            <span className="font-bold text-slate-700">
              {residents.length}
            </span>{" "}
            data warga.
          </div>
        </section>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  {editingResident
                    ? "Edit Data Warga"
                    : "Tambah Data Warga"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Lengkapi informasi warga RT 01.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              <div className="grid gap-5 md:grid-cols-2">
                <FormInput
                  label="NIK"
                  required
                  value={form.nik}
                  onChange={(value) =>
                    handleChange("nik", value)
                  }
                  placeholder="Masukkan NIK"
                />

                <FormInput
                  label="Nomor KK"
                  value={form.no_kk}
                  onChange={(value) =>
                    handleChange("no_kk", value)
                  }
                  placeholder="Masukkan nomor KK"
                />

                <div className="md:col-span-2">
                  <FormInput
                    label="Nama Lengkap"
                    required
                    value={form.nama_lengkap}
                    onChange={(value) =>
                      handleChange(
                        "nama_lengkap",
                        value
                      )
                    }
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                <FormInput
                  label="Tempat Lahir"
                  value={form.tempat_lahir}
                  onChange={(value) =>
                    handleChange(
                      "tempat_lahir",
                      value
                    )
                  }
                  placeholder="Contoh: Bandung"
                />

                <FormInput
                  label="Tanggal Lahir"
                  type="date"
                  value={form.tanggal_lahir}
                  onChange={(value) =>
                    handleChange(
                      "tanggal_lahir",
                      value
                    )
                  }
                />

                <FormSelect
                  label="Jenis Kelamin"
                  value={form.jenis_kelamin}
                  onChange={(value) =>
                    handleChange(
                      "jenis_kelamin",
                      value
                    )
                  }
                  options={[
                    { value: "", label: "Pilih jenis kelamin" },
                    { value: "L", label: "Laki-laki" },
                    { value: "P", label: "Perempuan" },
                  ]}
                />

                <FormSelect
                  label="Status Warga"
                  value={form.status_warga}
                  onChange={(value) =>
                    handleChange(
                      "status_warga",
                      value
                    )
                  }
                  options={[
                    { value: "tetap", label: "Tetap" },
                    {
                      value: "pendatang",
                      label: "Pendatang",
                    },
                    { value: "pindah", label: "Pindah" },
                    {
                      value: "meninggal",
                      label: "Meninggal",
                    },
                  ]}
                />

                <FormInput
                  label="RT"
                  value={form.rt}
                  onChange={(value) =>
                    handleChange("rt", value)
                  }
                  placeholder="01"
                />

                <FormInput
                  label="RW"
                  value={form.rw}
                  onChange={(value) =>
                    handleChange("rw", value)
                  }
                  placeholder="Masukkan RW"
                />

                <FormInput
                  label="Nomor HP"
                  value={form.no_hp}
                  onChange={(value) =>
                    handleChange("no_hp", value)
                  }
                  placeholder="08xxxxxxxxxx"
                />

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Alamat
                  </label>

                  <textarea
                    value={form.alamat}
                    onChange={(event) =>
                      handleChange(
                        "alamat",
                        event.target.value
                      )
                    }
                    rows={3}
                    placeholder="Masukkan alamat lengkap"
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save size={18} />

                  {saving
                    ? "Menyimpan..."
                    : editingResident
                      ? "Simpan Perubahan"
                      : "Simpan Warga"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  iconClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div
        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black text-slate-900">
        {value}
      </p>
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
      />
    </div>
  );
}

function FormSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}