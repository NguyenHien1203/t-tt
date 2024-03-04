interface InventoryStatus {
    label: string;
    value: string;
}
export interface LoaiHoSo {
    id?: number,
    tenLoaiHoSo?: string,
    moTa?: string,
    donViId?: number,
    phanLoai?: number,
    soHshienTai?: number,
    soHstruoc?: number,
    maHs?: string,
    thuTu?: number,
    hienThi?: true,
    ghiChu?: string,
    phongBanId?: number,
    linhVucId?: number,
    linhVucChaId?: number,
    created?: string,
    createdBy?: number,
    lastModified?: string,
    lastModifiedBy?: number
}

export interface TimKiemLoaiHoSo {
    keyWord: string;
    ma: string;
    timChinhXac: number
}
