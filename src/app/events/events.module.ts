import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EVENT_ROUTES } from "./event-routes";

@NgModule({
  imports: [
    RouterModule.forChild(EVENT_ROUTES),
  ]
})

export class EventsModule {
}