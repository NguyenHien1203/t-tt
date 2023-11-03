interface InventoryStatus {
    label: string;
    value: string;
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
    IdNhomQuyen: string;
    TenDonVi: string;
    TenNhomQuyen: string;
}


export interface TaiKhoan {
    id?: string;
    tenDangNhap?: string;
    hoVaTen?: string;
    gioiTinh?: string;
    matKhau?: string;
    email?: string;
    donViId?: string;
    phongBanId?:string;
    nhomQuyenId?:string;
    chucDanhId?:string;
    sdtNhaRieng?:string;
    sdtCoQuan?:string;
    sdtDiDong?:string;
}

