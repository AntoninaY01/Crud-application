import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { UserActionsService } from "../user-actions.service";
import { Router } from "@angular/router";
import { UserDTO } from '../model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  form!: UntypedFormGroup;
  newUser!: UserDTO;
  submitted = false;

  constructor(private fb: FormBuilder,
    private userActionService: UserActionsService,
    private router: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      currentPosition: ['', Validators.required],
      age: [null, Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  createAndStoreNewUser(form: any): void {
    this.submitted = true;

    if (this.form.valid) {

      const user = this.form.value;
      user.id = this.generateNewUserId();
      this.userActionService.createNewUser(user);
      this.userActionService.showSuccess();
      this.goBack();
    } else {
      return;
    }
  }

  generateNewUserId(): number {
    const existingUsers = this.userActionService.getUsersFromLocalStorage();
    if (existingUsers !== null) {
      return existingUsers.length + 1;
    }
    return 1;
  }

  goBack(): void {
    this.router.navigate(['home']);
  }
}
