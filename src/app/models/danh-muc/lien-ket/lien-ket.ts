export interface LienKet {
    id?: number,
    tenLienKet?: string,
    tenHienThi?: string,
    ghiChu?: string,
    hienThi?: boolean,
    dmLienKetId?: number,
    donViId?: number,
    urlLink?: string,
    thuTu?: number
}

export interface TimKiemDanhSachLienKet {
    keyWord?: string,
    nam?: number,
    tuNgay?: Date,
    denNgay?: Date
}
