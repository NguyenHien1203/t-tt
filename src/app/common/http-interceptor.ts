import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { SpinnerService } from 'src/app/common/spinner.service';
import { AuthService } from './auth.services';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

     constructor(private authService: AuthService, private spinnerService: SpinnerService) { }

     intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
        this.spinnerService.show();
    
        return next.handle(req).pipe(
          tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.spinnerService.hide();
            }
          }),
          catchError((error) => {
            this.spinnerService.hide();
    
            if (error.status === 401) {
              // Unauthorized - try to refresh token
              return this.authService.RefreshToken().pipe(
                switchMap(() => {
                  // If token refresh is successful, retry the original request
                  const newReq = req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${this.authService.GetToken()}`,
                    },
                  });
                  return next.handle(newReq);
                }),
                catchError((refreshError) => {
                  // If token refresh fails, handle the error or redirect to login
                  // For example, you can logout the user or redirect to login page
                  console.error('Token refresh failed:', refreshError);
                  return throwError(refreshError);
                })
              );
            }
    
            // If the error is not a 401, just rethrow it
            return throwError(error);
          })
        );
      }
    
}