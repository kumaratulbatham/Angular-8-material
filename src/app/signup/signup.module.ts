import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../material-module';

import { AuthenticationService } from '../shared/services/authentication.service';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup.routing.module';


@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  providers: [ AuthenticationService ]
})
export class SignupModule { }
