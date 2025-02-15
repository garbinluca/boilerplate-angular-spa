import { Component, inject } from '@angular/core';
import { DayCalories } from "../../models/DayCalories";
import CaloriesService from "../calories.service";

@Component({
  selector: 'app-list',
  template: `
		  <div class="container">
				  <div class="row">
						  <div class="col-12">
								  
								  <h2><strong>Calorie</strong></h2>
								  
								  <a class="btn btn-primary mb-2" routerLink="/calories/item">Nuovo record</a>
								  
                  <table class="table table-hover">
                      <thead>
                      <tr>
                          <th width="100">Data</th>
                          <th>Conteggio KCAL</th>
		                      <th width="100"></th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr *ngFor="let record of records">
                          <td valign="middle">{{ record.date | date: 'dd/MM/yy' }}</td>
                          <td valign="middle">
		                          <div class="d-flex align-items-center">
		                          	{{ record.total_count }}
		                          	<span *ngIf="record.total_count > 1750" class="badge text-bg-danger ms-2">+{{ record.total_count - 1750 }}</span>
                              </div>
                          </td>
		                      <td>
				                      <a routerLink="/calories/date/{{ record.date }}" class="btn btn-sm btn-outline-primary">Dettaglio</a>
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
export class ListComponent {

	records: DayCalories[] = [];

	service = inject(CaloriesService);

	constructor() {

		this.service.all().subscribe(records => this.records = records);

	}

}
