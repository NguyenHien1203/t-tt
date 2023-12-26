export interface NhomTaiKhoanPhongBan {}

export interface TimKiemNhomTaiKhoan {
    keyWord?: string;
    moTa?: string;
    phongBanId?: number;
    donViId?: number;
    phanLoai?: number;
    userId?: number;
    timChinhXac?: number;
}

export const phanLoaiNhomDonVi = {
    phongBan: 3,
    donVi: 2,
    chung: 1,
    caNhan: 4,
};
