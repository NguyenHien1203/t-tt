export interface GuiVanBan {
}

export interface TimKiemDanhSachGuiVanBan {
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

  export interface TimKiemDanhSachVanBan{
      soKyHieu? : string,
      trichYeu? : string ,
      donViId? : string 
  }
