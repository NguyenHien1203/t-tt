export interface SoVanBan {
    id?: number,
    tenSo?: string,
    maSo?: string,
    loai?: number,
    soDiDenHt?: number,
    soDiDenTruoc?: number,
    thuTu?: number,
    phongBanId?: number,
    donViId?: number,
    created?: string,
    createdBy?: number,
    lastModified?: string,
    lastModifiedBy?: number
}

export interface TimKiemSoVanBan {
    keyWord: string;
    nam: 0;
    ma: string,
    phanLoai: number,
    timChinhXac: number,
}
