import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from "./calories/components/list.component";

const routes: Routes = [
	{ path: 'calories', loadChildren: () => import('./calories/feature.module').then(m => m.FeatureModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
