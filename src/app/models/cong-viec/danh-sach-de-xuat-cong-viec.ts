export interface GiaoCongViec {
    id?: number,
    idNguoiBanGiao?: number,
    idNguoiNhanBanGiao?: number,
    ngayBanGiao?: Date,
    noiDung?: string,
}

export interface TimKiemDanhSachDXCV {
    nguoiBanGiao?: string,
    nguoiNhanBanGiao?: string,
    keyWord?: string,
    tuNgay?: string,
    denngay?: string,
    userId?: number
    timChinhXac?: number
}

export interface TimKiemHSCV {
    keyWord?: string,
    nam? : number;
    thang? : number;
    maHS?: string,
    tieude?: string,
    nguoiLap?: number,
    donVi?: number,
    loaihs?: number,
    phongban?: number,
    trangthai?: number,
    mahs_pb?: string,
    hoso?: string,
    linhvucid?: number,
    timChinhXacSearch?: number 
}
