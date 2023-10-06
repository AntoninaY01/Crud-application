import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { AuthService } from "../core/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const credentials = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value
    }

    this.authService.signUp(credentials).subscribe({
      next: (res) => {
        console.log('tuka li sme')
        this.router.navigate(['home']);
      }, error: (error) => {
        console.log(error);
      }
    })
  }
}
