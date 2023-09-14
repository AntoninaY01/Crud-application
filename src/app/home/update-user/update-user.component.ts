import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserActionsService } from "../user-actions.service";
import { TranslateService } from '@ngx-translate/core';
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
    private router: Router,
    private translateService: TranslateService) {
  }

  ngOnInit() {
    this.userId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.showUserDataFromLocalStorage();
  }

  updateUserData(form: any): void {
    if (this.form.valid) {
      const updatedUserData = this.form.value;
      let currentUserData = this.userActionsService.getUserById(this.userId);

      currentUserData = { ...currentUserData, ...updatedUserData };

      this.userActionsService.updateUserDataInLocalStorage(currentUserData, this.userId);
      this.userActionsService.showSuccess();
      this.goBack()
    } else {
      return;
    }
  }

  private showUserDataFromLocalStorage(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      currentPosition: ['', Validators.required],
      age: [null, Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
    })

    this.form.patchValue(this.userActionsService.getUserById(this.userId))
  }

  goBack(): void {
    this.router.navigate(['home']);
  }
}
