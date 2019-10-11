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
        return this.httpClient.post('api/signup', postdata)
            .pipe(
                map(
                    (response: any) => { return response; },
                    (error: any) => { console.log('Error message'); }
                )
            );

        return this.http.get(AppConstants.SIGNUP_URL)
            .pipe(
                map(
                    (response: any) => { return response; },
                    (error: any) => { console.log('Error message'); }
                )
            );

    }
}
