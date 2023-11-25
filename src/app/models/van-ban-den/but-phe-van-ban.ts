export interface TimKiemDanhSach {
    thongtinvb?: string,
    nam?: number,
    thang?: string,
    sokihieu?: string,
    sovanbanid?: string,
    ngaybanhanh?: string,
    ngaynhan?: string,
    loaivbid?: string,
    soden?: string,
    tencqbh?: string,
    trichyeu?: string,
    DonViLamViec?: string,
    phongbanlamviecid?: string
}

export interface DoiTuongPhanCong {
    HoTen?: string,
    Value?: string,
    ChiDao: boolean,
    ChuTri: boolean,
    PhoiHop: boolean,
    ThongBao: boolean,
    SMS: boolean,
    VBTL: boolean,
}