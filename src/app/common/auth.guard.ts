import { Injectable } from '@angular/core';      
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';      
import { Observable } from 'rxjs';      
import { AuthService } from './auth.services';
@Injectable({      
   providedIn: 'root'      
})      
export class AuthGuard implements CanActivate {      
    constructor(private router: Router, private authService: AuthService) { }      
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {    
        if (this.isLoggedIn()) {      
            return true;      
        }      
        // navigate to login page as user is not authenticated      
        this.router.navigate(['/dang-nhap']);      
        return false;      
    }      
    public isLoggedIn(): boolean {      
        let status = false;      
        if (localStorage.getItem('isLoggedIn') == "true") {  
            if (this.CheckTokenExpired(this.authService.GetToken())) {
                status = false;
                localStorage.setItem('isLoggedIn','false');    
                localStorage.removeItem('token'); 
            }else{
                status = true;      
            }
        }    
        else {      
            status = false;      
        }      
        return status;      
    }   
    public CheckTokenExpired(token: string) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
}   