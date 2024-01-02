export interface TimKiemTuan {
    tuan?: number,
    nam?: number,
    ngayBatDau?: string,
    ngayKetThuc?: string,
    tuKhoa?: string,
    soKyHieu?: string,
    trangThai?: string,
    timChinhXac?: number,
    caNhanLienQuan?: string,
    tatCaCongViec?: string,
    idUser?: string,
    idNhomQuyen?: string,
}

export interface TimKiemNam_Thang {
    noiDung?: string,
    soKyHieu?: string,
    caNhanLienQuan?: string,
    timChinhXac?: number,
    nam?: number,
    thang?: number,
    trangThai?: string,
    tatCaCongViec?: string,
    idUser?: string,
    idNhomQuyen?: string,
}