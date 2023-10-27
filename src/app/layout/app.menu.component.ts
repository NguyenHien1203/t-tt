import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            
            {
                label: 'TRANG CHỦ',
                
                items: [
                    {
                        label: 'Văn bản nhận',
                        icon: 'pi pi-fw pi-book',
                        items: [
                            {
                                label: 'Cập nhật mới',
                                icon: 'pi pi-fw pi-file-edit',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Tiếp nhận văn bản',
                                icon: 'pi pi-fw pi-verified',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            { 
                                label: 'Quản trị văn bản',
                                icon: 'pi pi-fw pi-box',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Tạo công việc',
                                icon: 'pi pi-fw pi-file-edit',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Cập nhật công việc',
                                icon: 'pi pi-fw pi-file-edit',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Tra cứu đơn giản',
                                icon: 'pi pi-fw pi-search',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Văn bản đã từ chối',
                                icon: 'pi pi-fw pi-minus',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Sổ văn bản đến',
                                icon: 'pi pi-fw pi-book',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Tra cứu nâng cao',
                                icon: 'pi pi-fw pi-search-plus',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Tìm kiếm theo sổ văn bản',
                                icon: 'pi pi-fw pi-search-plus',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Văn bản đến liên quan',
                                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Văn bản đến liên thông',
                                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Văn bản phải báo cáo',
                                icon: 'pi pi-fw pi-send',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Văn bản chờ thu hồi',
                                icon: 'pi pi-fw pi-spinner',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Văn bản thu hồi',
                                icon: 'pi pi-fw  pi-replay',
                                outerLink: ['/hethong/nhomquyen']
                            },
                        ]
                    },
                    {
                        label: 'Văn bản đi',
                        icon: 'pi pi-fw pi-book',
                        items: [
                            {
                                label: 'Cập nhật mới',
                                icon: 'pi pi-fw pi-file-edit',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Quản trị văn bản đi',
                                icon: 'pi pi-fw pi-box',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Tra cứu đơn giản',
                                icon: 'pi pi-fw pi-search',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Gủi văn bản đi',
                                icon: 'pi pi-fw pi-send',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Theo dõi văn bản đi',
                                icon: 'pi pi-fw pi-arrow-circle-right',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Sổ văn bản đi',
                                icon: 'pi pi-fw pi-book',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Văn bản đi liên thông',
                                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Văn bản nghiệp vụ',
                                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Văn bản đi liên quan',
                                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Tra cứu nâng cao',
                                icon: 'pi pi-fw pi-search-plus',
                                outerLink: ['/hethong/nhomquyen']
                            },
                        ]
                    },
                    {
                        label: 'Quản lý công việc',
                        icon: 'pi pi-fw pi-desktop',
                        items: [
                            {
                                label: 'Quản lý công việc phát sinh',
                                icon: 'pi pi-fw pi-clone',
                                outerLink: ['/danhmuc/chucdanh']
                            },
                            {
                                label: 'Xử lý công việc',
                                icon: 'pi pi-fw pi-check-square',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                            {
                                label: 'Theo dõi tiến độ',
                                icon: 'pi pi-fw pi-chevron-circle-right',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                            {
                                label: 'Danh sách bàn giao công việc',
                                icon: 'pi pi-fw pi-book',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                            {
                                label: 'Duyệt bàn giao công việc',
                                icon: 'pi pi-fw pi-check-circle',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                            {
                                label: 'Danh sách đề xuất công việc',
                                icon: 'pi pi-fw pi-book',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                            {
                                label: 'Duyệt đề xuất công việc',
                                icon: 'pi pi-fw pi-check-circle',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                        ]
                    },
                    {
                        label: 'Trao đổi thông tin',
                        icon: 'pi pi-fw pi-inbox',
                        items: [
                            {
                                label: 'Soạn thư',
                                icon: 'pi pi-fw pi-file-edit',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Hộp thư đến',
                                icon: 'pi pi-fw pi-verified',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Hộp thư đi',
                                icon: 'pi pi-fw pi-send',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Thư nháp',
                                icon: 'pi pi-fw pi-pause',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Thư quan trọng',
                                icon: 'pi pi-fw pi-flag-fill',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Thêm nhãn',
                                icon: 'pi pi-fw pi-tags',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                        ]
                    },
                    {
                        label: 'Hồ sơ công việc',
                        icon: 'pi pi-fw pi-briefcase',
                        items: [
                            {
                                label: 'Danh mục HSCV cơ quan',
                                icon: 'pi pi-fw pi-sitemap',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Lưu trữ HSCV cơ quan',
                                icon: 'pi pi-fw pi-clone',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Quản lý hồ sơ cơ quan',
                                icon: 'pi pi-fw pi-folder-open',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Danh mục HSCV cá nhân',
                                icon: 'pi pi-fw pi-sitemap',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Lưu trữ HSCV cá nhân',
                                icon: 'pi pi-fw pi-clone',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Quản lý hồ sơ cá nhân',
                                icon: 'pi pi-fw pi-folder-open',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Thêm mới phiếu trình',
                                icon: 'pi pi-fw pi-pencil',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Duyệt phiếu trình',
                                icon: 'pi pi-fw pi-check-square',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Ký phiếu trình',
                                icon: 'pi pi-fw pi-user-edit',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                        ]
                    },
                    {
                        label: 'Lịch',
                        icon: 'pi pi-fw pi-calendar',
                        items: [
                            {
                                label: 'Lịch cá nhân',
                                icon: 'pi pi-fw pi-user-plus',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Lịch phòng ban',
                                icon: 'pi pi-fw pi-calendar-plus',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Quản trị lịch phòng ban',
                                icon: 'pi pi-fw pi-calendar-plus',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Lịch cơ quan',
                                icon: 'pi pi-fw pi-calendar-plus',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Lịch UBND Tỉnh',
                                icon: 'pi pi-fw pi-calendar-plus',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Lịch HĐND & ĐBQH',
                                icon: 'pi pi-fw pi-calendar-plus',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Lịch Tỉnh Ủy',
                                icon: 'pi pi-fw pi-calendar-plus',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Lịch họp',
                                icon: 'pi pi-fw pi-calendar-plus',
                                outerLink: ['/hethong/nhomquyen']
                            },
                        ]
                    },
                    {
                        label: 'Thông tin khác',
                        icon: 'pi pi-fw pi-plus-circle',
                        items: [
                            {
                                label: 'Quản lý thông báo',
                                icon: 'pi pi-fw pi-circle-fill',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Xem thông báo',
                                icon: 'pi pi-fw pi-circle',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Quản lý bảng lương',
                                icon: 'pi pi-fw pi-money-bill',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Xem bảng lương',
                                icon: 'pi pi-fw pi-euro',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Quản lý tài liệu hướng dẫn',
                                icon: 'pi pi-fw pi-directions',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Tài liệu hướng dẫn',
                                icon: 'pi pi-fw pi-info-circle',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Quản lý chuyên mục câu hỏi',
                                icon: 'pi pi-fw pi-question-circle',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Hoạt động sắp tới',
                                icon: 'pi pi-fw pi-arrow-circle-right',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Quản lý câu hỏi thường gặp',
                                icon: 'pi pi-fw pi-question-circle',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Câu hỏi thường gặp',
                                icon: 'pi pi-fw pi-question',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Quản lý thăm dò ý kiến',
                                icon: 'pi pi-fw pi-globe',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Thăm dò ý kiến',
                                icon: 'pi pi-fw pi-share-alt',
                                outerLink: ['/hethong/nhomquyen']
                            },
                        ]
                    },
                    {
                        label: 'Thống kê',
                        icon: 'pi pi-fw pi-chart-line',
                        items: [
                            {
                                label: 'Văn bản nhận',
                                icon: 'pi pi-fw pi-file-edit',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Văn bản đi',
                                icon: 'pi pi-fw pi-file-edit',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Thống kê xử lý công việc',
                                icon: 'pi pi-fw pi-box',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Mức độ truy cập',
                                icon: 'pi pi-fw pi-stopwatch',
                                outerLink: ['/hethong/nhomquyen']
                            },
                        ]
                    },
                    {
                        label: 'Danh mục',
                        icon: 'pi pi-fw pi-sort-amount-up-alt',
                        items: [
                            {
                                label: 'Chức danh',
                                icon: 'pi pi-fw pi-users',
                                outerLink: ['/danhmuc/chucdanh']
                            },
                            {
                                label: 'Lĩnh vực',
                                icon: 'pi pi-fw pi-list',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                            {
                                label: 'Loại hồ sơ',
                                icon: 'pi pi-fw pi-folder',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                            {
                                label: 'Loại văn bản',
                                icon: 'pi pi-fw pi-sliders-v',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                            {
                                label: 'Sổ văn bản',
                                icon: 'pi pi-fw pi-book',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                            {
                                label: 'Cơ quan',
                                icon: 'pi pi-fw pi-building',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                            {
                                label: 'Cơ quan ban hành',
                                icon: 'pi pi-fw pi-globe',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                            {
                                label: 'Loại văn bản đến tại cơ quan',
                                icon: 'pi pi-fw pi-book',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                            {
                                label: 'Loại văn bản đi tại cơ quan',
                                icon: 'pi pi-fw pi-book',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                            {
                                label: 'Nhóm đơn vị',
                                icon: 'pi pi-fw pi-users',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                            {
                                label: 'Phòng ban',
                                icon: 'pi pi-fw pi-users',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                            {
                                label: 'Danh bạ',
                                icon: 'pi pi-fw pi-align-justify',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                            {
                                label: 'Danh mục liên kết',
                                icon: 'pi pi-fw pi-arrow-right-arrow-left',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                            {
                                label: 'Loại nhiệm vụ',
                                icon: 'pi pi-fw pi-table',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                            {
                                label: 'Tính chất nhiệm vụ',
                                icon: 'pi pi-fw pi-angle-double-right',
                                outerLink: ['/danhmuc/linhvuc']
                            },
                        ]
                    },
                    {
                        label: 'Hệ thống',
                        icon: 'pi pi-fw pi-wrench',
                        items: [
                            {
                                label: 'Thay đổi thông tin',
                                icon: 'pi pi-fw pi-save',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Đổi mật khẩu',
                                icon: 'pi pi-fw pi-refresh',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Quản lý reset mật khẩu',
                                icon: 'pi pi-fw pi-cog',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Quản trị tài khoản',
                                icon: 'pi pi-fw pi-user-plus',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Quản lý nhãn',
                                icon: 'pi pi-fw pi-tags',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Nhóm tài khoản chung',
                                icon: 'pi pi-fw pi-users',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Nhóm tài khoản cá nhân',
                                icon: 'pi pi-fw pi-users',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Nhóm tài khoản đơn vị',
                                icon: 'pi pi-fw pi-users',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Nhóm tài khoản phòng ban',
                                icon: 'pi pi-fw pi-users',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Nhóm quyền',
                                icon: 'pi pi-fw pi-plus',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Nhật ký hệ thống',
                                icon: 'pi pi-fw pi-history',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Cài đặt hệ thống',
                                icon: 'pi pi-fw pi-cog',
                                outerLink: ['/hethong/nhomquyen']
                            },
                        ]
                    },
                    {
                        label: 'Ký số',
                        icon: 'pi pi-fw pi-user-edit',
                        items: [
                            {
                                label: 'Trình ký',
                                icon: 'pi pi-fw pi-file-edit',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Ký số trả lại',
                                icon: 'pi pi-fw pi-replay',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Duyệt văn bản trình ký',
                                icon: 'pi pi-fw pi-check-square',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Văn bản ký số đã duyệt',
                                icon: 'pi pi-fw pi-check-circle',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Văn bản chờ ký số',
                                icon: 'pi pi-fw pi-user-edit',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Văn bản ký số đã ký',
                                icon: 'pi pi-fw pi-check-circle',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Văn bản chờ phát hành',
                                icon: 'pi pi-fw pi-upload',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Luồng ký số',
                                icon: 'pi pi-fw pi-sort-alt-slash',
                                outerLink: ['/hethong/nhomquyen']
                            },
                        ]
                    },
                    {
                        label: 'Nhiệm vụ',
                        icon: 'pi pi-fw pi-table',
                        items: [
                            {
                                label: 'Tạo nhiệm vụ',
                                icon: 'pi pi-fw pi-window-maximize',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Duyệt nhiệm vụ',
                                icon: 'pi pi-fw pi-check-square',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Cập nhật tiến độ',
                                icon: 'pi pi-fw pi-upload',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Duyệt hoàn thành',
                                icon: 'pi pi-fw pi-user-edit',
                                outerLink: ['/hethong/nhomquyen']
                            },
                        ]
                    },
                    {
                        label: 'Thống kê nhiệm vụ',
                        icon: 'pi pi-fw pi-chart-pie',
                        items: [
                            {
                                label: 'Biểu đồ thống kê theo trạng thái',
                                icon: 'pi pi-fw pi-chart-bar',
                                outerLink: ['/hethong/quantritaikhoan']
                            },
                            {
                                label: 'Bảng thống kê theo lĩnh vực',
                                icon: 'pi pi-fw pi-chart-line',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Thống kê theo dạng bảng',
                                icon: 'pi pi-fw pi-table',
                                outerLink: ['/hethong/nhomquyen']
                            },
                            {
                                label: 'Thống kê theo loại nhiệm vụ',
                                icon: 'pi pi-fw pi-chart-bar',
                                outerLink: ['/hethong/nhomquyen']
                            },
                        ]
                    },
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                    { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] },
                    
                ]
            },
            {
                label: 'Prime Blocks',
                items: [
                    { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                    { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                ]
            },
            {
                label: 'Utilities',
                items: [
                    { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
                    { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Timeline',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    },
                ]
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
                    }
                ]
            }
        ];
    }
}
