import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserActionsService } from "../user-actions.service";
import { TranslateService } from '@ngx-translate/core';
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
              private router: Router,
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id') as any;
    this.populateUserData();
  }

// to remove the get call, pass the form
  updateUserData(form: any): void {
    let currentUserData: UserDTO;
    if (this.form.valid) {
      const updatedUserData = this.form.value;
      this.userActionsService.getUserById(this.userId).subscribe({
        next: (res => {
          currentUserData = res as UserDTO;
          currentUserData = { ...currentUserData, ...updatedUserData };

          this.userActionsService.updateUserData(currentUserData, this.userId).subscribe({
            next: (res) => {
              console.log(res);
              this.userActionsService.showSuccess();
              this.goBack();
            }, error: () => {
              this.userActionsService.showError();
            }
          })
        })
      })

    } else {
      return;
    }
  }

  private populateUserData(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      currentPosition: ['', Validators.required],
      age: [null, Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
    })

    this.userActionsService.getUserById(this.userId).subscribe({
      next: (res) => {
        this.form.patchValue(res as UserDTO);
      }
    })  }

  goBack(): void {
    this.router.navigate(['home']);
  }

}
