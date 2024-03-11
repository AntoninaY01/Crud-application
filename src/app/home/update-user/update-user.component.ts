import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserActionsService } from "../user-actions.service";
import { UserDTO } from "../model";
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  private location: Location = inject(Location);

  form!: UntypedFormGroup
  userId!: number
  state!: any;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private userActionsService: UserActionsService,
              private router: Router) {
  }

  ngOnInit() {
    this.state = this.location.getState() as {userData: object};
    this.userId = this.activatedRoute.snapshot.paramMap.get('id') as any;
    this.populateUserData(this.state);
  }

  updateUserData(form: any): void {
    this.userActionsService.updateUserData(form.value, this.userId).subscribe({
            next: () => {
              this.userActionsService.showSuccess();
              this.goBack();
            }, error: () => {
              this.userActionsService.showError();
            }
          })
  }


  private populateUserData(form: any): void {
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
    })
  }

  goBack(): void {
    this.router.navigate(['home']);
  }

}
