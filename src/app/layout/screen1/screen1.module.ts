import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Screen1Component } from './screen1.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Screen1RoutingModule } from './screen1-routing.module';
import { DemoMaterialModule } from '../../../material-module';


@NgModule({
  declarations: [Screen1Component],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    Screen1RoutingModule,
    DemoMaterialModule,
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ]
})
export class Screen1Module { }
