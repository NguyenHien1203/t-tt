interface InventoryStatus {
    label: string,
    value: string
}

export interface PhongBan {
    id?: number,
    tenDonVi?: string,
    parentId?: number,
    cap?: number,
    diaChi?: string,
    sdt?: string,
    fax?: string,
    ghiChu?: string,
    dbname?: string,
    url?: string,
    email?: string,
    maDonVi?: string,
    duongDanAnh?: string,
    trangThai?: true,
    thuTu?: number,
    website?: string,
    ngayTruyenThong?: string,
    phanLoai?: number,
    maPhanCap?: number,
    maDvpc?: string,
    maDinhDanh?: string,
    dangKyLienThong?: true,
    tenDonViTrenTruc?: string,
    created?: string,
    createdBy?: number,
    lastModified?: string,
    lastModifiedBy?: number,
    isPhongBan?: number
}
