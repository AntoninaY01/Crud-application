import {Injectable} from "@angular/core";
import {UserDTO} from "./model";


@Injectable({providedIn: "root"})
export class UserActionsService {

  createNewUser(newUser: UserDTO): void {
    const existingUsers = this.getUsersFromLocalStorage();

    let updatedUsers: UserDTO[] = [];
    if (existingUsers) {
      updatedUsers = existingUsers.concat(newUser); // Concatenate the new user to the existing user data
    } else {
      updatedUsers.push(newUser); // Create a new array with the new user
    }
    localStorage.setItem("userData", JSON.stringify(updatedUsers));
  }

  getUsersFromLocalStorage(): UserDTO[] | null {
    const storedUsers = localStorage.getItem("userData");
    return storedUsers ? JSON.parse(storedUsers) : null;
  }

  deleteUser(): void {

  }

}
