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
    created?: string;
    createdBy?: string;
    lastModified?: string;
    lastModifiedBy?: string;
    inventoryStatus?: InventoryStatus;
}
