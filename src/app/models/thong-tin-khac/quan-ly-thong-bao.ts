export interface QuanLyThongBao {
}


export interface TimKiemDanhSach{
    keyWord? : string,
    trangThai? : number,
    hienThi? : number,
    donViId? : number,
    tuNgay? : string,
    denNgay? : string,
    isHieuLuc : number,
    timChinhXac? : number
}

export interface FileModel{
    fileModel : File,
    id : string
}

export interface PhongBanModel{
    id? : number,
    tenDonVi? : string
}