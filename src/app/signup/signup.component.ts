import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcherService } from 'src/app/shared/services/error.state.matcher.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  matcher: any;

  constructor(private fb: FormBuilder, private router: Router,
    private errorState: ErrorStateMatcherService) {
    this.matcher = this.errorState;
  }

  ngOnInit() {
    this.getSignUpForm();
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
    console.log(this.signUpForm.controls);
    this.router.navigate(['/login']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
