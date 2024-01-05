export interface DashBoard {}

export interface TimKiemCongViecDashBoard {
    idNhomQuyen?: number;
    idUser?: number;
    idPhongBan?: number;
    tuNgay?: string;
    denNgay?: string;
}

export interface TimKiemLichCoQuanDashBoard {
    idDonVi?: string;
    firstDayOfWeek?: string;
}

export interface TimKiemThongKeThongTin {
    idUser?: string;
    idPhongBan?: string;
    idNhomQuyen?: string;
    idDonViLamViec?: string;
}
