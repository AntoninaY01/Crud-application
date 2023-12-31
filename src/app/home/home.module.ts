import { HomeComponent } from "./home.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HOME_ROUTES } from "./home-routes";
import { TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { CreateUserComponent } from "./create-user/create-user.component";
import { ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ViewUserComponent } from "./view-user/view-user.component";
import { UpdateUserComponent } from "./update-user/update-user.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [HomeComponent, CreateUserComponent, ViewUserComponent, UpdateUserComponent],
  imports: [
    RouterModule.forChild(HOME_ROUTES), 
    TableModule, 
    CommonModule, 
    ButtonModule, 
    RippleModule, 
    ReactiveFormsModule, 
    InputTextModule, 
    TranslateModule
  ],
  providers: [],
})
export class HomeModule {
}
