import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeComponent } from 'app/pages/backoffice/backoffice.component';
import { HomeComponent } from 'app/pages/home/home.component';
import { AddGroupComponent } from 'app/pages/add-group/add-group.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'Backoffice', component: BackofficeComponent },
  { path: 'Backoffice/AddGroup', component: AddGroupComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }