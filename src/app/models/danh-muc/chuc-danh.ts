interface InventoryStatus {
    label: string;
    value: string;
}

export interface ChucDanh {
    id?: number,
    tenChucDanh?: string;
    thuTu?: number;
    ghiChu?: string;
    donViId?: number;
    inventoryStatus?: InventoryStatus;
}
