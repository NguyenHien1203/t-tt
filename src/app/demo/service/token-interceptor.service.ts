import { CookieService } from 'ngx-cookie-service';
import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';

@Injectable({
    providedIn: 'root',
})
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router,
        private cookieService: CookieService
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
      debugger;
        console.log('Interceptor is called');

        const token = this.authService.GetToken();
        console.log(token);

        if (token && this.authService.CheckTokenExpired(token)) {
            // Token hết hạn, làm mới nó

            return this.authService.RefreshToken().pipe(
                switchMap((data) => {
                    if (!data.isError) {
                        // Làm mới thành công, cập nhật token
                        this.cookieService.set(
                          'token',
                          JSON.stringify(data.objData)
                      );
                        const newRequest = request.clone({
                            setHeaders: {
                                Authorization: `Bearer ${data.objData}`,
                            },
                        });
                        return next.handle(newRequest);
                    } else {
                        // Làm mới thất bại, điều hướng đến trang đăng nhập hoặc xử lý lỗi theo cách bạn muốn
                        this.logout();
                        // Bạn cũng có thể chuyển hướng đến trang đăng nhập nếu cần
                        // this.router.navigate(['/login']);
                        return throwError('Làm mới token thất bại');
                    }
                })
            );
        } else {
            // Token chưa hết hạn, tiếp tục với yêu cầu
            if (token) {
                const authRequest = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return next.handle(authRequest);
            } else {
                // Không có token, tiếp tục với yêu cầu như bình thường
                this.logout();
                return throwError('Token invalid');
            }
        }
    }

    public logout() {
        this.router.navigate(['/login']);
    }
}

export const httpInterceptorService = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
};
