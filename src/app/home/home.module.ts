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
import { CreateEventComponent } from './create-event/create-event.component';
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";

@NgModule({
  declarations: [HomeComponent, CreateUserComponent, ViewUserComponent, UpdateUserComponent, CreateEventComponent],
  imports: [
    RouterModule.forChild(HOME_ROUTES),
    TableModule,
    CommonModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    InputTextModule,
    TranslateModule,
    DropdownModule,
    CalendarModule
  ],
  providers: [],
})
export class HomeModule {
}
