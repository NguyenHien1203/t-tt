export interface QuanTriVanBanDen {
    soKyHieu?: string,
    trichYeu?: string,
    soDi?: number,
    ngayBanHanh?: string,
    loaiVBNghiepVu?: string,
    trangThaiId?: string,
    TenTrangThai?: string,
    trangThaiGui?: string,
    dieuKienGui?: string,
}

export class TimKiemModel {
    trangthai? : number;
    nam? : number;
    thang? : number;
    sokihieu? : string;
    TimChinhXac? : number;
    idsovb? : number;
    idloaivb? : number;
    ngtn? : Date;
    ngdn? : Date;
    bhtn? : Date;
    bhdn? : Date;
    sodiden? : number;
    cqbh? : string;
    cqbhid? : number;
    trichyeu? : string;
    ky? : string;
    vbdiden? : number;
    iddonvi? : number;
    ItemId? : number;
    mucdo? : number;
    soan? : string;
    ghichu? : string;
    vanban? : string;
    iPhanLoaiDV? : number;
    cap? : number;
    donViId?: number;
}