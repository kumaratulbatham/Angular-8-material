import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  onLogin() {
      console.log('Sign Up Here')
      this.router.navigate(['/login']);
  }

  goForgotPassword(){
      this.router.navigate(['/forgot-password']);
  }

}
