import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular Materials modules
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';


//other modules
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { JwtModule } from '@auth0/angular-jwt';


// Application Screen components
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutContainerComponent } from './components/layout-container/layout-container.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TitleToolbarComponent } from './components/title-toolbar/title-toolbar.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { ListBrandsComponent } from './components/list-brands/list-brands.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ManageNewsLetterComponent } from './components/manage-newsletter/manage-newsletter.component';
import { ManageRecipesComponent } from './components/manage-recipes/manage-recipes.component';


@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      LayoutContainerComponent,
      PageNotFoundComponent,
      DashboardComponent,
      SidebarComponent,
      TitleToolbarComponent,
      ListCategoriesComponent,
      ListBrandsComponent,
      ViewCategoryComponent,
      ListProductsComponent,
      ManageNewsLetterComponent,
      ManageRecipesComponent      
  ],
  imports: [
      AppRoutingModule,
      BrowserAnimationsModule,
      BrowserModule,
      FormsModule,
      HttpClientModule,
      JwtModule.forRoot({
	  config: {
	      tokenGetter: () => {
		  return localStorage.getItem("");
	      },
	      authScheme: "Bearer"
	  }
      }),
      
      //angular material imports
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatMenuModule,
      MatSidenavModule,
      MatTableModule,
      MatToolbarModule
      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
