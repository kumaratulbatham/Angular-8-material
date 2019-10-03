import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
        private errorState: ErrorStateMatcherService) {
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
        console.log(this.loginForm.controls);
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['/dashboard']);
    }

    goForgotPassword() {
        this.router.navigate(['/forgot-password']);
    }

    goToSignup() {
        this.router.navigate(['/signup']);
    }
}
