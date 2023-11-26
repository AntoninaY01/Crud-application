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

  getUserById(id: number): Observable<UserDTO | null> {
    return this.getUsers().pipe(
        map(usersData => {
          const selectedUser = usersData.find((user: UserDTO) => user.id === id);
          return selectedUser ? selectedUser : null;
        })
    );
  }

  updateUserData(updatedUser: UserDTO, userId: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/user/${userId}`, updatedUser);
  }

  deleteUserById(id: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/user/${id}`);
  }

  showError(): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fail' });
  }

  showSuccess(): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Success' });
  }
}
