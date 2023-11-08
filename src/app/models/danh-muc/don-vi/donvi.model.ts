export interface DmDonVi{
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

export class  TimKiemModel {
    MaDonVi?: string;
    TenDonVi?: string;
    chkTimChinhXac?: number;
}