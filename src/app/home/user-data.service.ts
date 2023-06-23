import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: "root"})
export class UserDataService {
  private newUserSubject = new BehaviorSubject(null);
  newUser$ = this.newUserSubject.asObservable();

  setNewUser(newUser: any){
    this.newUserSubject.next(newUser);
  }

}
