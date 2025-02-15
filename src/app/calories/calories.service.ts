import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DayCalories } from "../models/DayCalories";
import { DayMealData } from "../models/DayMealData";
import { DayMeal } from "../models/DayMeal";
import { environment } from "../../environment/environment";

@Injectable({
	providedIn: 'root'
})
export default class CaloriesService {

	httpClient = inject(HttpClient)

	endpoint: string = environment.calorie.endpoint

	all(): Observable<DayCalories[]> {

		return this.httpClient
			.get<DayCalories[]>(`${this.endpoint}/records`)

	}

	allByDay(date: string): Observable<DayMeal[]> {

		let queryString = '';
		queryString += '&date=' + date;

		return this.httpClient
			.get<DayMeal[]>(`${this.endpoint}/records?${queryString}`)

	}

	create(data: DayMealData): Observable<DayMeal> {

		return this.httpClient
			.post<DayMeal>(`${this.endpoint}/records`, data)

	}

	update(id: string, data: DayMealData): Observable<DayMeal> {

		return this.httpClient
			.put<DayMeal>(`${this.endpoint}/records/${id}`, data)

	}

	delete(id: string): Observable<any> {

		return this.httpClient
			.delete<DayMeal>(`${this.endpoint}/records/${id}`)

	}

}
