import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
//admin auth guard service. Responsible for cheking if admin is logged in
import {AuthGuard} from "./guard/auth-guard.guard"; 

//Screen Components
import {AppComponent} from "./app.component"; //the parent app component. Router outlet here doesn't mean anything.
import { BrandComponent } from "./components/brand/brand.component";
import { CategoryComponent } from "./components/category/category.component";
import { FormBrandComponent } from './components/form-brand/form-brand.component';
import { FormCategoryComponent } from './components/form-category/form-category.component';
import { FormProductComponent } from "./components/form-product/form-product.component";
import {ListBrandsComponent} from "./components/list-brands/list-brands.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { LayoutContainerComponent } from './components/layout-container/layout-container.component'; //All screens are displayed from here. Routing is done here. 
import {ListCategoriesComponent} from "./components/list-categories/list-categories.component";
import {LoginComponent} from "./login/login.component";
import {ListProductsComponent} from "./components/list-products/list-products.component";
import {ManageNewsLetterComponent} from "./components/manage-newsletter/manage-newsletter.component";
import {ManageRecipesComponent} from "./components/manage-recipes/manage-recipes.component";
import { ProductComponent } from "./components/product/product.component";
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
    {path: "category/new", component: FormCategoryComponent}, 
    {path: "category/:id", component: CategoryComponent},
    {path: "category/:id/edit", component: FormCategoryComponent},
    {path: "brand", component: ListBrandsComponent},
    {path: "brand/new", component: FormBrandComponent},
    {path: "brand/:id", component: BrandComponent},
    {path: "brand/:id/edit", component: FormBrandComponent},
    {path: "products", component: ListProductsComponent},
    {path: "product", component: ListProductsComponent},
    {path: "product/new", component: FormProductComponent},
    {path: "product/:id", component: ProductComponent},
    {path: "product/:id/edit", component: FormProductComponent},
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
