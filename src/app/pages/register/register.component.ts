import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: '',
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  get form() {
    return this.registerForm.controls;
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get email() {
    return this.registerForm.get('email');
  }

  onSubmit(): void {
    const userControl = this.registerForm.get('username');
    const passwordControl = this.registerForm.get('password');
    const emailControl = this.registerForm.get('email');
    if (userControl && passwordControl && emailControl) {
      this.authService
        .register(userControl.value, passwordControl.value, emailControl.value)
        .subscribe({
          next: () => {
            this.snackBar.open('Account created successfully.');
          },
          error: (err) => {
            this.snackBar.open(
              `Account creation failed with status code ${err.status}`,
              '',
              {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-warn'],
              }
            );
          },
        });
    } else {
      this.snackBar.open(
        'Control(s) is null so cannot continue with form submission.',
        '',
        {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn'],
        }
      );
    }
  }
}
