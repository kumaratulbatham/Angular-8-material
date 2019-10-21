import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppConstants } from '../constants/app.constant';
import { User } from '../models/user';
import { HttpService } from './http.service';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public currentPermissions: any[];
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpService, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }


    // For signup functionality
    signup(postdata: any) {
        return this.http.post(AppConstants.SIGNUP_URL, postdata)
            .pipe(
                map(
                    (response: any) => { return response; },
                    (error: any) => { console.log('Error message'); }
                )
            );
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    private getAuthData() {
        const token = localStorage.getItem("access_token");
        const expirationDate = localStorage.getItem("expiresIn");
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate)
        }
    }

    /* Logout from the application after expiry time */
    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    logout() {
        this.token = '';
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.clearAuthData();
        console.log(localStorage)
        clearTimeout(this.tokenTimer);
        this.router.navigate(['/login']);
        
    }

    private clearAuthData() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('expiresIn');
        localStorage.clear();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        const formData = {
            'email': username,
            'password': password
        };
        return this.http.postFormData(AppConstants.API_AUTH, formData).pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.access_token) {
                const token = user.access_token;
                this.token = token;
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                const expiresInDuration = user.expiresIn;
                this.setAuthTimer(expiresInDuration);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                this.currentUserSubject.next(user);
               
                console.log(user);
                this.saveAuthData(token, expirationDate);
            }
            return user;
        }
        ));
    }

    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem("access_token", token);
        localStorage.setItem("expiresIn", expirationDate.toISOString());
    }

    // loadPermission() {
    //     const currentUser = this.currentUserValue;

    //     // load permissions based on Role
    //     let permissions: any = [];
    //     currentUser.assignedRoles.forEach(x => {
    //         const perm: string[] = this.rolePermissions.getPermissions(x);
    //         this.currentPermissions = [];
    //         permissions = permissions.concat(perm);
    //         Array.prototype.push.apply(this.currentPermissions, permissions || []);
    //     });

    //     this.ngxPermissionsService.loadPermissions(permissions);
    // }

    /* API for Get Patient Guardian Type */
    // sendPrintConsentAudit(postData: any) {
    //     return this.http.post(AppConstants.API_PRINT_LOG_AUDIT_EVENT_URL, postData)
    //         .pipe(map(
    //             (data: any) => { },
    //             error => {
    //                 this.logger.error('Print Log Audit Data Not Found');
    //             }));
    // }
}
