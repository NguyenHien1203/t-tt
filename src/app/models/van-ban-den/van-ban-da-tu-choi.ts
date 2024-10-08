export interface TraCuuNangCao {
}


export interface TimKiemDanhSachVBTC{
      keyWord?: string,
    soVanBanId?: number,
    vanBanId?: number,
    donViId?: number,
    mucDo?: number,
    loaiVanBanId?: number,
    lanhDaoKy?: string,
    ngayGuiTuNgay?: string,
    ngayGuiDenNgay?: string,
    banHanhTuNgay?: string,
    banHanhDenNgay?: string,
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


export interface TimKiemDanhSachVTC{
  keyWord?: string,
  donViId?: number,
  NgayNhanVanBan?: string,
  ngayBanHanh?: string,
  nam?: number,
  thang?: number,
  soKyHieu?: string,
  trichYeu?: string,
  timChinhXac? : number,
}