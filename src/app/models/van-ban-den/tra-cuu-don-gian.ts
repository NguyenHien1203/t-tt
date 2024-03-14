export interface TraCuuDonGian {
}


export interface TimKiemDanhSach {
    keyWord?: string,
    nam?: number,
    idloaivb?: number,
    thang?: number,
    donViId?: number
    phongBanId?: number
    userId?: number
    timChinhXac?: number
}

export interface VbPhaiBaoCao {
    donViId?: number,
    thang?: number,
    nam?: number,
    trangThai?: number,
    NgayGuiVanBan?: string,
    NgayBanHanhVanBan?: string,
    keyWord?: string,
    idCQBH?: number,
    iTimChinhXac?: number
}