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
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate)
        }
    }

    private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(["/login"]);
    }

    private clearAuthData() {
        this.currentUserSubject.next(null);
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('expiresin');
        localStorage.removeItem('currentUser');
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
                console.log(user);
                const token = user.access_token;
                this.token = token;
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                // set the expiry time while login
                const time_to_login = Date.now() + AppConstants.EXPIRES_IN;
                localStorage.setItem('expiresin', JSON.stringify(time_to_login));
                this.currentUserSubject.next(user);
                // this.loadPermission();
            }
            return user;
        }
        ));
    }

    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
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

    // logout() {
    //     // remove user from local storage to log user out
    //     let paramData = {
    //         "auditEvent": "LOGOUT",
    //     };
    //     this.sendPrintConsentAudit(paramData).subscribe();
    //     localStorage.removeItem('currentUser');
    //     this.currentUserSubject.next(null);
    //     localStorage.removeItem('disclaimer'); // remove disclaimer for log out to GP user
    //     localStorage.removeItem("patientDisclaimer"); // remove patient disclaimer for log out to GP user
    //     localStorage.removeItem('stepIdentified');
    //     localStorage.removeItem('expiresin');
    //     this.dataSourceService.setData('');
    //     this.dataSourceService.setUploadDocumentFlag('');
    //     localStorage.clear(); // clear all storage value from localstorage
    //     this.router.navigate(['/login']);
    // }

    /* Logout from the application after expiry time */
    // logoutAfterExpires(){
    //     const timer = JSON.parse(localStorage.getItem('expiresin'));
    //     if (timer && (Date.now() > timer)) {
    //         this.logout();
    //     }
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
