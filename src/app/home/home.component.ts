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
  usersList: UserDTO[] = [];
  cols!: { field: string, header: string }[];

  constructor(private router: Router, private userActionsService: UserActionsService) {
  }

  ngOnInit() {
    this.onUserCreated()
    this.cols = [
      {field: 'firstName', header: 'First Name'},
      {field: 'lastName', header: 'Last Name'},
      {field: 'currentPosition', header: 'Current Position'},
      {field: 'age', header: 'Age'},
      {field: 'city', header: 'City'},
      {field: 'address', header: 'Address'},
    ]
    // console.log(this.usersList)
  }

  createUser(): void {
    this.router.navigate(['home', 'create-user']);
  }

  onUserCreated(): void {
    const storedUsers = this.userActionsService.getUsersFromLocalStorage();
    if (Array.isArray(storedUsers)) {
      this.usersList.push(...storedUsers);
    }
  }

  onViewUser(id: number): void {
    this.router.navigate(['home/view-user', id])
  }

}
