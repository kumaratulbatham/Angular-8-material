import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcherService } from 'src/app/shared/services/error.state.matcher.service';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  matcher: any;

  constructor(private fb: FormBuilder, private router: Router,
    private errorState: ErrorStateMatcherService, private signupService: SignupService) {
    this.matcher = this.errorState;
  }

  ngOnInit() {
    this.getSignUpForm();
    this.getUserData();
  }

  getSignUpForm() {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), Validators.maxLength(50)]],
      mobileNo: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(10)]],
      emailAddress: ['', [Validators.required, Validators.email, Validators.maxLength(64)]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8),]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(16)]]
    });
  }

  onLogin() {
    if (this.signUpForm.invalid == true) {
      return;
    }
    const paramData = {
      'name': this.signUpForm.value.name,
      'mobile_no': this.signUpForm.value.mobileNo,
      'email': this.signUpForm.value.emailAddress,
      'password': this.signUpForm.value.password
    };
    this.signupService.signup(paramData).subscribe(result => {
      console.log(result);
      // this.router.navigate(['/login']);
    },
      error => {
        console.log(error);
      }
    );
  }

  getUserData(){
    this.signupService.getAllUsers().subscribe(result => {
      console.log(result);
      // this.router.navigate(['/login']);
    },
      error => {
        console.log(error);
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
