interface InventoryStatus {
    label: string;
    value: string;
}
export interface TaiKhoan {
    id?: number;
    TenDangNhap?: string;
    HoTen?: string;
    PhongBan?: string;
    ChucDanh?: number;
    TrangThai?: string;
}
export interface TaiKhoanTimKiem {
    id?: number;
    TuKhoa: string;
    TenPhongBan: string;
    TenChucDanh: string
}

export interface DonViThucHien {
    id?: string;
    IdDonVi: string;
    IdPhongBan: string;
    TenDonVi: string;
    TenPhongBan: string;
}

