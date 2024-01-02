export interface QuanLyNhan {}

export interface TimKiemNhan {
    tenNhan?: string;
    phanLoai?: number;
    ghiChu?: string;
    userId?: number;
    timChinhXac?: number;
}

export interface TreeNodeNhan {
    id?: number;
    parentId?: number;
    name?: string;
    children?: TreeNodeNhan[];
    type?: string;
    isShow?: boolean;
  }
