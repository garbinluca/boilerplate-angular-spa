import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list.component';
import { ItemComponent } from './components/item.component';
import { FeatureRoutingModule } from "./feature-routing.module";
import CaloriesService from "./calories.service";
import { ReactiveFormsModule } from "@angular/forms";
import { DayComponent } from "./components/day.component";



@NgModule({
  declarations: [
    ListComponent,
    ItemComponent,
	  DayComponent,
  ],
	imports: [
		CommonModule,
		FeatureRoutingModule,
		ReactiveFormsModule
	]
})
export class FeatureModule { }
