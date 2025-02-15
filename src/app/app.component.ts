import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from "./auth/auth.service";

@Component({
	selector: 'app-root',
	template: `

      <ng-container *ngIf="isAuthenticated$ | async as isAuthenticated; else showLogin">
          <div class="container">
              <div class="row">
                  <div class="col-12 pt-3 pb-3">
                      <div class="d-flex justify-content-between">
                          <div class="d-flex align-items-center" style="width: 100%">
                              <a href="/" class="navbar-brand"><strong>MyAPP</strong></a>
                              <div class="ms-4 d-flex align-items-center" style="flex: 1">
                                  <a class="me-2" routerLink="/calories">Calorie</a>
                                  <a class="" routerLink="/workout">Workout</a>
                              </div>
                          </div>
                          <div>
                              <button class="btn btn-outline-primary btn-sm" (click)="logout()">Logout</button>
                          </div>
                      </div>
		                  <hr>
                  </div>
              </div>
          </div>

          <router-outlet></router-outlet>

      </ng-container>
      <ng-template #showLogin>
		      <div class="Fullscreen">
              <button class="btn btn-primary" type="button" (click)="login()">Login</button>
		      </div>
      </ng-template>
	`,
	styles: []
})
export class AppComponent implements OnInit {


	// lucagarbin2@gmail.com
	// jutcuj-xamfE5-bevdaq

	authService = inject(AuthService);
	userInfo$ = this.authService.userInfo$;

	isAuthenticated$ = this.authService.isAuthenticated$;

	ngOnInit(): void {

		this.authService.initialize().subscribe();

	}

	login() {

		this.authService.login();

	}

	logout() {

		this.authService.logout();

	}

}
