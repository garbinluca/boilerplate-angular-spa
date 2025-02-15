import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';
import { environment } from '../../environment/environment';

@NgModule({
	imports: [AuthModule.forRoot({
		config: {
			authority: environment.cognito.authority,
			clientId: environment.cognito.clientId,
			redirectUrl: window.location.origin,
			postLogoutRedirectUri: window.location.origin,
			scope: 'email openid phone', // 'openid profile offline_access ' + your scopes
			responseType: 'code',
			silentRenew: true,
			useRefreshToken: true,
		}
	})],
	exports: [AuthModule],
})
export class AuthConfigModule {
}
