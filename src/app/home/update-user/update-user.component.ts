import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserActionsService } from "../user-actions.service";
import { UserDTO } from "../model";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  form!: UntypedFormGroup
  userId!: number

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private userActionsService: UserActionsService,
              private router: Router) {
  }

  ngOnInit() {
    this.userId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.showUserDataFromLocalStorage();
  }

  updateUserData(form: any): void {
    const updatedUserData = this.form.value
    let currentUserData = this.userActionsService.getUserById(this.userId);

    currentUserData = { ...currentUserData, ...updatedUserData };

    this.userActionsService.updateUserDataInLocalStorage(currentUserData, this.userId)
    this.goBack()
  }
  private showUserDataFromLocalStorage(): void {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      currentPosition: [''],
      age: [],
      city: [''],
      address: [''],
    })

    this.form.patchValue(this.userActionsService.getUserById(this.userId))
  }

  goBack(): void {
    this.router.navigate(['home']);
  }
}
