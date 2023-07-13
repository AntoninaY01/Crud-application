import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserActionsService } from "../user-actions.service";
import { FormBuilder, UntypedFormGroup } from "@angular/forms";

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  userId!: number
  form!: UntypedFormGroup
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userActionsService: UserActionsService,
              private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.userId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.viewUser()
  }

  private viewUser(): void {
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
