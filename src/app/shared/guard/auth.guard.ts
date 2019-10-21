import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
    // userIsAuthenticated = false;
    // private authListenerSubs: Subscription;
    constructor(private authService: AuthenticationService, private router: Router) {
        // this.userIsAuthenticated = this.authService.isAuthenticated;
        // this.authListenerSubs = this.authService
        //     .getAuthStatusListener()
        //     .subscribe(isAuthenticated => {
        //         this.userIsAuthenticated = isAuthenticated;
        //     });
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const currentUser = this.authService.currentUserValue;

        const isAuth = this.authService.isAuthenticated;
        if (!isAuth) {
            this.router.navigate(['/login']);
        }
        return isAuth;


        /** 
         console.log(currentUser, '-----------------', route.data)
         if (currentUser) {
             // check if route is restricted by role
             if (route.data.roles && route.data.roles.indexOf(currentUser.assignedRoles) === -1) {
                 // role not authorised so redirect to home page
                 this.router.navigate(['/']);
                 return false;
             }
             //  authorised so return true
             return true;
         }
         // not logged in so redirect to login page with the return url
         //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
         this.router.navigate(['/login']);
         return false;
         **/

    }
}
