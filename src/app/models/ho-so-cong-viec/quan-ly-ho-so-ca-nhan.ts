export interface QuanLyHoSoCaNhan {}

export interface TimKiemQuanLyHoSoCaNhan {
    keyWord?: string;
    nam?: number;
    thang?: number;
    loaiHoSo?: number;
    trangThai?: number;
    timChinhXac?: number;
    userId?: number;
}

export interface TimKiemVanBanDinhKem {
    keyWord?: string;
    nam?: number;
    thang?: number;
    loaiDiDen?: number;
    donViId?: number;
    phongBanId?: number;
    userId?: number;
}

export interface TimKiemCongViecDinhKem {
      keyWord?: string,
      nam?: number,
      thang?: number,
      userId?: number,
      trangThai?: number,
      donViId?: number,
      phongBanId?: number,
      vaiTro?: number,
      nhomQuyenId?: number,
}

export interface TimKiemPhieuTrinhDinhKem {
      keyWord?: '',
      ngayTrinh?: string,
      trangThai?: 4,
      userId?: number,
      donViId?: number,
      phongBanId?: number,
      timChinhXac?: number,
}
