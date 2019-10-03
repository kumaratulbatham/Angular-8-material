import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcherService } from 'src/app/shared/services/error.state.matcher.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  matcher: any;

  constructor(private fb: FormBuilder, private router: Router,
    private errorState: ErrorStateMatcherService) { 
      this.matcher = this.errorState;
    }

  ngOnInit() {
    this.getForgotPasswordForm();
  }

  getForgotPasswordForm() {
    this.forgotPasswordForm = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email, Validators.maxLength(64)]]
    });
  }

  goHome(){
    this.router.navigate(['/dashboard']);
  }

  onSubmit(){
    if (this.forgotPasswordForm.invalid == true) {
      return;
    }
    console.log(this.forgotPasswordForm.controls);
  }

}
