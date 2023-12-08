export interface XuLyCongViec {
    soKiHieu?: string;
    trichYeu?: string;
    noiDungCongViec?: string;
    nguoiXuLy?: string;
    tuNgay?: Date;
    denNgay?: Date;
    thoiHanHoanThanh?: Date;
    trangThaiDeXuat?: string;
    chiDao?: string;
    chuTri?: string;
    lstDongChiPhoiHop?: listDongChiCusTom[];
    lstDongChiThongBao?: listDongChiCusTom[];
    countDongChiThongBao?: number;
    countDongChiPhoiHop?: number;
    ngayXuLy?: Date;
    noiDungXuLy?: string;
    trangThaiXuLy?: string;
    fileDinhKem?: string;
    lstVanBanBaoCao?: [];
}

export interface ThongTinNguoiXuLy {}

export interface TimKiemXuLyCongViec {
    noiDung?: string;
    congViecPhatSinh?: number;
    nam?: number;
    thang?: number;
    userId?: number;
    phongBanId?: number;
    donViId?: number;
    vaiTro?: number;
    trangThai?: number;
    timChinhXac?: number;
}

interface listDongChiCusTom {
    text?: string;
    trangThai?: string;
}

export interface TimKiemChonVanBan {
    soKyHieu?: string;
    trichYeu?: string;
    donViId?: number;
}
