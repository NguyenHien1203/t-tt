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
    lstPhoiHop?: listDongChiCusTom[];
    lstDongChiThongBao?: listDongChiCusTom[];
    countDongChiThongBao?: number;
    countDongChiPhoiHop?: number;
    ngayXuLy?: string;
    noiDungXuLy?: string;
    lstTrangThai?: string;
    fileDinhKem?: string;
    lstVanBanBaoCao?: string;
}

export interface ThongTinNguoiXuLy {
    ngayXuLy: Date;
    noiDungXuLy: string;
    lstTrangThai: string;
    fileDinhKem: string;
    lstVanBanBaoCao: string;
}

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
