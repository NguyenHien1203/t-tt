export interface LienKet {
    "id": number,
    "tenLienKet": string,
    "tenHienThi": string,
    "ghiChu": string,
    "hienThi": boolean,
    "dmLienKetId": number,
    "donViId": number,
    "urlLink": string,
    "thuTu": number
}

export interface TimKiemDanhSach {
    "keyWord": string,
    "nam": number,
    "tuNgay": Date,
    "denNgay": Date
}
