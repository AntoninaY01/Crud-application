import {HomeComponent} from "./home.component";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HOME_ROUTES} from "./home-routes";
import {TableModule} from "primeng/table";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {CreateUserComponent} from "./create-user/create-user.component";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [HomeComponent, CreateUserComponent],
  imports: [RouterModule.forChild(HOME_ROUTES), TableModule, CommonModule, ButtonModule, RippleModule, ReactiveFormsModule, InputTextModule],
  providers: [],
})
export class HomeModule {
}
