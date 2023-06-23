import {Component, OnInit} from '@angular/core';
import {FormBuilder, UntypedFormGroup} from "@angular/forms";
import {UserActionsService} from "../user-actions.service";
import {UserDataService} from "../user-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(private fb: FormBuilder,
              private userActionService: UserActionsService,
              private userDataService: UserDataService,
              private router: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      currentPosition: [''],
      age: [],
      city: [''],
      address: [''],
    })
  }

  createAndStoreNewUser(form: any): void {
    this.userActionService.createNewUser(this.form.value);
    this.setUserDataInService();
    this.goBack();
  }

  setUserDataInService(): void {
    this.userDataService.setNewUser(this.form.value);
  }


  goBack(): void {
    this.router.navigate(['home']);
  }
}
