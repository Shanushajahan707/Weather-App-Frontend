import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { accountGuard, tokenGuard } from './guards/account.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [accountGuard],
  },
  {
    path: 'weather',
    component: WeatherComponent,
    canActivate: [tokenGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [tokenGuard],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
