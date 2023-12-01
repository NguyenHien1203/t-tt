export interface QuanLyThamDoYKien {
    id?: number;
    noiDung?: string;
    donViId?: number;
    thuTu?: number;
    hienThi?: boolean;
}

export interface TimKiemQuanLyThamDoYKien {
    noiDung?: string;
    donViId?: number;
    timChinhXac?: number;
}

export interface CauTraLoiThamDo {
    id?: number;
    noiDung?: string;
    ThuTuHienThiCauHoi?: number;
    hienThi?: boolean;
    cauHoiId?: number;
}
