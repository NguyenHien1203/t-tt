interface InventoryStatus {
    label: string;
    value: string;
}

export interface ChucDanh {
    id?: number,
    TenChucDanh?: string;
    ThuTu?: number;
    GhiChu?: string;
    DonViId?: number;
    inventoryStatus?: InventoryStatus;
}
