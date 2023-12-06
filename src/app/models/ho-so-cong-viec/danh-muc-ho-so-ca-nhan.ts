export interface DanhMucHoSoCaNhan {}

export interface TimKiemDanhMucHoSoCaNhan {
    maHoSo?: string;
    tenHoSo?: string;
}

export const loaiHoSoCongViec = {
    hoSoCongViecCoQuan: 2,
    hoSoCongViecCaNhan: 1,
};

export interface TreeNode {
    label: string;
    data: number;
    expandedIcon: string;
    collapsedIcon: string;
    children: TreeNode[];
    leaf: boolean;
    expanded: boolean | null;
}
