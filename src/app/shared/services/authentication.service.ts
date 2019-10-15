import { Injectable } from '@angular/core';
// import { NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstants } from '../constants/app.constant';
// import { RolePermissions } from '../constants/role-permission.constant';
import { User } from '../models/user';
// import { DataSourceService } from './data-source.service';
import { HttpService } from './http.service';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public currentPermissions: any[];

    constructor(private http: HttpService, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {

        // const formData = new FormData();
        // formData.append('email', username);
        // formData.append('password', password);
        const formData = {
            'email': username,
            'password': password
          };

        return this.http.postFormData(AppConstants.API_AUTH, formData).pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.access_token) {
                console.log(user);
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
