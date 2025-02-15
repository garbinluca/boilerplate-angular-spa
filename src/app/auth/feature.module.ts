import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FeatureRoutingModule } from "./feature-routing.module";



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
	  FeatureRoutingModule
  ]
})
export class FeatureModule { }
