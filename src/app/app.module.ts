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
// import { AngularFireModule } from 'angularfire2';
import { FirebaseService } from 'app/services/firebase/firebase.service';
import { AddGroupComponent } from './pages/add-group/add-group.component';


firebase.initializeApp(environment.firebase);



@NgModule({
  declarations: [
    AppComponent,
    BackofficeComponent,
    HomeComponent,
    AddGroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    // firebase.initializeApp(environment.firebase)
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
