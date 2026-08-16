import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Info,
  Send,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import {
  createApplication,
  getCurrentUser,
  getServices,
  type Service,
} from "../../api/api";

const letterTypes = [
  {
    value: "ktp",
    label: "Pengurusan KTP",
  },
  {
    value: "kk",
    label: "Pengurusan Kartu Keluarga (KK)",
  },
  {
    value: "skck",
    label: "Pengantar SKCK",
  },
  {
    value: "nikah",
    label: "Pengantar Surat Nikah",
  },
  {
    value: "sktm",
    label: "Surat Keterangan Tidak Mampu (SKTM)",
  },
  {
    value: "lainnya",
    label: "Keperluan Lainnya",
  },
];

const letterTypeToSlug: Record<string, string> = {
  ktp: "surat-pengantar-ktp",
  kk: "surat-pengantar-kk",
  skck: "surat-pengantar-skck",
  nikah: "surat-pengantar-nikah",
  sktm: "surat-keterangan-tidak-mampu",
  lainnya: "surat-pengantar",
};

export default function SuratPengantar() {
  const [formData, setFormData] = useState({
  letterType: "",
  name: "",
  nik: "",
  kk: "",
  birthPlace: "",
  birthDate: "",
  occupation: "",
  religion: "",
  phone: "",
  address: "",
  purpose: "",
  notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [applicationNumber, setApplicationNumber] =
    useState("");

  const [service, setService] = useState<Service | null>(
    null,
  );

  const [services, setServices] = useState<Service[]>([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // LOAD USER + SERVICE
  // =========================================================

  useEffect(() => {
    let mounted = true;

    async function loadPage() {
      try {
        setLoading(true);
        setError("");

        const [currentUser, services] = await Promise.all([
  getCurrentUser(),
  getServices(),
]);

if (!mounted) {
  return;
}

setServices(services);

// Isi nama otomatis dari akun Google
setFormData((previous) => ({
  ...previous,
  name: currentUser.name,
}));
      } catch (err) {
        if (!mounted) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Gagal memuat halaman pengajuan.",
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadPage();

    return () => {
      mounted = false;
    };
  }, []);

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (
  event: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
) => {
  const { name, value } = event.target;

  setFormData((previous) => ({
    ...previous,
    [name]: value,
  }));

  if (name === "letterType") {
    const slug = letterTypeToSlug[value];

    const selectedService = services.find(
      (item) => item.slug === slug,
    );

    setService(selectedService ?? null);

    if (!selectedService && value) {
      setError(
        "Layanan yang dipilih belum tersedia.",
      );
    } else {
      setError("");
    }
  }
};

  // =========================================================
  // SUBMIT APPLICATION
  // =========================================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!formData.letterType) {
  setError("Silakan pilih jenis surat terlebih dahulu.");
  return;
  }

  if (!service) {
    setError(
      "Layanan yang dipilih belum tersedia. Silakan coba lagi.",
    );
    return;
  }

    try {
      setSubmitting(true);
      setError("");

      const application = await createApplication(
      service.id,
      {
        letter_type: formData.letterType,
        name: formData.name,
        nik: formData.nik,
        kk: formData.kk,
        birth_place: formData.birthPlace,
        birth_date: formData.birthDate,
        occupation: formData.occupation,
        religion: formData.religion,
        phone: formData.phone,
        address: formData.address,
        purpose: formData.purpose,
        notes: formData.notes,
      },
    );

      setApplicationNumber(
        application.nomor_surat ||
        application.nomor_pengajuan,
      );

      setIsSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal mengirim pengajuan.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-3xl items-center justify-center px-5 py-12 sm:px-6">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

            <p className="mt-5 text-sm font-semibold text-slate-500">
              Memuat halaman pengajuan...
            </p>
          </div>
        </main>
      </div>
    );
  }

  // =========================================================
  // SUCCESS
  // =========================================================

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-3xl items-center px-5 py-12 sm:px-6">
          <div className="w-full rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-xl shadow-slate-900/5 sm:p-12">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={42} />
            </div>

            <div className="mt-7 inline-flex rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700">
              Menunggu Verifikasi
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Pengajuan Berhasil!
            </h1>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-500">
              Pengajuan surat pengantar kamu sudah berhasil
              dicatat. Selanjutnya pengajuan akan diperiksa
              dan diverifikasi oleh Admin RT 01.
            </p>

            {/* NOMOR PENGAJUAN */}
            <div className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Nomor Pengajuan
              </p>

              <p className="mt-2 text-2xl font-black tracking-wide text-slate-950">
                {applicationNumber}
              </p>
            </div>

            <div className="mx-auto mt-4 max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left">

              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-sm text-slate-500">
                  Jenis Surat
                </span>

                <span className="text-right text-sm font-bold text-slate-800">
                  {
                    letterTypes.find(
                      (item) =>
                        item.value ===
                        formData.letterType,
                    )?.label
                  }
                </span>
              </div>

              <div className="flex items-center justify-between pt-4">
                <span className="text-sm text-slate-500">
                  Pemohon
                </span>

                <span className="text-sm font-bold text-slate-800">
                  {formData.name}
                </span>
              </div>

            </div>

            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setApplicationNumber("");
              }}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Buat Pengajuan Baru
            </button>

          </div>
        </main>
      </div>
    );
  }

  // =========================================================
  // FORM
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">

          <a
            href="/layanan"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-emerald-600"
          >
            <ArrowLeft size={17} />
            Kembali ke Layanan
          </a>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <FileText size={26} />
            </div>

            <div>
              <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                Layanan Administrasi
              </div>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Surat Pengantar
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-slate-500">
                Ajukan surat pengantar secara online tanpa
                harus datang langsung untuk melakukan
                pengajuan secara manual.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Form */}
      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold leading-6 text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

          {/* Main Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >

            <div className="border-b border-slate-100 pb-6">
              <h2 className="text-xl font-black text-slate-950">
                Form Pengajuan
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Isi data dengan benar agar proses verifikasi
                dapat dilakukan dengan cepat.
              </p>
            </div>

            {/* Jenis Surat */}
            <div className="mt-7">
              <label
                htmlFor="letterType"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Jenis Surat
              </label>

              <select
                id="letterType"
                name="letterType"
                value={formData.letterType}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              >
                <option value="">
                  Pilih jenis surat
                </option>

                {letterTypes.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Data Pemohon */}
            <div className="mt-9">
              <h3 className="text-base font-black text-slate-900">
                Data Pemohon
              </h3>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Nama Lengkap
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="nik"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    NIK
                  </label>

                  <input
                    id="nik"
                    name="nik"
                    type="text"
                    inputMode="numeric"
                    maxLength={16}
                    value={formData.nik}
                    onChange={handleChange}
                    placeholder="16 digit NIK"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
                
                <div>
                  <label
                    htmlFor="kk"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Nomor KK
                  </label>

                  <input
                    id="kk"
                    name="kk"
                    type="text"
                    inputMode="numeric"
                    maxLength={16}
                    value={formData.kk}
                    onChange={handleChange}
                    placeholder="16 digit nomor KK"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
                <div>
                  <label
                    htmlFor="birthPlace"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Tempat Lahir
                  </label>

                  <input
                    id="birthPlace"
                    name="birthPlace"
                    type="text"
                    value={formData.birthPlace}
                    onChange={handleChange}
                    placeholder="Masukkan tempat lahir"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="birthDate"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Tanggal Lahir
                  </label>

                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
                <div>
                  <label
                    htmlFor="occupation"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Pekerjaan
                  </label>

                  <input
                    id="occupation"
                    name="occupation"
                    type="text"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="Contoh: Pelajar / Mahasiswa"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="religion"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Agama
                  </label>

                  <select
                    id="religion"
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  >
                    <option value="">Pilih agama</option>
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Konghucu">Konghucu</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Nomor WhatsApp
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>

              </div>
            </div>

            {/* Alamat */}
            <div className="mt-6">
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Alamat
              </label>

              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Masukkan alamat tempat tinggal"
                rows={3}
                required
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            {/* Keperluan */}
            <div className="mt-6">
              <label
                htmlFor="purpose"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Keperluan
              </label>

              <input
                id="purpose"
                name="purpose"
                type="text"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="Contoh: Persyaratan administrasi"
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            {/* Catatan */}
            <div className="mt-6">
              <label
                htmlFor="notes"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Catatan Tambahan
                <span className="ml-2 font-normal text-slate-400">
                  (Opsional)
                </span>
              </label>

              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Tambahkan informasi jika diperlukan"
                rows={4}
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            {/* Submit */}
            <div className="mt-8 border-t border-slate-100 pt-6">

              <button
                type="submit"
                disabled={submitting || !service}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                <Send size={18} />

                {submitting
                  ? "Mengirim Pengajuan..."
                  : "Kirim Pengajuan"}
              </button>

            </div>

          </form>

          {/* Information */}
          <aside className="space-y-5">

            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                <Info size={20} />
              </div>

              <h3 className="mt-5 font-black text-slate-900">
                Informasi Pengajuan
              </h3>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li>
                  • Pastikan data yang dimasukkan sudah benar.
                </li>

                <li>
                  • Gunakan NIK dan nomor KK yang sesuai
                  dengan data kependudukan.
                </li>

                <li>
                  • Pengajuan akan diverifikasi oleh Admin RT.
                </li>

                <li>
                  • Surat dapat diproses setelah pengajuan
                  disetujui.
                </li>
              </ul>

            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6">

              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Status Proses
              </p>

              <div className="mt-5 space-y-4">

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-700">
                    1
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Pengajuan
                    </p>

                    <p className="text-xs text-slate-400">
                      Data dikirim warga
                    </p>
                  </div>
                </div>

                <div className="ml-4 h-5 border-l border-dashed border-slate-300" />

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-500">
                    2
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Verifikasi
                    </p>

                    <p className="text-xs text-slate-400">
                      Diperiksa Admin RT
                    </p>
                  </div>
                </div>

                <div className="ml-4 h-5 border-l border-dashed border-slate-300" />

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-500">
                    3
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Selesai
                    </p>

                    <p className="text-xs text-slate-400">
                      Surat siap diproses
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </aside>

        </div>

      </main>
    </div>
  );
}