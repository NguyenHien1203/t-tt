export interface mUserInfo {
    fullName: string;
    userId: string;
    userAdmin: string;
    userName: string;
    // lstNhom : any[];
    quyenQuanTri: boolean;
    localIP: string;
    isAuthenticated: boolean;
    chucDanhID: string;
    donViId: string;
    donViIdCha: string;
    cap: string;
    phongBanId: string;
    phongBanLamViecId: string;
    roleId: string;
    token: string;
    tokensUser: tokens;
    urlPhienBanCu: string;
    maPhanCapDonVi: string;
    tenDonVi: string;
    curentSession: string;
    // lstMenuInRoles : any[];
    // menuCha : any[];
    // menuCon :any[];
    // nut : any[];
    nhomQuyenId: string;
    loai: string;
    name: string;
    passwordAD: string;
}

interface tokens {
    accessToken: string;
    refreshToken: string;
}
