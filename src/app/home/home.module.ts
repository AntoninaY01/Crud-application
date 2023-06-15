import {HomeComponent} from "./home.component";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HOME_ROUTES} from "./home-routes";

@NgModule({
  declarations: [HomeComponent],
  imports: [RouterModule.forChild([HOME_ROUTES])],
  providers: [],
})
export class HomeModule {
}
