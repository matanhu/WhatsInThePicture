import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BackofficeComponent } from './pages/backoffice/backoffice.component';
import { HomeComponent } from './pages/home/home.component';

import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';


// firebase.initializeApp(environment.firebase);



@NgModule({
  declarations: [
    AppComponent,
    BackofficeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
