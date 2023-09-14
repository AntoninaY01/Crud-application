import { Injectable } from "@angular/core";
import { UserDTO } from "./model";
import { MessageService } from "primeng/api";


@Injectable({ providedIn: "root" })
export class UserActionsService {

  constructor(private messageService: MessageService) { }

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
    return storedUsers ? JSON.parse(storedUsers) : this.showError();
  }

  getUserById(id: number): UserDTO {
    const usersData = this.getUsersFromLocalStorage()
    const selectedUser = usersData?.find((user: any) => user.id === id ? user : null);
    return selectedUser as UserDTO
  }

  //TODO THINK about promises, handle error
  updateUserDataInLocalStorage(updatedUser: UserDTO, id: number): void {
    const userList = this.getUsersFromLocalStorage();
    const updatedUserIndex = userList?.findIndex(user => user.id === id) as number;

    if (updatedUserIndex !== -1 && userList) {
      userList[updatedUserIndex] = updatedUser;
      localStorage.setItem('userData', JSON.stringify(userList));
    }
  }

  deleteUserById(id: number): void {
    const usersList = this.getUsersFromLocalStorage();
    if (!usersList) {
      return;
    }
    const updatedUserList = usersList.filter((user: UserDTO) => user.id !== id);

    localStorage.setItem("userData", JSON.stringify(updatedUserList));
    this.showSuccess()

  }

  showError(): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fail' })
  }

  showSuccess(): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Success' })
  }
}
