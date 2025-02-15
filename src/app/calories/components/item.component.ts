import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import CaloriesService from "../calories.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-item',
  template: `
	  <div class="container">
			  <div class="row">
					  <div class="col-12">
                <h2><strong>Calorie</strong></h2>

							  <form [formGroup]="form" (submit)="handleSubmit($event)">
									  
									  <label>Data</label>
									  <input type="date" formControlName="date" class="form-control" style="width: auto">
									  
									  <label class="mt-3">Testo</label>
									  <textarea rows="5" formControlName="text" class="form-control"></textarea>
									  
									  <div class="mt-3">
											  <button (click)="handleItem('colazione')" type="button" class="btn btn-sm btn-outline-primary">Colazione</button>
									  </div>
									  
									  <hr>
									  
									  <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Salva</button>
									  </div>
									  
									  
							  </form>
					  </div>
			  </div>
	  </div>
  `,
  styles: ``
})
export class ItemComponent {

	fb = inject(FormBuilder);
	service = inject(CaloriesService)
	router = inject(Router)

	form: FormGroup = this.fb.group({
		date: this.fb.control(null, [Validators.required]),
		text: this.fb.control(null, [Validators.required]),
	})

	handleSubmit($event: SubmitEvent) {

		this.service.create(this.form.value).subscribe(() => {

			this.router.navigateByUrl('/calories');

		})

	}

	handleItem(shortcut: string) {

		if (shortcut == "colazione") {

			this.form.patchValue({
				text: 'mezza tazza di latte oatly di avena senza zuccheri aggiunti, un caffè e tre fette biscottate con marmellata',
			})

		}

	}
}
