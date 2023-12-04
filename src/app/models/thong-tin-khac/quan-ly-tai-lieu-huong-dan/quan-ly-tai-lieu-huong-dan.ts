export interface QuanLyTaiLieuHuongDan {
    id?: number,
    tieuDe?: string,
    donViId?: number,
    tenDonVi?: string,
}

export interface TimKiemQuanLyTaiLieuHuongDan {
    keyWord?: string,
    donViId?: number,
    timChinhXac?: number,
}

export interface ChiTietTaiLieuHuongDan {
    id?: number,
    tieuDe?: string,
    donViId?: number,
    fileName?: string,
    noiDung?: string,
    tenDonVi?: string,
    ngayTao?: string,
}
