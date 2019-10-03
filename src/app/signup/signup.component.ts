import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AppConstants } from 'src/app/shared/constants/app.constant';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder,private router: Router) {

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

  goToLogin(){
      this.router.navigate(['/login']);
  }

}
