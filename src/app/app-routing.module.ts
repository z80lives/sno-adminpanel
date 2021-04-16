import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
//admin auth guard service. Responsible for cheking if admin is logged in
import {AuthGuard} from "./guard/auth-guard.guard"; 

//Screen Components
import {AppComponent} from "./app.component"; //the parent app component. Router outlet here doesn't mean anything.
import {ListBrandsComponent} from "./components/list-brands/list-brands.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { LayoutContainerComponent } from './components/layout-container/layout-container.component'; //All screens are displayed from here. Routing is done here. 
import {ListCategoriesComponent} from "./components/list-categories/list-categories.component";
import {LoginComponent} from "./login/login.component";
import {ListProductsComponent} from "./components/list-products/list-products.component";
import {ManageNewsLetterComponent} from "./components/manage-newsletter/manage-newsletter.component";
import {ManageRecipesComponent} from "./components/manage-recipes/manage-recipes.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";


//paths available to outsiders
const public_routes : Routes = [
    {path: "", component: LoginComponent},
    {path: "login", component: LoginComponent}
];

//paths available to admin
const authenticated_routes: Routes = [
    {path: "", component: DashboardComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: "category", component: ListCategoriesComponent},
    {path: "brand", component: ListBrandsComponent},
    {path: "products", component: ListProductsComponent},
    {path: "newsletters", component: ManageNewsLetterComponent},
    {path: "recipes", component: ManageRecipesComponent}
//    {path: "/", component: AppComponent}
];

const combined_routes: Routes = [
    //user is logged in
    { 
	path: "",
	component: LayoutContainerComponent,
	children: authenticated_routes,
	canActivate: [AuthGuard]
    },
    {
	path: "",
	component: LayoutContainerComponent,
	children: public_routes
    },
    {path: "**", component: LayoutContainerComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(combined_routes, {relativeLinkResolution: "legacy"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
