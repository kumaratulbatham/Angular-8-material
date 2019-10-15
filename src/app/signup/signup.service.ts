import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConstants } from '../shared/constants/app.constant';
import { HttpService } from '../shared/services/http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SignupService {
    constructor(private http: HttpService, private httpClient: HttpClient) { }

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
    
    // For All User Data functionality
    getAllUsers() {
        return this.http.get(AppConstants.GET_ALL_USERS_LIST)
            .pipe(
                map(
                    (response: any) => { return response; },
                    (error: any) => { console.log('Error message'); }
                )
            );

    }
}
