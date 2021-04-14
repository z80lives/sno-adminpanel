import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
//admin auth guard service. Responsible for cheking if admin is logged in
import {AuthGuard} from "./guard/auth-guard.guard"; 

//Screen Components
import {AppComponent} from "./app.component"; //the parent app component. Router is here.
import {LoginComponent} from "./login/login.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

//paths available to outsiders
const public_routes : Routes = [
    {path: "", component: LoginComponent},
    {path: "login", component: LoginComponent}
];

//paths available to admin
const authenticated_routes: Routes = [
    {path: "", component: DashboardComponent}
//    {path: "/", component: AppComponent}
];

const combined_routes: Routes = [
    //user is logged in
    { 
	path: "",
	component: AppComponent,
	children: authenticated_routes,
	canActivate: [AuthGuard]
    },
    {
	path: "",
	component: AppComponent,
	children: public_routes
    },
    {path: "**", component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(combined_routes, {relativeLinkResolution: "legacy"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
