export interface BieuDoThongKeTheoLinhVuc {
    lstData?: NhiemVuModel[];
    countTongSoLinhVucHTDungHan?: number;
    countTongSoLinhVucHTQuaHan?: number;
    countTongSoLinhVucDXLDungHan?: number;
    countTongSoLinhVucDXLQuaHan?: number;
    percentLinhVucHTDungHan?: string;
    percentLinhVucHTQuaHan?: string;
    percentLinhVucDXLDungHan?: string;
    percentLinhVucDXLQuaHan?: string;
    countAll?: number;
}

interface NhiemVuModel {
    id?: number;
    tenLinhVuc?: string;
    countLinhVuc?: number;
    daHoanThanhQuaHan?: number;
    percentDaHoanThanhQuaHan?: string;
    daHoanThanhDungHan?: number;
    percentDaHoanThanhDungHan?: string;
    dangXuLyDungHan?: number;
    percentDangXuLyDungHan?: string;
    dangXuLyQuaHan?: number;
    percentDangXuLyQuaHan?: string;
}
