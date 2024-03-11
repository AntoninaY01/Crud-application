import { Component, OnInit } from '@angular/core';
import { UserDTO } from "./model";
import { Router } from "@angular/router";
import { UserActionsService } from "./user-actions.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: UserDTO[] = [];
  cols!: { field: string, header: string }[];

  constructor(
    private router: Router, 
    private userActionsService: UserActionsService,
    ) {
  }

  ngOnInit() {
    this.getAllUsers();
    this.cols = [
      {field: 'firstName', header: 'First Name'},
      {field: 'lastName', header: 'Last Name'},
      {field: 'currentPosition', header: 'Current Position'},
      {field: 'age', header: 'Age'},
      {field: 'city', header: 'City'},
      {field: 'address', header: 'Address'},
    ]
  }

  createUser(): void {
    this.router.navigate(['home', 'create-user']);
  }

  getAllUsers(): void {
    this.userActionsService.getUsers().subscribe({
      next: (users) => {
        if (users) {
          if (Array.isArray(users)) {
            this.users.push(...users);
          } else {
            console.error('userListData.userList is not an array:', users);
          }
        } else {
          console.error('Invalid userListData:', users);
        }
      }, error: (err) => {
        console.log('eeeeerrorororo',err)
      }
    })
  }

  onViewUser(id: number): void {
    this.router.navigate(['home/view-user', id])
  }

  onEditUser(userData: UserDTO): void {
    this.router.navigate(['home/update-user', userData.id],{ state: { userData }})
  }

  onDeleteUser(id: any): void {
    this.userActionsService.deleteUserById(id).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== id);
      }
    });
  }

}
