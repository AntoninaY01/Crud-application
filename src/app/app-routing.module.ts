import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const MAIN_ROUTES: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
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
