import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { HttpClient } from "@angular/common/http";
import { UserDTO } from "../home/model";


@Injectable({ providedIn: "root" })
export class UserActionsLocalStorageService {

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

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

  getUserById(id: number): UserDTO {
    const usersData = this.getUsersFromLocalStorage();
    const selectedUser = usersData?.find((user: any) => user.id === id ? user : null);
    return selectedUser as UserDTO;
  }

  updateUserDataInLocalStorage(updatedUser: UserDTO, id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const userList = this.getUsersFromLocalStorage();
        const updatedUserIndex = userList?.findIndex(user => user.id === id) as number;

        if (updatedUserIndex !== -1 && userList) {
          userList[updatedUserIndex] = updatedUser;
          localStorage.setItem('userData', JSON.stringify(userList));
          resolve();
        } else {
          reject(new Error('User not found'));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteUserById(id: number): UserDTO[] | undefined {
    const usersList = this.getUsersFromLocalStorage();
    if (!usersList) {
      return;
    }
    const updatedUserList = usersList.filter((user: UserDTO) => user.id !== id);

    localStorage.setItem("userData", JSON.stringify(updatedUserList));
    return updatedUserList;
  }

  // method used in a component for generating an id
  // generateNewUserId(): number {
  //     const existingUsers = this.userActionService.getUsersFromLocalStorage();
  //     if (existingUsers !== null) {
  //       return existingUsers.length + 1;
  //     }
  //     return 1;
  //   }
}
