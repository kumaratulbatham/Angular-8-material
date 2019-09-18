import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators, FormControl, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AppConstants } from 'src/app/shared/constants/app.constant';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.scss']
})
export class Screen1Component implements OnInit {
  addUserForm: FormGroup;
  titlesArray : any; 
  matcher = new MyErrorStateMatcher();
  genderArray: any;
  userRole: any;

  constructor(private fb: FormBuilder) { 
    this.genderArray = AppConstants.gender;
    this.titlesArray = AppConstants.title;
    // this.userRole = AppConstants.role;
  }

  ngOnInit() {
    this.getUserForm();
    console.log(this.titlesArray)
  }

  getUserForm(){
    this.addUserForm = this.fb.group({
      title: ['', [Validators.required]],
      middleName: ['', [Validators.required,Validators.pattern("^[a-zA-Z]*$"), Validators.maxLength(30)]],
      firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$"), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$"), Validators.maxLength(30)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      userName: ['', [Validators.pattern("^[a-zA-Z0-9_]*$"), Validators.required, Validators.maxLength(25), Validators.minLength(6)]],
      emailAddress: ['', [Validators.email, Validators.required, Validators.maxLength(64)]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8),]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(16)]],
      addressLine1: ['', [Validators.required, Validators.maxLength(50)]],
      addressLine2: ['', [Validators.required, Validators.maxLength(50)]],
      addressLine3: ['', [Validators.required, Validators.maxLength(50)]],
      pinCode: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(5)]],
      mobileNo: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(10)]],
      phoneNo: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(10)]],
      country: ['', [Validators.required]],
      state: ['',[Validators.required]],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]],
      role: ['', Validators.required],
    });
  }

  onsubmit(){
    if(this.addUserForm.invalid == true){
      return;
    }
    console.log(this.addUserForm.value)

  }

}
