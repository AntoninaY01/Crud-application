import {Route} from "@angular/router";
import {CreateUserComponent} from "./create-user/create-user.component";
import {HomeComponent} from "./home.component";
import {UpdateUserComponent} from "./update-user/update-user.component";
import {ViewUserComponent} from "./view-user/view-user.component";

export const HOME_ROUTES: Route = {
 path: '',
  component: HomeComponent,
  children: [
    {
      path: 'create-user',
      component: CreateUserComponent
    },
    {
      path: 'update-user',
      component: UpdateUserComponent
    },
    {
      path: 'view-user',
      component: ViewUserComponent
    }
  ]
}
