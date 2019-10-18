import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ErrorStateMatcherService } from 'src/app/shared/services/error.state.matcher.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    matcher: any;
    constructor(private fb: FormBuilder, private router: Router,
        private errorState: ErrorStateMatcherService,
        private authService: AuthenticationService) {
        this.matcher = this.errorState;
    }

    ngOnInit() {
        this.getLoginForm();
    }

    getLoginForm() {
        this.loginForm = this.fb.group({
            emailAddress: ['', [Validators.required, Validators.email, Validators.maxLength(64)]],
            password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8),]],
        });
    }

    onLogin() {
        if (this.loginForm.invalid == true) {
            return;
        }
        this.authService.login(this.loginForm.value.emailAddress, this.loginForm.value.password)
            .pipe(first())
            .subscribe(
                (data: any) => {
                    if (data.access_token) {
                        console.log(data);
                        this.router.navigate(['/dashboard']);
                    } else {
                        console.log('Invalid Email or Password');
                    }
                },
                (error: any) => {
                    console.log(error);
                }
            );
    }

    goForgotPassword() {
        this.router.navigate(['/forgot-password']);
    }

    goToSignup() {
        this.router.navigate(['/signup']);
    }
}
