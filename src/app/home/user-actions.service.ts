import { Injectable } from "@angular/core";
import { UserDTO } from "./model";
import { MessageService } from "primeng/api";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({ providedIn: "root" })
export class UserActionsService {

  constructor(private messageService: MessageService, private http: HttpClient) {
  }


  createNewUser(newUser: UserDTO): Observable<any> {
    return this.http.post<{ message: string }>('http://localhost:3000/api/user', newUser);
  }

  getUsersFromLocalStorage(): UserDTO[] | null {
    const storedUsers = localStorage.getItem("userData");
    return storedUsers ? JSON.parse(storedUsers) : null;
  }

  getUsers(): Observable<any> {
    return this.http.get<{ message: string, userList: UserDTO[] }>('http://localhost:3000/api/users')
        .pipe(map((userData: any) => {
          return userData.userList.map((user: any) => {
            return {
              firstName: user.firstName,
              lastName: user.lastName,
              currentPosition: user.currentPosition,
              age: user.age,
              city: user.city,
              address: user.address,
              id: user._id
            }
          })
        }))
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

  deleteUserById(id: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/users/${id}`);
  }

  showError(): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fail' });
  }

  showSuccess(): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Success' });
  }
}
