import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from "./components/list.component";
import { ItemComponent } from "./components/item.component";
import { DayComponent } from "./components/day.component";

const routes: Routes = [
	{ path: '', component: ListComponent },
	{ path: 'item', component: ItemComponent },
	{ path: 'date/:date', component: DayComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
