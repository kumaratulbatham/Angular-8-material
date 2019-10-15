import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { AppConstants } from '../constants/app.constant';
// import { RolePermissions } from '../constants/role-permission.constant';
// import { NgxPermissionsService } from 'ngx-permissions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    currentPermissions: any[];
    constructor(
            private authenticationService: AuthenticationService,
            // private ngxPermissionsService: NgxPermissionsService,
            // private rolePermissions: RolePermissions
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with jwt token if available
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.access_token) {
            // Logout after expiry times
            // this.authenticationService.logoutAfterExpires();

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.access_token}`
                }
            });

            // load permissions based on Role
            // this.authenticationService.loadPermission();

        } else {
            // First time authentication
            const basicAuth = 'Basic ' + btoa(AppConstants.API_SECRET_KEY + ':' + AppConstants.API_SECRET_PASSWORD);
            request = request.clone({
                setHeaders: {
                    Authorization: basicAuth,
                }
            });
        }

        return next.handle(request);
    }
}
