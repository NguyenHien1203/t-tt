export interface DmPhongBan{
    id: number,
    maDonVi: string,
    tenDonVi: string,
    parentId: number,
    maDinhDanh: string,
    ngayTruyenThong: Date,
    TenDonviChuQuan: string,
    phanLoai: number,
    diaChi: string,
    ghiChu: string,
    sdt: string,
    fax: string,
    website: string,
    email: string,
    uRL: string,
    thuTu: number,
    trangThai: boolean,
    tenDonViTrenTruc: string,
}

export interface DmPhongBan{
    
}

export class  TimKiemModel {
    MaPhongBan?: string;
    TenPhongBan?: string;
    DonViId?: number;
    chkTimChinhXac?: number;
}