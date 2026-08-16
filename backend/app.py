import os
import ssl
from datetime import datetime
from io import BytesIO

from dotenv import load_dotenv
from flask import Flask, jsonify, request, session, send_file
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
load_dotenv()

app = Flask(__name__)

CORS(
    app,
    supports_credentials=True,
    origins=[
        "http://localhost:5173",
    ],
)

app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY")

app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = False

# =========================================================
# DATABASE CONFIGURATION
# =========================================================

database_url = os.getenv("DATABASE_URL")

if not database_url:
    raise RuntimeError(
        "DATABASE_URL belum ditemukan. "
        "Pastikan file backend/.env sudah dibuat."
    )

google_client_id = os.getenv("GOOGLE_CLIENT_ID")

if not google_client_id:
    raise RuntimeError(
        "GOOGLE_CLIENT_ID belum ditemukan. "
        "Pastikan backend/.env sudah diisi."
    )

if not app.config["SECRET_KEY"]:
    raise RuntimeError(
        "FLASK_SECRET_KEY belum ditemukan. "
        "Pastikan backend/.env sudah diisi."
    )

aiven_ca_cert = os.getenv("AIVEN_CA_CERT")

app.config["SQLALCHEMY_DATABASE_URI"] = database_url

if aiven_ca_cert:
    ssl_context = ssl.create_default_context(
        cadata=aiven_ca_cert,
    )

    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
        "connect_args": {
            "ssl": ssl_context,
        }
    }

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


# =========================================================
# MODEL SERVICE
# =========================================================

class Service(db.Model):
    __tablename__ = "services"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    kategori = db.Column(
        db.String(50),
        nullable=False
    )

    nama_layanan = db.Column(
        db.String(150),
        nullable=False
    )

    slug = db.Column(
        db.String(150),
        nullable=False,
        unique=True
    )

    deskripsi = db.Column(
        db.Text,
        nullable=True
    )

    aktif = db.Column(
        db.Boolean,
        nullable=False,
        default=True
    )

    created_at = db.Column(
        db.DateTime,
        nullable=True
    )

    updated_at = db.Column(
        db.DateTime,
        nullable=True
    )

    def to_dict(self):
        return {
            "id": self.id,
            "kategori": self.kategori,
            "nama_layanan": self.nama_layanan,
            "slug": self.slug,
            "deskripsi": self.deskripsi,
            "aktif": bool(self.aktif),
        }
class Application(db.Model):
    __tablename__ = "applications"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE", onupdate="CASCADE"),
        nullable=False,
    )
    service_id = db.Column(
        db.Integer,
        db.ForeignKey("services.id", ondelete="RESTRICT", onupdate="CASCADE"),
        nullable=False,
    )

    nomor_pengajuan = db.Column(
        db.String(30),
        unique=True,
        nullable=False,
    )

    nomor_surat = db.Column(
    db.String(100),
    unique=True,
    nullable=True,
    )

    status = db.Column(
        db.Enum(
            "menunggu",
            "diproses",
            "disetujui",
            "ditolak",
            "selesai",
            name="application_status",
        ),
        nullable=False,
        default="menunggu",
    )

    data_pengajuan = db.Column(
        db.JSON,
        nullable=False,
    )

    catatan = db.Column(
        db.Text,
        nullable=True,
    )

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        server_default=db.func.current_timestamp(),
    )

    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        server_default=db.func.current_timestamp(),
        onupdate=db.func.current_timestamp(),
    )

    user = db.relationship(
        "User",
        backref=db.backref(
            "applications",
            lazy=True,
        ),
    )

    service = db.relationship(
        "Service",
        backref=db.backref(
            "applications",
            lazy=True,
        ),
    )
    
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "service_id": self.service_id,
            "nomor_pengajuan": self.nomor_pengajuan,
            "nomor_surat": self.nomor_surat,
            "status": self.status,
            "data_pengajuan": self.data_pengajuan,
            "catatan": self.catatan,
            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            ),
            "updated_at": (
                self.updated_at.isoformat()
                if self.updated_at
                else None
            ),
            "user": {
                "id": self.user.id,
                "name": self.user.name,
                "email": self.user.email,
            } if self.user else None,
            "service": {
                "id": self.service.id,
                "nama_layanan": self.service.nama_layanan,
                "slug": self.service.slug,
            } if self.service else None,
        }
# =========================================================
# ADMIN HELPER
# =========================================================

def require_admin():
    user_id = session.get("user_id")

    if not user_id:
        return None, (
            jsonify({
                "success": False,
                "message": "Anda harus login terlebih dahulu.",
            }),
            401,
        )

    user = db.session.get(User, user_id)

    if not user:
        return None, (
            jsonify({
                "success": False,
                "message": "User tidak ditemukan.",
            }),
            404,
        )

    if user.role != "admin":
        return None, (
            jsonify({
                "success": False,
                "message": "Akses hanya untuk admin.",
            }),
            403,
        )

    return user, None

# =========================================================
# MODEL USER
# =========================================================

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True,
    )

    google_id = db.Column(
        db.String(255),
        unique=True,
        nullable=True,
    )

    name = db.Column(
        db.String(150),
        nullable=False,
    )

    email = db.Column(
        db.String(150),
        unique=True,
        nullable=False,
    )

    photo_url = db.Column(
        db.Text,
        nullable=True,
    )

    role = db.Column(
        db.Enum("user", "admin", name="user_role"),
        nullable=False,
        default="user",
    )

    created_at = db.Column(
        db.DateTime,
        nullable=True,
    )

    updated_at = db.Column(
        db.DateTime,
        nullable=True,
        onupdate=db.func.current_timestamp(),
    )
# =========================================================
# LETTER NUMBER CONFIGURATION
# =========================================================

RT_CODE = "001"
RW_CODE = "014"

ROMAN_MONTHS = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
    11: "XI",
    12: "XII",
}


def get_letter_prefix(service):
    slug = service.slug

    # =====================================================
    # SURAT PENGANTAR -> SP
    # =====================================================

    if slug in {
        "surat-pengantar",
        "surat-pengantar-ktp",
        "surat-pengantar-kk",
        "surat-pengantar-skck",
        "surat-pengantar-nikah",
        "surat-keterangan-tidak-mampu",
    }:
        return "SP"

    # =====================================================
    # SURAT KETERANGAN -> SK
    # =====================================================

    if slug in {
        "surat-keterangan",
        "surat-domisili",
    }:
        return "SK"

    return None


def generate_letter_number(prefix):
    last_number = 0

    applications = (
        Application.query
        .filter(
            Application.nomor_surat.like(
                f"{prefix}/%"
            )
        )
        .order_by(
            Application.id.desc()
        )
        .all()
    )

    for application in applications:
        if not application.nomor_surat:
            continue

        try:
            parts = application.nomor_surat.split("/")

            # Format:
            # PREFIX/00001/001/014/VIII/2026

            if len(parts) >= 6:
                sequence = int(parts[1])
                last_number = max(
                    last_number,
                    sequence,
                )

        except (ValueError, IndexError):
            continue

    next_number = last_number + 1

    return next_number
def build_letter_number(prefix, sequence):
    now = datetime.now()

    month_roman = ROMAN_MONTHS[
        now.month
    ]

    return (
        f"{prefix}/"
        f"{sequence:05d}/"
        f"{RT_CODE}/"
        f"{RW_CODE}/"
        f"{month_roman}/"
        f"{now.year}"
    )
# =========================================================
# APPLICATION ROUTES
# =========================================================

@app.route("/api/applications", methods=["POST"])
def create_application():
    try:
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({
                "success": False,
                "message": "Anda harus login terlebih dahulu.",
            }), 401

        data = request.get_json() or {}

        service_id = data.get("service_id")
        data_pengajuan = data.get("data_pengajuan")

        if not service_id:
            return jsonify({
                "success": False,
                "message": "Service ID wajib diisi.",
            }), 400

        if not isinstance(data_pengajuan, dict):
            return jsonify({
                "success": False,
                "message": "Data pengajuan harus berupa object.",
            }), 400

        service = db.session.get(
            Service,
            service_id,
        )

        if not service:
            return jsonify({
                "success": False,
                "message": "Layanan tidak ditemukan.",
            }), 404

        if not service.aktif:
            return jsonify({
                "success": False,
                "message": "Layanan sedang tidak aktif.",
            }), 400

        # =====================================================
        # GENERATE NOMOR SURAT
        # =====================================================

        letter_prefix = get_letter_prefix(service)

        letter_sequence = None
        nomor_surat = None

        if letter_prefix:
            letter_sequence = generate_letter_number(
                letter_prefix
            )

            nomor_surat = build_letter_number(
                letter_prefix,
                letter_sequence
            )

        # =====================================================
        # CREATE APPLICATION
        # =====================================================

        application = Application(
            user_id=user_id,
            service_id=service.id,
            nomor_pengajuan="TEMP",
            nomor_surat=nomor_surat,
            status="menunggu",
            data_pengajuan=data_pengajuan,
        )

        db.session.add(application)

        # Dapatkan ID setelah INSERT
        db.session.flush()

        # Buat nomor pengajuan internal
        application.nomor_pengajuan = (
            f"FRD-{application.id:05d}"
        )

        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Pengajuan berhasil dibuat.",
            "data": application.to_dict(),
        }), 201

    except Exception as e:
        db.session.rollback()

        print(
            "CREATE APPLICATION ERROR:",
            e,
        )

        return jsonify({
            "success": False,
            "message": (
                "Terjadi kesalahan saat membuat pengajuan."
            ),
        }), 500

@app.route("/api/applications/my", methods=["GET"])
def get_my_applications():
    try:
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({
                "success": False,
                "message": "Anda harus login terlebih dahulu.",
            }), 401

        applications = (
            Application.query
            .filter_by(user_id=user_id)
            .order_by(
                Application.created_at.desc()
            )
            .all()
        )

        return jsonify({
            "success": True,
            "total": len(applications),
            "data": [
                application.to_dict()
                for application in applications
            ],
        })

    except Exception as e:
        print(
            "GET MY APPLICATIONS ERROR:",
            e,
        )

        return jsonify({
            "success": False,
            "message": "Gagal mengambil pengajuan.",
        }), 500

    # =========================================================
# GET ALL APPLICATIONS - ADMIN
# =========================================================

@app.route("/api/applications", methods=["GET"])
def get_all_applications():
    try:
        # Cek apakah user adalah admin
        user, error = require_admin()

        if error:
            return error

        applications = (
            Application.query
            .order_by(
                Application.created_at.desc()
            )
            .all()
        )

        return jsonify({
            "success": True,
            "total": len(applications),
            "data": [
                application.to_dict()
                for application in applications
            ],
        })

    except Exception as e:
        print(
            "GET ALL APPLICATIONS ERROR:",
            e,
        )

        return jsonify({
            "success": False,
            "message": (
                "Gagal mengambil seluruh pengajuan."
            ),
        }), 500
# =========================================================
# UPDATE APPLICATION STATUS - ADMIN
# =========================================================

@app.route(
    "/api/applications/<int:application_id>/status",
    methods=["PATCH"]
)
def update_application_status(application_id):
    try:
        # Cek apakah user adalah admin
        user, error = require_admin()

        if error:
            return error

        application = db.session.get(
            Application,
            application_id
        )

        if not application:
            return jsonify({
                "success": False,
                "message": "Pengajuan tidak ditemukan.",
            }), 404

        data = request.get_json() or {}

        status = data.get("status")
        catatan = data.get("catatan")

        allowed_statuses = [
            "menunggu",
            "diproses",
            "disetujui",
            "ditolak",
            "selesai",
        ]

        if status not in allowed_statuses:
            return jsonify({
                "success": False,
                "message": "Status pengajuan tidak valid.",
            }), 400

        application.status = status

        if catatan is not None:
            application.catatan = catatan

        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Status pengajuan berhasil diperbarui.",
            "data": application.to_dict(),
        })

    except Exception as e:
        db.session.rollback()

        print(
            "UPDATE APPLICATION STATUS ERROR:",
            e,
        )

        return jsonify({
            "success": False,
            "message": (
                "Gagal memperbarui status pengajuan."
            ),
        }), 500
    # =========================================================
# DOWNLOAD APPLICATION PDF
# =========================================================

@app.route(
    "/api/applications/<int:application_id>/pdf",
    methods=["GET"],
)
def download_application_pdf(application_id):
    try:
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({
                "success": False,
                "message": "Anda harus login terlebih dahulu.",
            }), 401

        application = db.session.get(
            Application,
            application_id,
        )

        if not application:
            return jsonify({
                "success": False,
                "message": "Pengajuan tidak ditemukan.",
            }), 404

        current_user = db.session.get(
            User,
            user_id,
        )

        if not current_user:
            return jsonify({
                "success": False,
                "message": "User tidak ditemukan.",
            }), 404

        # User hanya boleh download miliknya sendiri.
        # Admin boleh download semua.
        if (
            current_user.role != "admin"
            and application.user_id != user_id
        ):
            return jsonify({
                "success": False,
                "message": "Anda tidak memiliki akses ke surat ini.",
            }), 403

        # Surat hanya bisa diunduh jika selesai.
        if application.status != "selesai":
            return jsonify({
                "success": False,
                "message": (
                    "Surat belum dapat diunduh. "
                    "Pengajuan harus berstatus selesai."
                ),
            }), 400

        data = application.data_pengajuan or {}

        nama = data.get("name") or "-"
        nik = data.get("nik") or "-"
        kk = data.get("kk") or "-"
        phone = data.get("phone") or "-"
        address = data.get("address") or "-"
        purpose = data.get("purpose") or "-"
        notes = data.get("notes") or ""

        service_name = (
            application.service.nama_layanan
            if application.service
            else "Surat"
        )

        nomor_surat = (
            application.nomor_surat
            or application.nomor_pengajuan
        )

        letter_type = data.get(
            "letter_type",
            "",
        )

        title_map = {
            "ktp": "SURAT PENGANTAR KTP",
            "kk": "SURAT PENGANTAR KARTU KELUARGA",
            "skck": "SURAT PENGANTAR SKCK",
            "nikah": "SURAT PENGANTAR NIKAH",
            "sktm": "SURAT KETERANGAN TIDAK MAMPU",
            "lainnya": "SURAT PENGANTAR",
        }

        title = title_map.get(
            letter_type,
            service_name.upper(),
        )

        # =====================================================
        # PDF
        # =====================================================

        buffer = BytesIO()

        document = SimpleDocTemplate(
            buffer,
            pagesize=A4,
            rightMargin=2 * cm,
            leftMargin=2 * cm,
            topMargin=1.8 * cm,
            bottomMargin=1.8 * cm,
        )

        styles = getSampleStyleSheet()

        normal_style = styles["Normal"]
        normal_style.fontName = "Helvetica"
        normal_style.fontSize = 11
        normal_style.leading = 17

        center_style = styles["Normal"].clone(
            "center_style"
        )
        center_style.alignment = TA_CENTER
        center_style.fontSize = 11
        center_style.leading = 17

        title_style = styles["Title"].clone(
            "title_style"
        )
        title_style.alignment = TA_CENTER
        title_style.fontSize = 15
        title_style.leading = 20

        story = []

        # Header
        story.append(
            Paragraph(
                "<b>RUKUN TETANGGA 01 / RW 14</b>",
                title_style,
            )
        )

        story.append(
            Paragraph(
                "<b>SEKRETARIAT TAMAN FIRDAUS BLOK E NO. 72, TELP. 081310930862 </b>",
                center_style,
            )
        )

        story.append(Spacer(1, 10))

        story.append(
            Table(
                [[""]],
                colWidths=[17 * cm],
                rowHeights=[1],
                style=TableStyle([
                    (
                        "LINEABOVE",
                        (0, 0),
                        (-1, -1),
                        1,
                        colors.black,
                    ),
                ]),
            )
        )

        story.append(Spacer(1, 20))

        # Judul
        story.append(
            Paragraph(
                f"<b>{title}</b>",
                title_style,
            )
        )

        story.append(
            Paragraph(
                f"Nomor: <b>{nomor_surat}</b>",
                center_style,
            )
        )

        story.append(Spacer(1, 25))

        # Isi pembuka
        story.append(
            Paragraph(
                (
                    "Yang bertanda tangan di bawah ini, Ketua RT 01 "
                    "RW 14, menerangkan bahwa:"
                ),
                normal_style,
            )
        )

        story.append(Spacer(1, 12))

        # Data pemohon
        biodata = [
            ["Nama Lengkap", f": {nama}"],
            ["NIK", f": {nik}"],
            ["Nomor KK", f": {kk}"],
            ["Nomor WhatsApp", f": {phone}"],
            ["Alamat", f": {address}"],
        ]

        table = Table(
            biodata,
            colWidths=[
                4.2 * cm,
                12.3 * cm,
            ],
        )

        table.setStyle(
            TableStyle([
                (
                    "VALIGN",
                    (0, 0),
                    (-1, -1),
                    "TOP",
                ),
                (
                    "FONTNAME",
                    (0, 0),
                    (-1, -1),
                    "Helvetica",
                ),
                (
                    "FONTSIZE",
                    (0, 0),
                    (-1, -1),
                    11,
                ),
                (
                    "LEADING",
                    (0, 0),
                    (-1, -1),
                    17,
                ),
            ])
        )

        story.append(table)

        story.append(Spacer(1, 18))

        story.append(
            Paragraph(
                (
                    f"Surat ini dibuat untuk keperluan "
                    f"<b>{purpose}</b>."
                ),
                normal_style,
            )
        )

        if notes:
            story.append(Spacer(1, 10))

            story.append(
                Paragraph(
                    f"Catatan: {notes}",
                    normal_style,
                )
            )

        story.append(Spacer(1, 18))

        story.append(
            Paragraph(
                (
                    "Demikian surat ini dibuat dengan sebenar-"
                    "benarnya untuk dapat dipergunakan sebagaimana "
                    "mestinya."
                ),
                normal_style,
            )
        )

        # Tanggal
        now = datetime.now()

        month_names = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ]

        date_text = (
            f"{now.day} "
            f"{month_names[now.month - 1]} "
            f"{now.year}"
        )

        story.append(Spacer(1, 35))

        signature_table = Table(
        [
            [
                "",
                Paragraph(
                    f"RT 01 / RW 14<br/>{date_text}",
                    center_style,
                ),
            ],
            [
                Paragraph(
                    "Pemohon,",
                    center_style,
                ),
                Paragraph(
                    "Ketua RT 01,",
                    center_style,
                ),
            ],
            [
                Paragraph(
                    "<br/><br/>(____________________)",
                    center_style,
                ),
                Paragraph(
                    "<br/><br/>(____________________)",
                    center_style,
                ),
            ],
        ],
        colWidths=[
            8 * cm,
            8 * cm,
        ],
    )

        signature_table.setStyle(
            TableStyle([
                (
                    "ALIGN",
                    (0, 0),
                    (-1, -1),
                    "CENTER",
                ),
                (
                    "VALIGN",
                    (0, 0),
                    (-1, -1),
                    "TOP",
                ),
                (
                    "FONTNAME",
                    (0, 0),
                    (-1, -1),
                    "Helvetica",
                ),
                (
                    "FONTSIZE",
                    (0, 0),
                    (-1, -1),
                    11,
                ),
            ])
        )

        story.append(signature_table)

        document.build(story)

        buffer.seek(0)

        safe_number = (
            nomor_surat
            .replace("/", "-")
            .replace(" ", "_")
        )

        return send_file(
            buffer,
            mimetype="application/pdf",
            as_attachment=True,
            download_name=(
                f"{title.replace(' ', '_')}_"
                f"{safe_number}.pdf"
            ),
        )

    except Exception as error:
        print(
            "DOWNLOAD PDF ERROR:",
            error,
        )

        return jsonify({
            "success": False,
            "message": "Gagal membuat surat PDF.",
        }), 500
# =========================================================
# ROUTE HOME
# =========================================================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "success": True,
        "message": "Backend Firdaus RT 01 berhasil berjalan!"
    })


# =========================================================
# HEALTH CHECK
# =========================================================

@app.route("/api/health", methods=["GET"])
def health():
    try:
        db.session.execute(
            db.text("SELECT 1")
        )

        return jsonify({
            "success": True,
            "status": "healthy",
            "database": "connected",
            "service": "Firdaus RT 01 API"
        })

    except Exception as error:
        return jsonify({
            "success": False,
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(error)
        }), 500


# =========================================================
# GET SERVICES
# =========================================================

@app.route("/api/services", methods=["GET"])
def get_services():

    services = (
        Service.query
        .filter_by(aktif=True)
        .order_by(Service.id.asc())
        .all()
    )

    return jsonify({
        "success": True,
        "total": len(services),
        "data": [
            service.to_dict()
            for service in services
        ]
    })
# =========================================================
# CREATE SERVICE
# =========================================================

@app.route("/api/services", methods=["POST"])
def create_service():
    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Data tidak ditemukan."
        }), 400

    kategori = data.get("kategori")
    nama_layanan = data.get("nama_layanan")
    slug = data.get("slug")
    deskripsi = data.get("deskripsi")

    if not kategori or not nama_layanan or not slug:
        return jsonify({
            "success": False,
            "message": "Kategori, nama layanan, dan slug wajib diisi."
        }), 400

    existing_service = Service.query.filter_by(
        slug=slug
    ).first()

    if existing_service:
        return jsonify({
            "success": False,
            "message": "Slug layanan sudah digunakan."
        }), 409

    service = Service(
        kategori=kategori,
        nama_layanan=nama_layanan,
        slug=slug,
        deskripsi=deskripsi,
        aktif=True
    )

    db.session.add(service)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Layanan berhasil ditambahkan.",
        "data": service.to_dict()
    }), 201


# =========================================================
# UPDATE SERVICE
# =========================================================

@app.route("/api/services/<int:service_id>", methods=["PUT"])
def update_service(service_id):

    service = db.session.get(
        Service,
        service_id
    )

    if not service:
        return jsonify({
            "success": False,
            "message": "Layanan tidak ditemukan."
        }), 404

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Data tidak ditemukan."
        }), 400

    kategori = data.get("kategori")
    nama_layanan = data.get("nama_layanan")
    slug = data.get("slug")
    deskripsi = data.get("deskripsi")
    aktif = data.get("aktif")

    if kategori:
        service.kategori = kategori

    if nama_layanan:
        service.nama_layanan = nama_layanan

    if slug:
        existing_service = (
            Service.query
            .filter(
                Service.slug == slug,
                Service.id != service_id
            )
            .first()
        )

        if existing_service:
            return jsonify({
                "success": False,
                "message": "Slug layanan sudah digunakan."
            }), 409

        service.slug = slug

    if deskripsi is not None:
        service.deskripsi = deskripsi

    if aktif is not None:
        service.aktif = bool(aktif)

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Layanan berhasil diperbarui.",
        "data": service.to_dict()
    })


# =========================================================
# DELETE SERVICE
# =========================================================

@app.route("/api/services/<int:service_id>", methods=["DELETE"])
def delete_service(service_id):

    service = db.session.get(
        Service,
        service_id
    )

    if not service:
        return jsonify({
            "success": False,
            "message": "Layanan tidak ditemukan."
        }), 404

    # Cek apakah layanan sudah pernah digunakan
    submission_count = db.session.execute(
        db.text(
            "SELECT COUNT(*) FROM submissions "
            "WHERE service_id = :service_id"
        ),
        {
            "service_id": service_id
        }
    ).scalar()

    if submission_count and submission_count > 0:
        return jsonify({
            "success": False,
            "message": (
                "Layanan tidak dapat dihapus karena "
                "sudah digunakan dalam pengajuan. "
                "Silakan nonaktifkan layanan."
            )
        }), 409

    db.session.delete(service)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Layanan berhasil dihapus."
    })


# =========================================================
# TOGGLE SERVICE STATUS
# =========================================================

@app.route("/api/services/<int:service_id>/toggle", methods=["PATCH"])
def toggle_service(service_id):

    service = db.session.get(
        Service,
        service_id
    )

    if not service:
        return jsonify({
            "success": False,
            "message": "Layanan tidak ditemukan."
        }), 404

    service.aktif = not service.aktif

    db.session.commit()

    return jsonify({
        "success": True,
        "message": (
            "Layanan diaktifkan."
            if service.aktif
            else "Layanan dinonaktifkan."
        ),
        "data": service.to_dict()
    })
# =========================================================
# GET RESIDENTS
# =========================================================

@app.route("/api/residents", methods=["GET"])
def get_residents():
    try:
        result = db.session.execute(
            text("""
                SELECT
                    id,
                    user_id,
                    nik,
                    no_kk,
                    nama_lengkap,
                    tempat_lahir,
                    tanggal_lahir,
                    jenis_kelamin,
                    alamat,
                    rt,
                    rw,
                    no_hp,
                    status_warga,
                    created_at,
                    updated_at
                FROM residents
                ORDER BY nama_lengkap ASC
            """)
        )

        residents = []

        for row in result.mappings():
            resident = dict(row)

            if resident["tanggal_lahir"]:
                resident["tanggal_lahir"] = (
                    resident["tanggal_lahir"].isoformat()
                )

            if resident["created_at"]:
                resident["created_at"] = (
                    resident["created_at"].isoformat()
                )

            if resident["updated_at"]:
                resident["updated_at"] = (
                    resident["updated_at"].isoformat()
                )

            residents.append(resident)

        return jsonify({
            "success": True,
            "total": len(residents),
            "data": residents
        })

    except Exception as e:
        db.session.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500
# =========================================================
# CREATE RESIDENT
# =========================================================

@app.route("/api/residents", methods=["POST"])
def create_resident():
    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "Data warga tidak ditemukan."
            }), 400

        nik = data.get("nik")
        nama_lengkap = data.get("nama_lengkap")

        if not nik:
            return jsonify({
                "success": False,
                "message": "NIK wajib diisi."
            }), 400

        if not nama_lengkap:
            return jsonify({
                "success": False,
                "message": "Nama lengkap wajib diisi."
            }), 400

        # Cek NIK agar tidak duplikat
        existing = db.session.execute(
            text("""
                SELECT id
                FROM residents
                WHERE nik = :nik
                LIMIT 1
            """),
            {
                "nik": nik
            }
        ).first()

        if existing:
            return jsonify({
                "success": False,
                "message": "NIK sudah terdaftar."
            }), 409

        result = db.session.execute(
            text("""
                INSERT INTO residents (
                    user_id,
                    nik,
                    no_kk,
                    nama_lengkap,
                    tempat_lahir,
                    tanggal_lahir,
                    jenis_kelamin,
                    alamat,
                    rt,
                    rw,
                    no_hp,
                    status_warga
                )
                VALUES (
                    :user_id,
                    :nik,
                    :no_kk,
                    :nama_lengkap,
                    :tempat_lahir,
                    :tanggal_lahir,
                    :jenis_kelamin,
                    :alamat,
                    :rt,
                    :rw,
                    :no_hp,
                    :status_warga
                )
            """),
            {
                "user_id": data.get("user_id"),
                "nik": nik,
                "no_kk": data.get("no_kk"),
                "nama_lengkap": nama_lengkap,
                "tempat_lahir": data.get("tempat_lahir"),
                "tanggal_lahir": data.get("tanggal_lahir") or None,
                "jenis_kelamin": data.get("jenis_kelamin") or None,
                "alamat": data.get("alamat"),
                "rt": data.get("rt") or "01",
                "rw": data.get("rw"),
                "no_hp": data.get("no_hp"),
                "status_warga": data.get("status_warga") or "tetap"
            }
        )

        db.session.commit()

        resident_id = result.lastrowid

        return jsonify({
            "success": True,
            "message": "Data warga berhasil ditambahkan.",
            "id": resident_id
        }), 201

    except Exception as e:
        db.session.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500
    # =========================================================
# UPDATE RESIDENT
# =========================================================

@app.route("/api/residents/<int:resident_id>", methods=["PUT"])
def update_resident(resident_id):
    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "Data tidak ditemukan."
            }), 400

        # Cek warga
        existing = db.session.execute(
            text("""
                SELECT id
                FROM residents
                WHERE id = :id
                LIMIT 1
            """),
            {
                "id": resident_id
            }
        ).first()

        if not existing:
            return jsonify({
                "success": False,
                "message": "Data warga tidak ditemukan."
            }), 404

        nik = data.get("nik")
        nama_lengkap = data.get("nama_lengkap")

        if not nik:
            return jsonify({
                "success": False,
                "message": "NIK wajib diisi."
            }), 400

        if not nama_lengkap:
            return jsonify({
                "success": False,
                "message": "Nama lengkap wajib diisi."
            }), 400

        # Cek NIK milik warga lain
        duplicate = db.session.execute(
            text("""
                SELECT id
                FROM residents
                WHERE nik = :nik
                AND id != :id
                LIMIT 1
            """),
            {
                "nik": nik,
                "id": resident_id
            }
        ).first()

        if duplicate:
            return jsonify({
                "success": False,
                "message": "NIK sudah digunakan oleh warga lain."
            }), 409

        db.session.execute(
            text("""
                UPDATE residents
                SET
                    user_id = :user_id,
                    nik = :nik,
                    no_kk = :no_kk,
                    nama_lengkap = :nama_lengkap,
                    tempat_lahir = :tempat_lahir,
                    tanggal_lahir = :tanggal_lahir,
                    jenis_kelamin = :jenis_kelamin,
                    alamat = :alamat,
                    rt = :rt,
                    rw = :rw,
                    no_hp = :no_hp,
                    status_warga = :status_warga
                WHERE id = :id
            """),
            {
                "id": resident_id,
                "user_id": data.get("user_id"),
                "nik": nik,
                "no_kk": data.get("no_kk"),
                "nama_lengkap": nama_lengkap,
                "tempat_lahir": data.get("tempat_lahir"),
                "tanggal_lahir": data.get("tanggal_lahir") or None,
                "jenis_kelamin": data.get("jenis_kelamin") or None,
                "alamat": data.get("alamat"),
                "rt": data.get("rt") or "01",
                "rw": data.get("rw"),
                "no_hp": data.get("no_hp"),
                "status_warga": data.get("status_warga") or "tetap"
            }
        )

        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Data warga berhasil diperbarui."
        })

    except Exception as e:
        db.session.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500
    # =========================================================
# DELETE RESIDENT
# =========================================================

@app.route("/api/residents/<int:resident_id>", methods=["DELETE"])
def delete_resident(resident_id):
    try:
        existing = db.session.execute(
            text("""
                SELECT id
                FROM residents
                WHERE id = :id
                LIMIT 1
            """),
            {
                "id": resident_id
            }
        ).first()

        if not existing:
            return jsonify({
                "success": False,
                "message": "Data warga tidak ditemukan."
            }), 404

        db.session.execute(
            text("""
                DELETE FROM residents
                WHERE id = :id
            """),
            {
                "id": resident_id
            }
        )

        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Data warga berhasil dihapus."
        })

    except Exception as e:
        db.session.rollback()

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500
    # =========================================================
# GOOGLE AUTHENTICATION
# =========================================================

@app.route("/api/auth/google", methods=["POST"])
def google_login():
    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "Data login tidak ditemukan."
            }), 400

        credential = data.get("credential")

        if not credential:
            return jsonify({
                "success": False,
                "message": "Google credential tidak ditemukan."
            }), 400

        # -------------------------------------------------
        # Verifikasi ID Token Google
        # -------------------------------------------------

        idinfo = id_token.verify_oauth2_token(
            credential,
            google_requests.Request(),
            google_client_id
        )

        # -------------------------------------------------
        # Ambil informasi akun Google
        # -------------------------------------------------

        google_id = idinfo.get("sub")
        email = idinfo.get("email")
        name = idinfo.get("name")
        photo_url = idinfo.get("picture")

        if not google_id or not email:
            return jsonify({
                "success": False,
                "message": "Data akun Google tidak lengkap."
            }), 400

        # -------------------------------------------------
        # Cari user berdasarkan Google ID
        # -------------------------------------------------

        result = db.session.execute(
            text("""
                SELECT
                    id,
                    google_id,
                    name,
                    email,
                    photo_url,
                    role
                FROM users
                WHERE google_id = :google_id
                LIMIT 1
            """),
            {
                "google_id": google_id
            }
        )

        user = result.mappings().first()

        # -------------------------------------------------
        # Kalau Google ID belum ada
        # -------------------------------------------------

        if not user:

            # Cari berdasarkan email
            result = db.session.execute(
                text("""
                    SELECT
                        id,
                        google_id,
                        name,
                        email,
                        photo_url,
                        role
                    FROM users
                    WHERE email = :email
                    LIMIT 1
                """),
                {
                    "email": email
                }
            )

            user = result.mappings().first()

        # -------------------------------------------------
        # USER SUDAH ADA
        # -------------------------------------------------

        if user:

            user_id = user["id"]

            db.session.execute(
                text("""
                    UPDATE users
                    SET
                        google_id = :google_id,
                        name = :name,
                        email = :email,
                        photo_url = :photo_url,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = :id
                """),
                {
                    "google_id": google_id,
                    "name": name,
                    "email": email,
                    "photo_url": photo_url,
                    "id": user_id
                }
            )

            db.session.commit()

            # Ambil data terbaru
            result = db.session.execute(
                text("""
                    SELECT
                        id,
                        google_id,
                        name,
                        email,
                        photo_url,
                        role
                    FROM users
                    WHERE id = :id
                    LIMIT 1
                """),
                {
                    "id": user_id
                }
            )

            user = result.mappings().first()

        # -------------------------------------------------
        # USER BARU
        # -------------------------------------------------

        else:

            result = db.session.execute(
                text("""
                    INSERT INTO users (
                        google_id,
                        name,
                        email,
                        photo_url,
                        role
                    )
                    VALUES (
                        :google_id,
                        :name,
                        :email,
                        :photo_url,
                        'user'
                    )
                """),
                {
                    "google_id": google_id,
                    "name": name,
                    "email": email,
                    "photo_url": photo_url
                }
            )

            db.session.commit()

            user_id = result.lastrowid

            result = db.session.execute(
                text("""
                    SELECT
                        id,
                        google_id,
                        name,
                        email,
                        photo_url,
                        role
                    FROM users
                    WHERE id = :id
                    LIMIT 1
                """),
                {
                    "id": user_id
                }
            )

            user = result.mappings().first()

        # -------------------------------------------------
        # Simpan user ke session Flask
        # -------------------------------------------------

        session["user_id"] = user["id"]
        session["role"] = user["role"]

        return jsonify({
            "success": True,
            "message": "Login Google berhasil.",
            "user": {
                "id": user["id"],
                "google_id": user["google_id"],
                "name": user["name"],
                "email": user["email"],
                "photo_url": user["photo_url"],
                "role": user["role"]
            }
        })

    except ValueError:
        return jsonify({
            "success": False,
            "message": "Google ID token tidak valid atau sudah kedaluwarsa."
        }), 401

    except Exception as error:

        db.session.rollback()

        print("GOOGLE LOGIN ERROR:", error)

        return jsonify({
            "success": False,
            "message": "Terjadi kesalahan pada proses login."
        }), 500

# =========================================================
# CURRENT USER
# =========================================================

@app.route("/api/auth/me", methods=["GET"])
def get_current_user():

    user_id = session.get("user_id")

    if not user_id:
        return jsonify({
            "success": False,
            "authenticated": False,
            "user": None
        }), 401

    try:
        result = db.session.execute(
            text("""
                SELECT
                    id,
                    google_id,
                    name,
                    email,
                    photo_url,
                    role
                FROM users
                WHERE id = :id
                LIMIT 1
            """),
            {
                "id": user_id
            }
        )

        user = result.mappings().first()

        if not user:
            session.clear()

            return jsonify({
                "success": False,
                "authenticated": False,
                "user": None
            }), 401

        return jsonify({
            "success": True,
            "authenticated": True,
            "user": {
                "id": user["id"],
                "google_id": user["google_id"],
                "name": user["name"],
                "email": user["email"],
                "photo_url": user["photo_url"],
                "role": user["role"]
            }
        })

    except Exception as error:

        print(
            "AUTH ME ERROR:",
            error
        )

        return jsonify({
            "success": False,
            "message": "Gagal mengambil data pengguna."
        }), 500
# =========================================================
# LOGOUT
# =========================================================

@app.route("/api/auth/logout", methods=["POST"])
def logout():

    session.clear()

    return jsonify({
        "success": True,
        "message": "Logout berhasil."
    })

# =========================================================
# RUN SERVER
# =========================================================

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )