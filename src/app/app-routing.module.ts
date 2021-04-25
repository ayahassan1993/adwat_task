import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './@core/auth/guards/auth.guards';
import { SessionGuard } from './@core/auth/guards/session.guard';
const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./@core/auth/auth.module').then(m => m.AuthModule),
		canActivate: [SessionGuard],
	},
  	{
		path: '',
		loadChildren: () => import('./app-layout/app-layout.module').then(m => m.AppLayoutModule),
		canActivate: [AuthenticationGuard],
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled' })],
exports: [RouterModule]
})
export class AppRoutingModule { }