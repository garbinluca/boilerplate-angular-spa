import { Component, inject } from '@angular/core';
import { DayCalories } from "../../models/DayCalories";
import CaloriesService from "../calories.service";
import { ActivatedRoute } from "@angular/router";
import { DayMeal } from "../../models/DayMeal";
import { concatMap } from "rxjs";

@Component({
	selector: 'app-list',
	template: `
		  <div class="container">
				  <div class="row">
						  <div class="col-12">

                  <h2><strong>Calorie</strong></h2>
								  
								  <a class="btn btn-primary" routerLink="/calories/item">Nuovo record</a>
								  
								  <div *ngIf="getTotale(records) as count" class="mt-3 mb-3">
										  Giorno:  <strong>{{ records[0].date | date: 'dd/MM/yy' }}</strong><br />
										  <div class="d-flex align-items-center">Calorie: <strong>{{ count }}</strong> <span *ngIf="count > 1750" class="badge text-bg-danger ms-2">+{{ count - 1750 }}</span></div>
								  </div>
								  
                  <table class="table table-hover">
                      <thead>
                      <tr>
                          <th width="100" class="text-center">Ora</th>
                          <th>Testo</th>
                          <th class="text-center" width="100">KCAL</th>
		                      <th width="100"></th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr *ngFor="let record of records">
                          <td class="text-center" valign="middle">{{ record.created_at | date: 'HH:mm' }}</td>
		                      <td>{{ record.text }}</td>
                          <td class="text-center" valign="middle">
	                            {{ record.count }}
                          </td>
		                      <td>
				                      <div class="btn-group btn-sm">
						                      <button class="btn btn-danger" (click)="delete(record.id)">Elimina</button>
				                      </div>
		                      </td>
                      </tr>
                      </tbody>
                  </table>
						  </div>
				  </div>
		  </div>
  `,
	styles: ``
})
export class DayComponent {

	service = inject(CaloriesService);
	activatedRoute = inject(ActivatedRoute);

	records: DayMeal[] = [];

	constructor() {

		this.service.allByDay(this.getDateParam()).subscribe(records => this.records = records);

	}

	private getDateParam(): string {

		return this.activatedRoute.snapshot.params['date'];

	}

	getTotale(records: DayMeal[]): number {
		return records.reduce((acc, record) => acc + parseInt(`${record.count}`), 0);
	}

	delete(id: string) {

		if (confirm('Confermi di voler eliminare il record?')) {

			this.service.delete(id)
				.pipe(
					concatMap(() => this.service.allByDay(this.getDateParam()))
				)
				.subscribe(records => this.records = records);

		}

	}

}
