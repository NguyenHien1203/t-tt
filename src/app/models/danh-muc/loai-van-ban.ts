export interface LoaiVanBan {
    id?: number,
    maLoaiVB?: string,
    tenLoaiVB?: string,
    thuTu?: number,
    hienThi?: boolean,
    phanLoai?: number,
    ghiChu?: string,
    donViId?: number,
    created?: string,
    createdBy?: number,
    lastModified?: string,
    lastModifiedBy?: number
}

export interface TimKiemLoaiVanBan {
    keyWord: string,
    nam: number,
    ma: string,
    phanLoai: number,
    timChinhXac: number,
}
