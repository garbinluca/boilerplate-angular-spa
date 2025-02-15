import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(
		private oidcSecurityService: OidcSecurityService,
		private router: Router
	) {}

	canActivate() {
		return this.oidcSecurityService.isAuthenticated$.pipe(
			map(({ isAuthenticated }) => isAuthenticated),
			tap(isAuthenticated => {
				if (!isAuthenticated) {
					this.router.navigate(['/login']);
				}
			})
		);
	}
}
