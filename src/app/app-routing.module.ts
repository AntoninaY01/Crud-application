import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./core/guards/auth.guard";

const MAIN_ROUTES: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  }]

@NgModule({
  imports: [
    RouterModule.forRoot(MAIN_ROUTES)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
