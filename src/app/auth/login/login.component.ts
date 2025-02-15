import { Component, inject, OnInit } from '@angular/core';
import { OidcSecurityService } from "angular-auth-oidc-client";

@Component({
  selector: 'app-login',
  template: `
    <p>
		    <button type="button" (click)="login()">Login</button>
    </p>

    <div *ngIf="isAuthenticated">

        <br />

        Is Authenticated: {{ isAuthenticated }}

        <br />
        userData
        <pre>{{ userData$ | async | json }}</pre>

        <br />
    </div>
    
  `,
  styles: ``
})
export class LoginComponent {

	private readonly oidcSecurityService = inject(OidcSecurityService);

	configuration$ = this.oidcSecurityService.getConfiguration();

	userData$ = this.oidcSecurityService.userData$;

	isAuthenticated = false;

	login(): void {
		this.oidcSecurityService.authorize();
	}

}
