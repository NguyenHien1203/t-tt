export interface CapNhatMoi {
}

export interface TimKiemDanhSachCapNhatMoi {
    keyWord?: string,
    soVanBanId?: number,
    vanBanId?: number,
    donViId?: number,
    mucDo?: number,
    loaiVanBanId?: number,
    lanhDaoKy?: string,
    ngayGuiVanBan?: string,
    ngayBanHanhVanBan?: string,
    nam?: number,
    thang?: number,
    trangThai?: number,
    soKyHieu?: string,
    lanhDaoKyId?: number,
    soDi?: number,
    pageIndex?: number,
    pageSize?: number,
    trichYeu?: string,
    timChinhXac? : number
}

export interface SoVanBan{

}

export interface LoaiVanBan{

}

export interface TimKiemDanhSachVanBan{
    soKyHieu? : string,
    trichYeu? : string ,
    donViId? : string 
}

export class HangSo {
    formChiTiet = 1;
}