import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { SelectItem } from 'primeng/api';
import { TaiKhoanService } from '../demo/service/he-thong/tai-khoan.service';
import { AuthService } from '../common/auth.services';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    selectedDrop: SelectItem = { value: '' };
    cities: SelectItem[] = [];
    model: any[] = [];
    lstMenu: any[] = [];
    LstMenuCon: any[] = [];
    nhomQuyenOption: [];
    selectedItem: any;
    position: string = 'top';
    DonViDangNhap = '';
    constructor(
        public layoutService: LayoutService,
        private taikhoanService: TaiKhoanService,
        private authService: AuthService,
        private cookieService: CookieService,
        private router: Router
    ) {}
    display: boolean = false;
    ngOnInit() {
        this.GetDataMenu();
        this.GetDataNhomQuyen();
        this.GetOptionNhomQuyen();
        this.cities = [
            {
                label: 'Văn thư (CNTT)',
                value: { id: 1, name: 'New York', code: 'NY' },
            },
            { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
            { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
            {
                label: 'Istanbul',
                value: { id: 4, name: 'Istanbul', code: 'IST' },
            },
            { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } },
        ];

        this.model = [
            // {
            //     label: 'Home',
            //     items: [
            //         { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
            //     ]
            // },
            {
                label: '',
                code: '0',
                items: [
                    {
                        label: 'Văn bản nhận',
                        icon: 'pi pi-fw pi-book',
                        code: '001',
                        items: [
                            {
                                label: 'Cập nhật mới',
                                icon: 'pi pi-fw pi-file-edit',
                                routerLink: ['/van-ban-den/cap-nhat-moi'],
                                code: '001001',
                            },
                            {
                                label: 'Tiếp nhận văn bản',
                                icon: 'pi pi-fw pi-verified',
                                routerLink: ['/van-ban-den/tiep-nhan-van-ban'],
                                code: '001002',
                            },
                            {
                                label: 'Quản trị văn bản',
                                icon: 'pi pi-fw pi-box',
                                routerLink: ['/van-ban-den/quan-tri-van-ban'],
                                code: '001003',
                            },
                            {
                                label: 'Tạo công việc',
                                icon: 'pi pi-fw pi-file-edit',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '001004',
                            },
                            {
                                label: 'Cập nhật công việc',
                                icon: 'pi pi-fw pi-file-edit',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '001009',
                            },
                            {
                                label: 'Tra cứu đơn giản',
                                icon: 'pi pi-fw pi-search',
                                routerLink: ['/van-ban-den/tra-cuu-don-gian'],
                                code: '001006',
                            },
                            {
                                label: 'Văn bản đã từ chối',
                                icon: 'pi pi-fw pi-minus',
                                routerLink: ['/van-ban-den/van-ban-da-tu-choi'],
                                code: '001007',
                            },
                            {
                                label: 'Sổ văn bản đến',
                                icon: 'pi pi-fw pi-book',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '001008',
                            },
                            {
                                label: 'Tra cứu nâng cao',
                                icon: 'pi pi-fw pi-search-plus',
                                routerLink: ['/van-ban-di/tra-cuu-nang-cao'],
                                code: '001010',
                            },
                            {
                                label: 'Tìm kiếm theo sổ văn bản',
                                icon: 'pi pi-fw pi-search-plus',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '001011',
                            },
                            {
                                label: 'Văn bản đến liên quan',
                                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                                routerLink: ['/hethong/nhomquyen'],
                                cdoe: '001012',
                            },
                            {
                                label: 'Văn bản đến liên thông',
                                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '001013',
                            },
                            {
                                label: 'Văn bản phải báo cáo',
                                icon: 'pi pi-fw pi-send',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '001014',
                            },
                            {
                                label: 'Văn bản chờ thu hồi',
                                icon: 'pi pi-fw pi-spinner',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '001016',
                            },
                            {
                                label: 'Văn bản thu hồi',
                                icon: 'pi pi-fw  pi-replay',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '001015',
                            },
                        ],
                    },
                    {
                        label: 'Văn bản đi',
                        icon: 'pi pi-fw pi-book',
                        code: '002',
                        items: [
                            {
                                label: 'Cập nhật mới',
                                icon: 'pi pi-fw pi-file-edit',
                                routerLink: ['/van-ban-di/cap-nhat-moi'],
                                code: '002001',
                            },
                            {
                                label: 'Quản trị văn bản đi',
                                icon: 'pi pi-fw pi-box',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '002002',
                            },
                            {
                                label: 'Tra cứu đơn giản',
                                icon: 'pi pi-fw pi-search',
                                routerLink: ['/van-ban-di/tra-cuu-don-gian'],
                                code: '002003',
                            },
                            {
                                label: 'Gửi văn bản đi',
                                icon: 'pi pi-fw pi-send',
                                routerLink: ['/van-ban-di/gui-van-ban'],
                                code: '002005',
                            },
                            {
                                label: 'Theo dõi văn bản đi',
                                icon: 'pi pi-fw pi-arrow-circle-right',
                                routerLink: ['/van-ban-di/theo-doi-van-ban-di'],
                                code: '002006',
                            },
                            {
                                label: 'Sổ văn bản đi',
                                icon: 'pi pi-fw pi-book',
                                routerLink: ['/van-ban-di/so-van-ban-di'],
                                code: '002009',
                            },
                            {
                                label: 'Văn bản đi liên thông',
                                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '002007',
                            },
                            {
                                label: 'Văn bản nghiệp vụ',
                                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '002015',
                            },
                            {
                                label: 'Văn bản đi liên quan',
                                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '002008',
                            },
                            {
                                label: 'Tra cứu nâng cao',
                                icon: 'pi pi-fw pi-search-plus',
                                routerLink: ['/van-ban-di/tra-cuu-nang-cao'],
                                code: '002013',
                            },
                        ],
                    },
                    {
                        label: 'Quản lý công việc',
                        icon: 'pi pi-fw pi-desktop',
                        code: '003',
                        items: [
                            {
                                label: 'Quản lý công việc phát sinh',
                                icon: 'pi pi-fw pi-clone',
                                routerLink: ['/danhmuc/chucdanh'],
                                code: '003001',
                            },
                            {
                                label: 'Xử lý công việc',
                                icon: 'pi pi-fw pi-check-square',
                                routerLink: ['/cong-viec/xu-ly-cong-viec'],
                                code: '003002',
                            },
                            {
                                label: 'Theo dõi tiến độ',
                                icon: 'pi pi-fw pi-chevron-circle-right',
                                routerLink: ['/danhmuc/linhvuc'],
                                code: '003003',
                            },
                            {
                                label: 'Danh sách bàn giao công việc',
                                icon: 'pi pi-fw pi-book',
                                routerLink: ['/cong-viec/danh-sach-ban-giao-cong-viec'],
                                code: '003005',
                            },
                            {
                                label: 'Duyệt bàn giao công việc',
                                icon: 'pi pi-fw pi-check-circle',
                                routerLink: ['/danhmuc/linhvuc'],
                                code: '003008',
                            },
                            {
                                label: 'Danh sách đề xuất công việc',
                                icon: 'pi pi-fw pi-book',
                                routerLink: ['/danhmuc/linhvuc'],
                                code: '003006',
                            },
                            {
                                label: 'Duyệt đề xuất công việc',
                                icon: 'pi pi-fw pi-check-circle',
                                routerLink: ['/danhmuc/linhvuc'],
                                code: '003007',
                            },
                        ],
                    },
                    {
                        label: 'Trao đổi thông tin',
                        icon: 'pi pi-fw pi-inbox',
                        code: '004',
                        items: [
                            {
                                label: 'Soạn thư',
                                icon: 'pi pi-fw pi-file-edit',
                                routerLink: ['/trao-doi-thong-tin/soan-thu'],
                                code: '004001',
                            },
                            {
                                label: 'Hộp thư đến',
                                icon: 'pi pi-fw pi-envelope',
                                routerLink: ['/trao-doi-thong-tin/hop-thu-den'],
                                code: '004002',
                            },
                            {
                                label: 'Hộp thư đi',
                                icon: 'pi pi-fw pi-send',
                                routerLink: ['/trao-doi-thong-tin/hop-thu-di'],
                                code: '004003',
                            },
                            {
                                label: 'Thư nháp',
                                icon: 'pi pi-fw pi-pause',
                                routerLink: [
                                    '/trao-doi-thong-tin/hop-thu-nhap',
                                ],
                                code: '004004',
                            },
                            {
                                label: 'Thư quan trọng',
                                icon: 'pi pi-fw pi-flag-fill',
                                routerLink: [
                                    '/trao-doi-thong-tin/hop-thu-quan-trong',
                                ],
                                code: '004005',
                            },
                            {
                                label: 'Thêm nhãn',
                                icon: 'pi pi-fw pi-tags',
                                routerLink: [
                                    '/trao-doi-thong-tin/nhan-ca-nhan',
                                ],
                                code: '004006',
                            },
                        ],
                    },
                    {
                        label: 'Hồ sơ công việc',
                        icon: 'pi pi-fw pi-briefcase',
                        code: '010',
                        items: [
                            {
                                label: 'Danh mục HSCV cơ quan',
                                icon: 'pi pi-fw pi-sitemap',
                                routerLink: ['/ho-so-cong-viec/danh-muc-ho-so-co-quan'],
                                code: '010004',
                            },
                            {
                                label: 'Lưu trữ HSCV cơ quan',
                                icon: 'pi pi-fw pi-clone',
                                routerLink: ['/ho-so-cong-viec/luu-tru-ho-so-co-quan'],
                                code: '010003',
                            },
                            {
                                label: 'Quản lý hồ sơ cơ quan',
                                icon: 'pi pi-fw pi-folder-open',
                                routerLink: ['/ho-so-cong-viec/quan-ly-ho-so-co-quan'],
                                code: '010006',
                            },
                            {
                                label: 'Danh mục HSCV cá nhân',
                                icon: 'pi pi-fw pi-sitemap',
                                routerLink: ['//ho-so-cong-viec/danh-muc-ho-so-ca-nhan'],
                                code: '010006',
                            },
                            {
                                label: 'Lưu trữ HSCV cá nhân',
                                icon: 'pi pi-fw pi-clone',
                                routerLink: ['/ho-so-cong-viec/luu-tru-ho-so-ca-nhan'],
                                code: '010007',
                            },
                            {
                                label: 'Quản lý hồ sơ cá nhân',
                                icon: 'pi pi-fw pi-folder-open',
                                routerLink: ['/ho-so-cong-viec/quan-ly-ho-so-ca-nhan'],
                                code: '010003',
                            },
                            {
                                label: 'Thêm mới phiếu trình',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/ho-so-cong-viec/them-moi-phieu-trinh'],
                                code: '010008',
                            },
                            {
                                label: 'Duyệt phiếu trình',
                                icon: 'pi pi-fw pi-check-square',
                                routerLink: ['/ho-so-cong-viec/duyet-phieu-trinh'],
                                code: '010009',
                            },
                            {
                                label: 'Ký phiếu trình',
                                icon: 'pi pi-fw pi-user-edit',
                                routerLink: ['/ho-so-cong-viec/ky-phieu-trinh'],
                                code: '010010',
                            },
                        ],
                    },
                    {
                        label: 'Lịch',
                        icon: 'pi pi-fw pi-calendar',
                        code: '005',
                        items: [
                            {
                                label: 'Lịch cá nhân',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['/lich/lich-ca-nhan'],
                                code: '005008',
                            },
                            {
                                label: 'Quản trị lịch',
                                icon: 'pi pi-fw pi-calendar-plus',
                                routerLink: ['/lich/quan-tri-lich'],
                                code: '005007',
                            },
                            {
                                label: 'Quản trị lịch phòng ban',
                                icon: 'pi pi-fw pi-calendar-plus',
                                routerLink: ['/lich/quan-tri-lich-phong-ban'],
                                code: '005001',
                            },
                            {
                                label: 'Lịch cơ quan',
                                icon: 'pi pi-fw pi-calendar-plus',
                                routerLink: ['/lich/lich-co-quan'],
                                code: '005004',
                            },
                            {
                                label: 'Lịch UBND Tỉnh',
                                icon: 'pi pi-fw pi-calendar-plus',
                                routerLink: ['/lich/lich-ubnd-tinh'],
                                code: '005005',
                            },
                            {
                                label: 'Lịch HĐND & ĐBQH',
                                icon: 'pi pi-fw pi-calendar-plus',
                                routerLink: ['/lich/lich-hdnd-va-dbqh'],
                                code: '005006',
                            },
                            {
                                label: 'Lịch Tỉnh Ủy',
                                icon: 'pi pi-fw pi-calendar-plus',
                                routerLink: ['/lich/lich-tinh-uy'],
                                code: '005003',
                            },
                            // {
                            //     label: 'Lịch họp',
                            //     icon: 'pi pi-fw pi-calendar-plus',
                            //     routerLink: ['/lich/lich-hop'],
                            //     code: '005002',
                            // },
                        ],
                    },
                    {
                        label: 'Thông tin khác',
                        icon: 'pi pi-fw pi-plus-circle',
                        code: '006',
                        items: [
                            {
                                label: 'Quản lý thông báo',
                                icon: 'pi pi-fw pi-circle-fill',
                                routerLink: [
                                    '/thong-tin-khac/quan-ly-thong-bao',
                                ],
                                code: '006002',
                            },
                            {
                                label: 'Xem thông báo',
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/thong-tin-khac/xem-thong-bao'],
                                code: '006005',
                            },
                            {
                                label: 'Quản lý bảng lương',
                                icon: 'pi pi-fw pi-money-bill',
                                routerLink: [
                                    '/thong-tin-khac/quan-ly-bang-luong',
                                ],
                                code: '006003',
                            },
                            {
                                label: 'Xem bảng lương',
                                icon: 'pi pi-fw pi-euro',
                                routerLink: ['/thong-tin-khac/xem-bang-luong'],
                                code: '006004',
                            },
                            {
                                label: 'Quản lý tài liệu hướng dẫn',
                                icon: 'pi pi-fw pi-directions',
                                routerLink: ['/thong-tin-khac/quan-ly-tai-lieu-huong-dan'],
                                code: '006006',
                            },
                            {
                                label: 'Tài liệu hướng dẫn',
                                icon: 'pi pi-fw pi-info-circle',
                                routerLink: ['/thong-tin-khac/tai-lieu-huong-dan'],
                                code: '006009',
                            },
                            {
                                label: 'Quản lý chuyên mục câu hỏi',
                                icon: 'pi pi-fw pi-question-circle',
                                routerLink: [
                                    '/thong-tin-khac/quan-ly-chuyen-muc-cau-hoi',
                                ],
                                code: '006007',
                            },
                            {
                                label: 'Hoạt động sắp tới',
                                icon: 'pi pi-fw pi-arrow-circle-right',
                                routerLink: ['/thong-tin-khac/hoat-dong-sap-toi'],
                                code: '006008',
                            },
                            {
                                label: 'Quản lý câu hỏi thường gặp',
                                icon: 'pi pi-fw pi-question-circle',
                                routerLink: [
                                    '/thong-tin-khac/quan-ly-cau-hoi-thuong-gap',
                                ],
                                code: '006010',
                            },
                            {
                                label: 'Câu hỏi thường gặp',
                                icon: 'pi pi-fw pi-question',
                                routerLink: [
                                    '/thong-tin-khac/cau-hoi-thuong-gap',
                                ],
                                code: '006011',
                            },
                            {
                                label: 'Quản lý thăm dò ý kiến',
                                icon: 'pi pi-fw pi-globe',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '006012',
                            },
                            {
                                label: 'Thăm dò ý kiến',
                                icon: 'pi pi-fw pi-share-alt',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '006013',
                            },
                        ],
                    },
                    {
                        label: 'Thống kê',
                        icon: 'pi pi-fw pi-chart-line',
                        code: '008',
                        items: [
                            {
                                label: 'Văn bản nhận',
                                icon: 'pi pi-fw pi-file-edit',
                                routerLink: ['/thong-ke/van-ban-nhan'],
                                code: '008001',
                            },
                            {
                                label: 'Văn bản đi',
                                icon: 'pi pi-fw pi-file-edit',
                                routerLink: ['/thong-ke/van-ban-di'],
                                code: '008002',
                            },
                            {
                                label: 'Thống kê xử lý công việc',
                                icon: 'pi pi-fw pi-box',
                                routerLink: ['/thong-ke/xu-ly-cong-viec'],
                                code: '008003',
                            },
                            {
                                label: 'Mức độ truy cập',
                                icon: 'pi pi-fw pi-stopwatch',
                                routerLink: ['/thong-ke/muc-do-truy-cap'],
                                code: '008005',
                            },
                        ],
                    },
                    {
                        label: 'Danh mục',
                        icon: 'pi pi-fw pi-sort-amount-up-alt',
                        code: '009',
                        items: [
                            {
                                label: 'Chức danh',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/danh-muc/chuc-danh'],
                                code: '009001',
                            },
                            {
                                label: 'Lĩnh vực',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/danh-muc/linh-vuc'],
                                code: '009002',
                            },
                            {
                                label: 'Loại hồ sơ',
                                icon: 'pi pi-fw pi-folder',
                                routerLink: ['/danh-muc/loai-ho-so'],
                                code: '009003',
                            },
                            {
                                label: 'Loại văn bản',
                                icon: 'pi pi-fw pi-sliders-v',
                                routerLink: ['/danh-muc/loai-van-ban'],
                                code: '009004',
                            },
                            {
                                label: 'Sổ văn bản',
                                icon: 'pi pi-fw pi-book',
                                routerLink: ['/danh-muc/so-van-ban'],
                                code: '009005',
                            },
                            {
                                label: 'Cơ quan',
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/danh-muc/don-vi'],
                                code: '009006',
                            },
                            {
                                label: 'Cơ quan ban hành',
                                icon: 'pi pi-fw pi-globe',
                                routerLink: ['/danh-muc/co-quan-ban-hanh'],
                                code: '009007',
                            },
                            {
                                label: 'Loại văn bản đến tại cơ quan',
                                icon: 'pi pi-fw pi-book',
                                routerLink: ['/danh-muc/loai-van-ban-den'],
                                code: '009008',
                            },
                            {
                                label: 'Loại văn bản đi tại cơ quan',
                                icon: 'pi pi-fw pi-book',
                                routerLink: ['/danh-muc/loai-van-ban-di'],
                                code: '009009',
                            },
                            {
                                label: 'Nhóm đơn vị',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/danh-muc/nhom-don-vi'],
                                code: '009010',
                            },
                            {
                                label: 'Phòng ban',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/danh-muc/phong-ban'],
                                code: '009011',
                            },
                            {
                                label: 'Danh bạ',
                                icon: 'pi pi-fw pi-align-justify',
                                routerLink: ['/danh-muc/danh-ba'],
                                code: '009012',
                            },
                            {
                                label: 'Liên kết',
                                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                                routerLink: ['/danh-muc/lien-ket'],
                                code: '009014',
                            },
                            {
                                label: 'Loại nhiệm vụ',
                                icon: 'pi pi-fw pi-table',
                                routerLink: ['/danh-muc/loai-nhiem-vu'],
                                code: '009015',
                            },
                            {
                                label: 'Tính chất nhiệm vụ',
                                icon: 'pi pi-fw pi-angle-double-right',
                                routerLink: ['/danh-muc/tinh-chat-nhiem-vu'],
                                code: '009016',
                            },
                        ],
                    },
                    {
                        label: 'Hệ thống',
                        icon: 'pi pi-fw pi-wrench',
                        code: '007',
                        items: [
                            {
                                label: 'Thay đổi thông tin',
                                icon: 'pi pi-fw pi-save',
                                routerLink: ['/hethong/quantritaikhoan'],
                                code: '007001',
                            },
                            {
                                label: 'Đổi mật khẩu',
                                icon: 'pi pi-fw pi-refresh',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007002',
                            },
                            {
                                label: 'Quản lý reset mật khẩu',
                                icon: 'pi pi-fw pi-cog',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007013',
                            },
                            {
                                label: 'Quản trị tài khoản',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['/he-thong/tai-khoan'],
                                code: '007005',
                            },
                            {
                                label: 'Quản lý nhãn',
                                icon: 'pi pi-fw pi-tags',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007003',
                            },
                            {
                                label: 'Nhóm tài khoản chung',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007014',
                            },
                            {
                                label: 'Nhóm tài khoản cá nhân',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007007',
                            },
                            {
                                label: 'Nhóm tài khoản đơn vị',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007008',
                            },
                            {
                                label: 'Nhóm tài khoản phòng ban',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007009',
                            },
                            {
                                label: 'Nhóm quyền',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007015',
                            },
                            {
                                label: 'Nhật ký hệ thống',
                                icon: 'pi pi-fw pi-history',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007016',
                            },
                            {
                                label: 'Cài đặt hệ thống',
                                icon: 'pi pi-fw pi-cog',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007017',
                            },
                        ],
                    },
                    {
                        label: 'Ký số',
                        icon: 'pi pi-fw pi-user-edit',
                        code: '011',
                        items: [
                            {
                                label: 'Trình ký',
                                icon: 'pi pi-fw pi-file-edit',
                                routerLink: ['/hethong/quantritaikhoan'],
                                code: '011001',
                            },
                            {
                                label: 'Ký số trả lại',
                                icon: 'pi pi-fw pi-replay',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '011003',
                            },
                            {
                                label: 'Duyệt văn bản trình ký',
                                icon: 'pi pi-fw pi-check-square',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '011004',
                            },
                            {
                                label: 'Văn bản ký số đã duyệt',
                                icon: 'pi pi-fw pi-check-circle',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '011005',
                            },
                            {
                                label: 'Văn bản chờ ký số',
                                icon: 'pi pi-fw pi-user-edit',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '011006',
                            },
                            {
                                label: 'Văn bản ký số đã ký',
                                icon: 'pi pi-fw pi-check-circle',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '011007',
                            },
                            {
                                label: 'Văn bản chờ phát hành',
                                icon: 'pi pi-fw pi-upload',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '011008',
                            },
                            {
                                label: 'Luồng ký số',
                                icon: 'pi pi-fw pi-sort-alt-slash',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '011012',
                            },
                        ],
                    },
                    {
                        label: 'Nhiệm vụ',
                        icon: 'pi pi-fw pi-table',
                        code: '012',
                        items: [
                            {
                                label: 'Tạo nhiệm vụ',
                                icon: 'pi pi-fw pi-window-maximize',
                                routerLink: ['/hethong/quantritaikhoan'],
                                code: '012001',
                            },
                            {
                                label: 'Duyệt nhiệm vụ',
                                icon: 'pi pi-fw pi-check-square',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '012002',
                            },
                            {
                                label: 'Cập nhật tiến độ',
                                icon: 'pi pi-fw pi-upload',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '012003',
                            },
                            {
                                label: 'Duyệt hoàn thành',
                                icon: 'pi pi-fw pi-user-edit',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '012004',
                            },
                        ],
                    },
                    {
                        label: 'Thống kê nhiệm vụ',
                        icon: 'pi pi-fw pi-chart-pie',
                        code: '013',
                        items: [
                            {
                                label: 'Biểu đồ thống kê theo trạng thái',
                                icon: 'pi pi-fw pi-chart-bar',
                                routerLink: ['/hethong/quantritaikhoan'],
                                code: '013001',
                            },
                            {
                                label: 'Bảng thống kê theo lĩnh vực',
                                icon: 'pi pi-fw pi-chart-line',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '013002',
                            },
                            {
                                label: 'Thống kê theo dạng bảng',
                                icon: 'pi pi-fw pi-table',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '013003',
                            },
                            {
                                label: 'Thống kê theo loại nhiệm vụ',
                                icon: 'pi pi-fw pi-chart-bar',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '013004',
                            },
                        ],
                    },
                ],
            },
        ];
    }

    public Submit() {
        var valueOption = this.selectedItem.code.toString();
        var splitted = valueOption.split('%');
        var PhongBanId = splitted[0];
        var NhomQuyenId = splitted[1];
        const objUser = this.authService.GetmUserInfo();
        if (objUser != null) {
            objUser.phongBanLamViecId = PhongBanId.toString();
            objUser.nhomQuyenId = NhomQuyenId.toString();
        }

        this.cookieService.set('mUserInfo', JSON.stringify(objUser));
        this.cookieService.set('idDonViLamViec', objUser?.phongBanLamViecId);
        this.GetDataMenu();
        this.GetDataNhomQuyen();

        this.display = false;

        this.router.navigate(['/']);
    }

    /**
     * GetDataMenu
     */
    public GetDataMenu() {
        const menu = [
            // {
            //     label: 'Home',
            //     items: [
            //         { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
            //     ]
            // },
            {
                label: '',
                code: '0',
                items: [
                    {
                        label: 'Văn bản nhận',
                        icon: 'pi pi-fw pi-book',
                        code: '001',
                        items: [
                            {
                                label: 'Cập nhật mới',
                                icon: 'pi pi-fw pi-file-edit',
                                routerLink: ['/van-ban-den/cap-nhat-moi'],
                                code: '001001',
                            },
                            {
                                label: 'Tiếp nhận văn bản',
                                icon: 'pi pi-fw pi-verified',
                                routerLink: ['/van-ban-den/tiep-nhan-van-ban'],
                                code: '001002',
                            },
                            {
                                label: 'Quản trị văn bản',
                                icon: 'pi pi-fw pi-box',
                                routerLink: ['/van-ban-den/quan-tri-van-ban'],
                                code: '001003',
                            },
                            {
                                label: 'Bút phê văn bản',
                                icon: 'pi pi-fw pi-file-edit',
                                routerLink: ['/van-ban-den/but-phe-van-ban'],
                                code: '001004',
                            },
                            {
                                label: 'Sửa bút phê',
                                icon: 'pi pi-fw pi-file-edit',
                                routerLink: ['/van-ban-den/sua-but-phe-van-ban'],
                                code: '001009',
                            },
                            {
                                label: 'Tra cứu đơn giản',
                                icon: 'pi pi-fw pi-search',
                                routerLink: ['/van-ban-den/tra-cuu-don-gian'],
                                code: '001006',
                            },
                            {
                                label: 'Văn bản đã từ chối',
                                icon: 'pi pi-fw pi-minus',
                                routerLink: ['/van-ban-den/van-ban-da-tu-choi'],
                                code: '001007',
                            },
                            {
                                label: 'Sổ văn bản đến',
                                icon: 'pi pi-fw pi-book',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '001008',
                            },
                            {
                                label: 'Tra cứu nâng cao',
                                icon: 'pi pi-fw pi-search-plus',
                                routerLink: ['/van-ban-den/tra-cuu-nang-cao'],
                                code: '001010',
                            },
                            {
                                label: 'Tìm kiếm theo sổ văn bản',
                                icon: 'pi pi-fw pi-search-plus',
                                routerLink: ['/van-ban-den/tim-kiem-theo-so-van-ban'],
                                code: '001011',
                            },
                            {
                                label: 'Văn bản đến liên quan',
                                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                                routerLink: ['/van-ban-den/van-ban-den-lien-quan'],
                                cdoe: '001012',
                            },
                            {
                                label: 'Văn bản đến liên thông',
                                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                                routerLink: ['/van-ban-den/van-ban-den-lien-thong'],
                                code: '001013',
                            },
                            {
                                label: 'Văn bản phải báo cáo',
                                icon: 'pi pi-fw pi-send',
                                routerLink: ['/van-ban-den/van-ban-phai-bao-cao'],
                                code: '001014',
                            },
                            {
                                label: 'Văn bản chờ thu hồi',
                                icon: 'pi pi-fw pi-spinner',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '001016',
                            },
                            {
                                label: 'Văn bản thu hồi',
                                icon: 'pi pi-fw  pi-replay',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '001015',
                            },
                        ],
                    },
                    {
                        label: 'Văn bản đi',
                        icon: 'pi pi-fw pi-book',
                        code: '002',
                        items: [
                            {
                                label: 'Cập nhật mới',
                                icon: 'pi pi-fw pi-file-edit',
                                routerLink: ['/van-ban-di/cap-nhat-moi'],
                                code: '002001',
                            },
                            {
                                label: 'Quản trị văn bản đi',
                                icon: 'pi pi-fw pi-box',
                                routerLink: ['/van-ban-di/quan-tri-van-ban-di'],
                                code: '002002',
                            },
                            {
                                label: 'Tra cứu đơn giản',
                                icon: 'pi pi-fw pi-search',
                                routerLink: ['/van-ban-di/tra-cuu-don-gian'],
                                code: '002003',
                            },
                            {
                                label: 'Gửi văn bản đi',
                                icon: 'pi pi-fw pi-send',
                                routerLink: ['/van-ban-di/gui-van-ban'],
                                code: '002005',
                            },
                            {
                                label: 'Theo dõi văn bản đi',
                                icon: 'pi pi-fw pi-arrow-circle-right',
                                routerLink: ['/van-ban-di/theo-doi-van-ban-di'],
                                code: '002006',
                            },
                            {
                                label: 'Sổ văn bản đi',
                                icon: 'pi pi-fw pi-book',
                                routerLink: ['/van-ban-di/so-van-ban-di'],
                                code: '002009',
                            },
                            {
                                label: 'Văn bản đi liên thông',
                                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '002007',
                            },
                            {
                                label: 'Văn bản nghiệp vụ',
                                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                                routerLink: ['/van-ban-di/van-ban-nghiep-vu'],
                                code: '002015',
                            },
                            {
                                label: 'Văn bản đi liên quan',
                                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                                routerLink: [
                                    '/van-ban-di/van-ban-di-lien-quan',
                                ],
                                code: '002008',
                            },
                            {
                                label: 'Tra cứu nâng cao',
                                icon: 'pi pi-fw pi-search-plus',
                                routerLink: ['/van-ban-di/tra-cuu-nang-cao'],
                                code: '002013',
                            },
                        ],
                    },
                    {
                        label: 'Quản lý công việc',
                        icon: 'pi pi-fw pi-desktop',
                        code: '003',
                        items: [
                            {
                                label: 'Quản lý công việc phát sinh',
                                icon: 'pi pi-fw pi-clone',
                                routerLink: ['/cong-viec/qly-cviec-psinh'],
                                code: '003001',
                            },
                            {
                                label: 'Xử lý công việc',
                                icon: 'pi pi-fw pi-check-square',
                                routerLink: ['/cong-viec/xu-ly-cong-viec'],
                                code: '003002',
                            },
                            {
                                label: 'Theo dõi tiến độ',
                                icon: 'pi pi-fw pi-chevron-circle-right',
                                routerLink: ['/cong-viec/theo-doi-tien-do'],
                                code: '003003',
                            },
                            {
                                label: 'Danh sách bàn giao công việc',
                                icon: 'pi pi-fw pi-book',
                                routerLink: ['/cong-viec/danh-sach-ban-giao-cong-viec'],
                                code: '003005',
                            },
                            {
                                label: 'Duyệt bàn giao công việc',
                                icon: 'pi pi-fw pi-check-circle',
                                routerLink: ['/danhmuc/linhvuc'],
                                code: '003008',
                            },
                            {
                                label: 'Danh sách đề xuất công việc',
                                icon: 'pi pi-fw pi-book',
                                routerLink: ['/danhmuc/linhvuc'],
                                code: '003006',
                            },
                            {
                                label: 'Duyệt đề xuất công việc',
                                icon: 'pi pi-fw pi-check-circle',
                                routerLink: ['/danhmuc/linhvuc'],
                                code: '003007',
                            },
                        ],
                    },
                    {
                        label: 'Trao đổi thông tin',
                        icon: 'pi pi-fw pi-inbox',
                        code: '004',
                        items: [
                            {
                                label: 'Soạn thư',
                                icon: 'pi pi-fw pi-file-edit',
                                routerLink: ['/trao-doi-thong-tin/soan-thu'],
                                code: '004001',
                            },
                            {
                                label: 'Hộp thư đến',
                                icon: 'pi pi-fw pi-envelope',
                                routerLink: ['/trao-doi-thong-tin/hop-thu-den'],
                                code: '004002',
                            },
                            {
                                label: 'Hộp thư đi',
                                icon: 'pi pi-fw pi-send',
                                routerLink: ['/trao-doi-thong-tin/hop-thu-di'],
                                code: '004003',
                            },
                            {
                                label: 'Thư nháp',
                                icon: 'pi pi-fw pi-pause',
                                routerLink: [
                                    '/trao-doi-thong-tin/hop-thu-nhap',
                                ],
                                code: '004004',
                            },
                            {
                                label: 'Thư quan trọng',
                                icon: 'pi pi-fw pi-flag-fill',
                                routerLink: [
                                    '/trao-doi-thong-tin/hop-thu-quan-trong',
                                ],
                                code: '004005',
                            },
                            {
                                label: 'Thêm nhãn',
                                icon: 'pi pi-fw pi-tags',
                                routerLink: [
                                    '/trao-doi-thong-tin/nhan-ca-nhan',
                                ],
                                code: '004006',
                            },
                        ],
                    },
                    {
                        label: 'Hồ sơ công việc',
                        icon: 'pi pi-fw pi-briefcase',
                        code: '010',
                        items: [
                            {
                                label: 'Danh mục HSCV cơ quan',
                                icon: 'pi pi-fw pi-sitemap',
                                routerLink: ['/ho-so-cong-viec/danh-muc-ho-so-co-quan'],
                                code: '010004',
                            },
                            {
                                label: 'Lưu trữ HSCV cơ quan',
                                icon: 'pi pi-fw pi-clone',
                                routerLink: ['/ho-so-cong-viec/luu-tru-ho-so-co-quan'],
                                code: '010003',
                            },
                            {
                                label: 'Quản lý hồ sơ cơ quan',
                                icon: 'pi pi-fw pi-folder-open',
                                routerLink: ['/ho-so-cong-viec/quan-ly-ho-so-co-quan'],
                                code: '010006',
                            },
                            {
                                label: 'Danh mục HSCV cá nhân',
                                icon: 'pi pi-fw pi-sitemap',
                                routerLink: ['//ho-so-cong-viec/danh-muc-ho-so-ca-nhan'],
                                code: '010006',
                            },
                            {
                                label: 'Lưu trữ HSCV cá nhân',
                                icon: 'pi pi-fw pi-clone',
                                routerLink: ['/ho-so-cong-viec/luu-tru-ho-so-ca-nhan'],
                                code: '010007',
                            },
                            {
                                label: 'Quản lý hồ sơ cá nhân',
                                icon: 'pi pi-fw pi-folder-open',
                                routerLink: ['/ho-so-cong-viec/quan-ly-ho-so-ca-nhan'],
                                code: '010003',
                            },
                            {
                                label: 'Thêm mới phiếu trình',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/ho-so-cong-viec/them-moi-phieu-trinh'],
                                code: '010008',
                            },
                            {
                                label: 'Duyệt phiếu trình',
                                icon: 'pi pi-fw pi-check-square',
                                routerLink: ['/ho-so-cong-viec/duyet-phieu-trinh'],
                                code: '010009',
                            },
                            {
                                label: 'Ký phiếu trình',
                                icon: 'pi pi-fw pi-user-edit',
                                routerLink: ['/ho-so-cong-viec/ky-phieu-trinh'],
                                code: '010010',
                            },
                        ],
                    },
                    {
                        label: 'Lịch',
                        icon: 'pi pi-fw pi-calendar',
                        code: '005',
                        items: [
                            {
                                label: 'Lịch cá nhân',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['/lich/lich-ca-nhan'],
                                code: '005008',
                            },
                            {
                                label: 'Quản trị lịch',
                                icon: 'pi pi-fw pi-calendar-plus',
                                routerLink: ['/lich/quan-tri-lich'],
                                code: '005007',
                            },
                            {
                                label: 'Quản trị lịch phòng ban',
                                icon: 'pi pi-fw pi-calendar-plus',
                                routerLink: ['/lich/quan-tri-lich-phong-ban'],
                                code: '005001',
                            },
                            {
                                label: 'Lịch cơ quan',
                                icon: 'pi pi-fw pi-calendar-plus',
                                routerLink: ['/lich/lich-co-quan'],
                                code: '005004',
                            },
                            {
                                label: 'Lịch UBND Tỉnh',
                                icon: 'pi pi-fw pi-calendar-plus',
                                routerLink: ['/lich/lich-ubnd-tinh'],
                                code: '005005',
                            },
                            {
                                label: 'Lịch HĐND & ĐBQH',
                                icon: 'pi pi-fw pi-calendar-plus',
                                routerLink: ['/lich/lich-hdnd-va-dbqh'],
                                code: '005006',
                            },
                            {
                                label: 'Lịch Tỉnh Ủy',
                                icon: 'pi pi-fw pi-calendar-plus',
                                routerLink: ['/lich/lich-tinh-uy'],
                                code: '005003',
                            },
                            // {
                            //     label: 'LichUBNDTinh',
                            //     icon: 'pi pi-fw pi-calendar-plus',
                            //     routerLink: ['/lich/lich-hop'],
                            //     code: '005002',
                            // },
                        ],
                    },
                    {
                        label: 'Thông tin khác',
                        icon: 'pi pi-fw pi-plus-circle',
                        code: '006',
                        items: [
                            {
                                label: 'Quản lý thông báo',
                                icon: 'pi pi-fw pi-circle-fill',
                                routerLink: [
                                    '/thong-tin-khac/quan-ly-thong-bao',
                                ],
                                code: '006002',
                            },
                            {
                                label: 'Xem thông báo',
                                icon: 'pi pi-fw pi-circle',
                                routerLink: ['/thong-tin-khac/xem-thong-bao'],
                                code: '006005',
                            },
                            {
                                label: 'Quản lý bảng lương',
                                icon: 'pi pi-fw pi-money-bill',
                                routerLink: [
                                    '/thong-tin-khac/quan-ly-bang-luong',
                                ],
                                code: '006003',
                            },
                            {
                                label: 'Xem bảng lương',
                                icon: 'pi pi-fw pi-euro',
                                routerLink: ['/thong-tin-khac/xem-bang-luong'],
                                code: '006004',
                            },
                            {
                                label: 'Quản lý tài liệu hướng dẫn',
                                icon: 'pi pi-fw pi-directions',
                                routerLink: ['/thong-tin-khac/quan-ly-tai-lieu-huong-dan'],
                                code: '006006'
                            },
                            {
                                label: 'Tài liệu hướng dẫn',
                                icon: 'pi pi-fw pi-info-circle',
                                routerLink: ['/thong-tin-khac/tai-lieu-huong-dan'],
                                code: '006009'
                            },
                            {
                                label: 'Quản lý chuyên mục câu hỏi',
                                icon: 'pi pi-fw pi-question-circle',
                                routerLink: [
                                    '/thong-tin-khac/quan-ly-chuyen-muc-cau-hoi',
                                ],
                                code: '006007',
                            },
                            {
                                label: 'Hoạt động sắp tới',
                                icon: 'pi pi-fw pi-arrow-circle-right',
                                routerLink: ['/thong-tin-khac/hoat-dong-sap-toi'],
                                code: '006008',
                            },
                            {
                                label: 'Quản lý câu hỏi thường gặp',
                                icon: 'pi pi-fw pi-question-circle',
                                routerLink: [
                                    '/thong-tin-khac/quan-ly-cau-hoi-thuong-gap',
                                ],
                                code: '006010',
                            },
                            {
                                label: 'Câu hỏi thường gặp',
                                icon: 'pi pi-fw pi-question',
                                routerLink: [
                                    '/thong-tin-khac/cau-hoi-thuong-gap',
                                ],
                                code: '006011',
                            },
                            {
                                label: 'Quản lý thăm dò ý kiến',
                                icon: 'pi pi-fw pi-globe',
                                routerLink: ['/thong-tin-khac/quan-ly-tham-do-y-kien'],
                                code: '006012'
                            },
                            {
                                label: 'Thăm dò ý kiến',
                                icon: 'pi pi-fw pi-share-alt',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '006013',
                            },
                        ],
                    },
                    {
                        label: 'Thống kê',
                        icon: 'pi pi-fw pi-chart-line',
                        code: '008',
                        items: [
                            {
                                label: 'Văn bản nhận',
                                icon: 'pi pi-fw pi-file-edit',
                                routerLink: ['/thong-ke/van-ban-nhan'],
                                code: '008001',
                            },
                            {
                                label: 'Văn bản đi',
                                icon: 'pi pi-fw pi-file-edit',
                                routerLink: ['/thong-ke/van-ban-di'],
                                code: '008002',
                            },
                            {
                                label: 'Thống kê xử lý công việc',
                                icon: 'pi pi-fw pi-box',
                                routerLink: ['/thong-ke/xu-ly-cong-viec'],
                                code: '008003',
                            },
                            {
                                label: 'Mức độ truy cập',
                                icon: 'pi pi-fw pi-stopwatch',
                                routerLink: ['/thong-ke/muc-do-truy-cap'],
                                code: '008005',
                            },
                        ],
                    },
                    {
                        label: 'Danh mục',
                        icon: 'pi pi-fw pi-sort-amount-up-alt',
                        code: '009',
                        items: [
                            {
                                label: 'Chức danh',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/danh-muc/chuc-danh'],
                                code: '009001',
                            },
                            {
                                label: 'Lĩnh vực',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/danh-muc/linh-vuc'],
                                code: '009002',
                            },
                            {
                                label: 'Loại hồ sơ',
                                icon: 'pi pi-fw pi-folder',
                                routerLink: ['/danh-muc/loai-ho-so'],
                                code: '009003',
                            },
                            {
                                label: 'Loại văn bản',
                                icon: 'pi pi-fw pi-sliders-v',
                                routerLink: ['/danh-muc/loai-van-ban'],
                                code: '009004',
                            },
                            {
                                label: 'Sổ văn bản',
                                icon: 'pi pi-fw pi-book',
                                routerLink: ['/danh-muc/so-van-ban'],
                                code: '009005',
                            },
                            {
                                label: 'Cơ quan',
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/danh-muc/don-vi'],
                                code: '009006',
                            },
                            {
                                label: 'Cơ quan ban hành',
                                icon: 'pi pi-fw pi-globe',
                                routerLink: ['/danh-muc/co-quan-ban-hanh'],
                                code: '009007',
                            },
                            {
                                label: 'Loại văn bản đến tại cơ quan',
                                icon: 'pi pi-fw pi-book',
                                routerLink: ['/danh-muc/loai-van-ban-den'],
                                code: '009008',
                            },
                            {
                                label: 'Loại văn bản đi tại cơ quan',
                                icon: 'pi pi-fw pi-book',
                                routerLink: ['/danh-muc/loai-van-ban-di'],
                                code: '009009',
                            },
                            {
                                label: 'Nhóm đơn vị',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/danh-muc/nhom-don-vi'],
                                code: '009010',
                            },
                            {
                                label: 'Phòng ban',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/danh-muc/phong-ban'],
                                code: '009011',
                            },
                            {
                                label: 'Danh bạ',
                                icon: 'pi pi-fw pi-align-justify',
                                routerLink: ['/danh-muc/danh-ba'],
                                code: '009012',
                            },
                            {
                                label: 'Liên kết',
                                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                                routerLink: ['/danh-muc/lien-ket'],
                                code: '009014',
                            },
                            {
                                label: 'Loại nhiệm vụ',
                                icon: 'pi pi-fw pi-table',
                                routerLink: ['/danh-muc/loai-nhiem-vu'],
                                code: '009015',
                            },
                            {
                                label: 'Tính chất nhiệm vụ',
                                icon: 'pi pi-fw pi-angle-double-right',
                                routerLink: ['/danh-muc/tinh-chat-nhiem-vu'],
                                code: '009016',
                            },
                        ],
                    },
                    {
                        label: 'Hệ thống',
                        icon: 'pi pi-fw pi-wrench',
                        code: '007',
                        items: [
                            {
                                label: 'Thay đổi thông tin',
                                icon: 'pi pi-fw pi-save',
                                routerLink: ['/hethong/quantritaikhoan'],
                                code: '007001',
                            },
                            {
                                label: 'Đổi mật khẩu',
                                icon: 'pi pi-fw pi-refresh',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007002',
                            },
                            {
                                label: 'Quản lý reset mật khẩu',
                                icon: 'pi pi-fw pi-cog',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007013',
                            },
                            {
                                label: 'Quản trị tài khoản',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['/he-thong/tai-khoan'],
                                code: '007005',
                            },
                            {
                                label: 'Quản lý nhãn',
                                icon: 'pi pi-fw pi-tags',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007003',
                            },
                            {
                                label: 'Nhóm tài khoản chung',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007014',
                            },
                            {
                                label: 'Nhóm tài khoản cá nhân',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007007',
                            },
                            {
                                label: 'Nhóm tài khoản đơn vị',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007008',
                            },
                            {
                                label: 'Nhóm tài khoản phòng ban',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007009',
                            },
                            {
                                label: 'Nhóm quyền',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007015',
                            },
                            {
                                label: 'Nhật ký hệ thống',
                                icon: 'pi pi-fw pi-history',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007016',
                            },
                            {
                                label: 'Cài đặt hệ thống',
                                icon: 'pi pi-fw pi-cog',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '007017',
                            },
                        ],
                    },
                    {
                        label: 'Ký số',
                        icon: 'pi pi-fw pi-user-edit',
                        code: '011',
                        items: [
                            {
                                label: 'Trình ký',
                                icon: 'pi pi-fw pi-file-edit',
                                routerLink: ['/hethong/quantritaikhoan'],
                                code: '011001',
                            },
                            {
                                label: 'Ký số trả lại',
                                icon: 'pi pi-fw pi-replay',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '011003',
                            },
                            {
                                label: 'Duyệt văn bản trình ký',
                                icon: 'pi pi-fw pi-check-square',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '011004',
                            },
                            {
                                label: 'Văn bản ký số đã duyệt',
                                icon: 'pi pi-fw pi-check-circle',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '011005',
                            },
                            {
                                label: 'Văn bản chờ ký số',
                                icon: 'pi pi-fw pi-user-edit',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '011006',
                            },
                            {
                                label: 'Văn bản ký số đã ký',
                                icon: 'pi pi-fw pi-check-circle',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '011007',
                            },
                            {
                                label: 'Văn bản chờ phát hành',
                                icon: 'pi pi-fw pi-upload',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '011008',
                            },
                            {
                                label: 'Luồng ký số',
                                icon: 'pi pi-fw pi-sort-alt-slash',
                                routerLink: ['/ky-so/luong-ky-so'],
                                code: '011012',
                            },
                        ],
                    },
                    {
                        label: 'Nhiệm vụ',
                        icon: 'pi pi-fw pi-table',
                        code: '012',
                        items: [
                            {
                                label: 'Tạo nhiệm vụ',
                                icon: 'pi pi-fw pi-window-maximize',
                                routerLink: ['/hethong/quantritaikhoan'],
                                code: '012001',
                            },
                            {
                                label: 'Duyệt nhiệm vụ',
                                icon: 'pi pi-fw pi-check-square',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '012002',
                            },
                            {
                                label: 'Cập nhật tiến độ',
                                icon: 'pi pi-fw pi-upload',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '012003',
                            },
                            {
                                label: 'Duyệt hoàn thành',
                                icon: 'pi pi-fw pi-user-edit',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '012004',
                            },
                        ],
                    },
                    {
                        label: 'Thống kê nhiệm vụ',
                        icon: 'pi pi-fw pi-chart-pie',
                        code: '013',
                        items: [
                            {
                                label: 'Biểu đồ thống kê theo trạng thái',
                                icon: 'pi pi-fw pi-chart-bar',
                                routerLink: ['/hethong/quantritaikhoan'],
                                code: '013001',
                            },
                            {
                                label: 'Bảng thống kê theo lĩnh vực',
                                icon: 'pi pi-fw pi-chart-line',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '013002',
                            },
                            {
                                label: 'Thống kê theo dạng bảng',
                                icon: 'pi pi-fw pi-table',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '013003',
                            },
                            {
                                label: 'Thống kê theo loại nhiệm vụ',
                                icon: 'pi pi-fw pi-chart-bar',
                                routerLink: ['/hethong/nhomquyen'],
                                code: '013004',
                            },
                        ],
                    },
                ],
            },
        ];
        this.lstMenu = [];
        const objUser = this.authService.GetmUserInfo();
        this.taikhoanService
            .GetDataMenu(
                objUser?.userId,
                objUser?.nhomQuyenId,
                objUser?.phongBanLamViecId
            )
            .subscribe(
                (data) => {
                    if (data.isError) {
                        console.log('Dữ liệu không hợp lệ');
                    } else {
                        this.LstMenuCon = data.objData;
                        const filteredItems = this.filterItems(menu);
                        const objHome = {
                            label: '',
                            items: [
                                {
                                    label: 'Trang chủ',
                                    icon: 'pi pi-fw pi-home',
                                    routerLink: ['/'],
                                },
                            ],
                        };
                        this.lstMenu.push(objHome);
                        this.lstMenu.push(filteredItems);
                    }
                },
                (error) => {
                    console.log('Error', error);
                }
            );
    }

    public filterItems(menu: any): any {
        let filteredItems = {
            label: '',
            code: '0',
            items: [],
        };
        menu[0].items.forEach((item) => {
            if (item.items !== undefined) {
                let itemC1 = [...item.items].filter((x) =>
                    this.LstMenuCon.includes(x.code)
                );
                if (itemC1 !== null && itemC1.length > 0) {
                    let itemC2 = item;
                    itemC2.items = itemC1;
                    filteredItems.items.push(itemC2);
                }
            }
        });
        return filteredItems;
    }

    public GetDataNhomQuyen() {
        this.taikhoanService.GetDataNhomQuyenMenu().subscribe(
            (data) => {
                if (data.isError) {
                    console.log('Dữ liệu không hợp lệ');
                } else {
                    this.DonViDangNhap = data.objData;
                }
            },
            (error) => {
                console.log('Error', error);
            }
        );
    }

    /**
     * Lấy những nhóm quyền đang được phân cho người dùng đăng nhập
     */
    public GetOptionNhomQuyen() {
        this.taikhoanService.GetOptionNhomQuyen().subscribe(
            (data) => {
                if (data.isError) {
                    console.log('Dữ liệu không hợp lệ');
                } else {
                    this.nhomQuyenOption = data.objData;
                }
            },
            (error) => {
                console.log('Error', error);
            }
        );
    }
}
