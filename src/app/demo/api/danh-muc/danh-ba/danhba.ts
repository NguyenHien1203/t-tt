export interface DmDanhBa {
    id: number,
    hoTen?: string,
    tenDonVi?: string,
    tenChucDanh?: string,
    donViId: number,
    tenPhongBan: string,
    soDienThoaiCoQuan: string,
    soDienThoaiDiDong: string,
}

export class  TimKiemModel {
    keyWord?: string;
    phongBanId?: number;
    donviId?: number;
}