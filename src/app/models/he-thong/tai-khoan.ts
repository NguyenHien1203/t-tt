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
    TrangThai?: InventoryStatus;
}