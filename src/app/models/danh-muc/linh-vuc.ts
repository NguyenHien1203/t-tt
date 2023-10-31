interface InventoryStatus {
    label: string,
    value: string
}

export interface LinhVuc {
    id?: number,
    vietTat?: string,
    tenLinhVuc?: string,
    thuTu?: number,
    ghiChu?: string,
    donViId?: number,
    phongBanId?: number,
    parentId?: string,
    soHSHienTai?: number,
    soHSTruoc?: number,
    created?: string,
    createdBy?: string,
    lastModified?: string,
    lastModifiedBy?: string,
    donViIdPhongban?: number,
}
