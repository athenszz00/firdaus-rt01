const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export type Service = {
  id: number;
  kategori:
    | "administrasi"
    | "keamanan_lingkungan"
    | "sosial_kemasyarakatan";
  nama_layanan: string;
  slug: string;
  deskripsi: string | null;
  aktif: boolean;
};

export type ServiceInput = {
  kategori:
    | "administrasi"
    | "keamanan_lingkungan"
    | "sosial_kemasyarakatan";
  nama_layanan: string;
  slug: string;
  deskripsi: string;
};

type ServicesResponse = {
  success: boolean;
  total: number;
  data: Service[];
};

// =========================================================
// CHECK BACKEND
// =========================================================

export async function checkBackend() {
  const response = await fetch(`${API_URL}/api/health`);

  if (!response.ok) {
    throw new Error("Backend tidak dapat dihubungi.");
  }

  return response.json();
}

// =========================================================
// GET SERVICES
// =========================================================

export async function getServices(): Promise<Service[]> {
  const response = await fetch(`${API_URL}/api/services`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data layanan.");
  }

  const result: ServicesResponse = await response.json();

  if (!result.success) {
    throw new Error("Data layanan tidak berhasil diambil.");
  }

  return result.data;
}

// =========================================================
// CREATE SERVICE
// =========================================================

export async function createService(
  data: ServiceInput,
): Promise<Service> {
  const response = await fetch(`${API_URL}/api/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Gagal menambahkan layanan.",
    );
  }

  return result.data;
}

// =========================================================
// UPDATE SERVICE
// =========================================================

export async function updateService(
  id: number,
  data: Partial<ServiceInput> & {
    aktif?: boolean;
  },
): Promise<Service> {
  const response = await fetch(
    `${API_URL}/api/services/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Gagal memperbarui layanan.",
    );
  }

  return result.data;
}

// =========================================================
// DELETE SERVICE
// =========================================================

export async function deleteService(
  id: number,
): Promise<void> {
  const response = await fetch(
    `${API_URL}/api/services/${id}`,
    {
      method: "DELETE",
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Gagal menghapus layanan.",
    );
  }
}

// =========================================================
// TOGGLE SERVICE STATUS
// =========================================================

export async function toggleService(
  id: number,
): Promise<Service> {
  const response = await fetch(
    `${API_URL}/api/services/${id}/toggle`,
    {
      method: "PATCH",
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Gagal mengubah status layanan.",
    );
  }

  return result.data;
}

// =========================================================
// RESIDENT API
// =========================================================

export type Resident = {
  id: number;
  user_id: number | null;
  nik: string;
  no_kk: string | null;
  nama_lengkap: string;
  tempat_lahir: string | null;
  tanggal_lahir: string | null;
  jenis_kelamin: "L" | "P" | null;
  alamat: string | null;
  rt: string;
  rw: string | null;
  no_hp: string | null;
  status_warga: "tetap" | "pendatang" | "pindah" | "meninggal";
  created_at: string;
  updated_at: string;
};

type ResidentsResponse = {
  success: boolean;
  total: number;
  data: Resident[];
};

export async function getResidents(): Promise<Resident[]> {
  const response = await fetch(`${API_URL}/api/residents`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data warga.");
  }

  const result: ResidentsResponse = await response.json();

  if (!result.success) {
    throw new Error("Data warga tidak berhasil diambil.");
  }

  return result.data;
}

export async function createResident(
  data: Omit<Resident, "id" | "created_at" | "updated_at">
) {
  const response = await fetch(`${API_URL}/api/residents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Gagal menambahkan data warga.");
  }

  return result;
}

export async function updateResident(
  id: number,
  data: Omit<Resident, "id" | "created_at" | "updated_at">
) {
  const response = await fetch(`${API_URL}/api/residents/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Gagal memperbarui data warga.");
  }

  return result;
}

export async function deleteResident(id: number) {
  const response = await fetch(`${API_URL}/api/residents/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Gagal menghapus data warga.");
  }

  return result;
}

// =========================================================
// AUTHENTICATION
// =========================================================

export type AuthUser = {
  id: number;
  google_id: string;
  name: string;
  email: string;
  photo_url: string | null;
  role: "user" | "admin";
};

export async function loginWithGoogle(
  credential: string
): Promise<AuthUser> {
  const response = await fetch(
    `${API_URL}/api/auth/google`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credential,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Login Google gagal."
    );
  }

  return result.user;
}

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await fetch(
    `${API_URL}/api/auth/me`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "User belum login."
    );
  }

  return result.user;
}

export async function logoutUser() {
  const response = await fetch(
    `${API_URL}/api/auth/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Logout gagal."
    );
  }

  return result;
}
// =========================================================
// APPLICATION API
// =========================================================

export type ApplicationStatus =
  | "menunggu"
  | "diproses"
  | "disetujui"
  | "ditolak"
  | "selesai";

export type Application = {
  id: number;
  user_id: number;
  service_id: number;
  nomor_pengajuan: string;
  nomor_surat: string | null;
  status: ApplicationStatus;
  data_pengajuan: Record<string, unknown>;
  catatan: string | null;
  created_at: string | null;
  updated_at: string | null;
  user?: {
    id: number;
    name: string;
    email: string;
  } | null;
  service?: {
    id: number;
    nama_layanan: string;
    slug: string;
  } | null;
};

type ApplicationsResponse = {
  success: boolean;
  total: number;
  data: Application[];
  message?: string;
};

export async function createApplication(
  serviceId: number,
  dataPengajuan: Record<string, unknown>,
): Promise<Application> {
  const response = await fetch(
    `${API_URL}/api/applications`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        data_pengajuan: dataPengajuan,
      }),
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Gagal membuat pengajuan.",
    );
  }

  return result.data;
}

export async function getMyApplications(): Promise<Application[]> {
  const response = await fetch(
    `${API_URL}/api/applications/my`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const result: ApplicationsResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Gagal mengambil pengajuan.",
    );
  }

  return result.data;
}

export async function getAllApplications(): Promise<Application[]> {
  const response = await fetch(
    `${API_URL}/api/applications`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const result: ApplicationsResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Gagal mengambil seluruh pengajuan.",
    );
  }

  return result.data;
}

export async function updateApplicationStatus(
  applicationId: number,
  status: ApplicationStatus,
  catatan?: string,
): Promise<Application> {
  const response = await fetch(
    `${API_URL}/api/applications/${applicationId}/status`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        catatan,
      }),
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        "Gagal memperbarui status pengajuan.",
    );
  }

  return result.data;
}