import { Injectable } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, map, distinctUntilChanged, shareReplay } from 'rxjs';
import { Router } from '@angular/router';

interface UserInfo {
	email: string;
	name: string;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	// Espone uno stream che indica se l'utente è autenticato
	readonly isAuthenticated$: Observable<boolean>;

	// Espone lo stream delle info utente
	readonly userInfo$: Observable<UserInfo | null>;

	constructor(
		private oidcSecurityService: OidcSecurityService,
		private router: Router
	) {
		// Configura gli stream principali
		this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$.pipe(
			map(({ isAuthenticated }) => isAuthenticated),
			distinctUntilChanged(),
			shareReplay(1)
		);

		this.userInfo$ = this.oidcSecurityService.userData$.pipe(
			map((userData: any) => {
				if (!userData) return null;

				return {
					email: userData.email,
					name: userData.name,
					// mappa altri campi che ti servono
				};
			}),
			distinctUntilChanged(),
			shareReplay(1)
		);
	}

	// Inizializza il servizio di auth
	initialize(): Observable<boolean> {
		return this.oidcSecurityService.checkAuth().pipe(
			map(({ isAuthenticated }) => isAuthenticated)
		);
	}

	// Avvia il flusso di login
	login(): void {
		this.oidcSecurityService.authorize();
	}

	// Gestisce il logout
	logout(): void {
		this.oidcSecurityService.logoff().subscribe(() => {
			this.router.navigate(['/login']);
		});
	}

	// Ottiene il token corrente
	getAccessToken(): Observable<string> {
		return this.oidcSecurityService.getAccessToken();
	}

	// Verifica se un token esiste ed è valido
	hasValidToken(): Observable<boolean> {
		return this.oidcSecurityService.getAccessToken().pipe(
			map(token => !!token)
		);
	}

	// Forza un refresh del token
	refreshToken(): Observable<LoginResponse> {
		return this.oidcSecurityService.forceRefreshSession();
	}

	// Ottiene informazioni specifiche dall'utente corrente
	getCurrentUser(): Observable<UserInfo | null> {
		return this.userInfo$;
	}
}
