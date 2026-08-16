import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Dashboard from "./pages/Dashboard";
import BackendTest from "./pages/BackendTest";
import AdminServices from "./pages/AdminServices"; 
import AdminResidents from "./pages/AdminResidents";
import AdminApplications from "./pages/AdminApplications";
import AdminDashboard from "./pages/AdminDashboard";

import SuratPengantar from "./pages/services/SuratPengantar";
import SuratKeterangan from "./pages/services/SuratKeterangan";
import PendataanWarga from "./pages/services/PendataanWarga";
import SuratDomisili from "./pages/services/SuratDomisili";
import Siskamling from "./pages/services/Siskamling";
import KerjaBakti from "./pages/services/KerjaBakti";
import PengelolaanSampah from "./pages/services/PengelolaanSampah";
import MediasiWarga from "./pages/services/MediasiWarga";
import BantuanSosial from "./pages/services/BantuanSosial";
import KegiatanWarga from "./pages/services/KegiatanWarga";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            HALAMAN UTAMA
        ========================== */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* =========================
            LOGIN
        ========================== */}
        <Route
          path="/login"
          element={<Login />}
        />
        
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/backend-test"
          element={<BackendTest />}
        />
        {/* =========================
            SEMUA LAYANAN
        ========================== */}
        <Route
          path="/layanan"
          element={<Services />}
        />
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
        <Route
          path="/admin/services"
          element={<AdminServices />}
        />
        <Route
          path="/admin/residents"
          element={<AdminResidents />}
        /> 
                <Route
          path="/admin/applications"
          element={<AdminApplications />}
        />
        
        {/* =========================
            LAYANAN ADMINISTRASI
        ========================== */}
        <Route
          path="/layanan/surat-pengantar"
          element={<SuratPengantar/>}
        />
        <Route
          path="/layanan/surat-pengantar-ktp"
          element={<SuratPengantar />}
        />
        <Route
          path="/layanan/surat-pengantar-kk"
          element={<SuratPengantar />}
        />
        <Route
          path="/layanan/surat-pengantar-skck"
          element={<SuratPengantar />}
        />
        <Route
          path="/layanan/surat-pengantar-nikah"
          element={<SuratPengantar />}
        />
        <Route
          path="/layanan/surat-keterangan"
          element={<SuratKeterangan />}
        />
        <Route
          path="/layanan/surat-keterangan-tidak-mampu"
          element={<SuratPengantar />}
        />
        <Route
          path="/layanan/surat-domisili"
          element={<SuratPengantar />}
        />
        
        <Route
          path="/layanan/pendataan-warga"
          element={<PendataanWarga />}
        />
        <Route
          path="/layanan/domisili"
          element={<SuratDomisili />}
        />

        {/* =========================
            KEAMANAN & LINGKUNGAN
        ========================== */}
        <Route
          path="/layanan/siskamling"
          element={<Siskamling />}
        />

        <Route
          path="/layanan/kerja-bakti"
          element={<KerjaBakti />}
        />

        <Route
          path="/layanan/sampah"
          element={<PengelolaanSampah />}
        />

        {/* =========================
            SOSIAL & KEMASYARAKATAN
        ========================== */}
        
        <Route
          path="/layanan/mediasi-warga"
          element={<MediasiWarga />}
        />
        <Route
          path="/layanan/bantuan-sosial"
          element={<BantuanSosial />}
        />

        <Route
          path="/layanan/kegiatan-warga"
          element={<KegiatanWarga />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;