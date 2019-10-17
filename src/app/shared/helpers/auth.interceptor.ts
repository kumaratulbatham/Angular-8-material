import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConstants } from '../constants/app.constant';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    currentPermissions: any[];
    constructor(
        private authenticationService: AuthenticationService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with jwt token if available
        const currentUser = this.authenticationService.currentUserValue;
        const authToken = this.authenticationService.getToken();
        if (currentUser && currentUser.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.access_token}`
                }
            });
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
