import { NhomDonVi } from './../danh-muc/nhom-don-vi/nhom-don-vi';
export interface QuanTriVanBanDi {
    soKiHieu?: string,
    trichYeu?: string,
    soDi?: number,
    ngayBanHanh?: string,
    loaiVBNghiepVu?: string,
    trangThai?: string,
    trangThaiGui?: string,
    dieuKienGui?: string,
    coQuanBH?: string,
    maDinhDanhVB?: string,
    mucDo?: string,
    noiNhanGui?: string,
    soDiDen?: number,
    soDiDenCustom?: string,
    tenLoaiVb?: string,
    tenSoVB?: string,
    ngayNhanGui?: string,
    soBanPhatHanh?: number,
    soHienTai?: string,
}

export interface TimKiemVBDi {
    keyWord?: string,
    soKyHieu?: string,
    nam?: number,
    thang?: number,
    timChinhXac?: number,
    ngayBanHanh?: string,
    ngayGui?: string,
    trichYeu?: string,
    trangThai?: number,
    mucDo?: number,
    soDi?: number,
    soVanBanId?: number,
    donViId?: number,
    loaiVanBanId?: number,
    vanBanId?: number,
}

export interface VanBanNhanGui {
    loaiVanBanDiDen?: number,
    publicNoiDung?: number,
    checkCapNhat?: number,
    trangThaiId?: number,
    trichYeu?: string,
    noiNhanGui?: string,
}

export interface VBIDPL {
    userId?: number,
    nhomDonVi?: number,
    donViId?: number,
    phongBanId?: number,
    trangThaiId?: number,
    phanLoai?: number,
    ten?: string;
    tenPhongBan?: string,
    thuTu?: number,
    loaiVbDiDen?: number,
}

export interface VBIDPLoaiCoBC {
    userId?: number,
    nhomDonVi?: number,
    donViId?: number,
    phongBanId?: number,
    trangThaiId?: number,
    phanLoai?: number,
    ten?: string;
    tenPhongBan?: string,
    thuTu?: number,
    loaiVbDiDen?: number,
}

export interface VBIDPLoaiKoBC {
    userId?: number,
    nhomDonVi?: number,
    donViId?: number,
    phongBanId?: number,
    trangThaiId?: number,
    phanLoai?: number,
    ten?: string;
    tenPhongBan?: string,
    thuTu?: number,
    loaiVbDiDen?: number,
}

export interface VBIDPLoaiCN {
    userId?: number,
    nhomDonVi?: number,
    donViId?: number,
    phongBanId?: number,
    trangThaiId?: number,
    phanLoai?: number,
    ten?: string;
    tenPhongBan?: string,
    thuTu?: number,
    loaiVbDiDen?: number,
}

