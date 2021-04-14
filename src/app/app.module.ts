import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular Materials modules
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


//other modules
import {FormsModule} from "@angular/forms";

// Application Screen components
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      PageNotFoundComponent,
      DashboardComponent
  ],
  imports: [
      AppRoutingModule,
      BrowserAnimationsModule,
      BrowserModule,
      FormsModule,
      
      //angular material imports
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule
      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
