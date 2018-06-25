import { GamePageComponent } from './pages/game-page/game-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeComponent } from 'app/pages/backoffice/backoffice.component';
import { HomeComponent } from 'app/pages/home/home.component';
import { AddGroupComponent } from 'app/pages/add-group/add-group.component';
import { LoginPageComponent } from 'app/pages/login-page/login-page.component';
import { MobileComponent } from './pages/mobile/mobile.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'Backoffice', component: BackofficeComponent },
  { path: 'Backoffice/AddGroup', component: AddGroupComponent },
  { path: 'game/:groupKey/:gameMinutes', component: GamePageComponent},
  { path: 'mobile', component: MobileComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
