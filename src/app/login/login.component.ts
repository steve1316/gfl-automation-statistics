import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: '',
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}

  get form() {
    return this.loginForm.controls;
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    const userControl = this.loginForm.get('username');
    const passwordControl = this.loginForm.get('password');
    if (userControl && passwordControl) {
      this.authService
        .login(userControl.value, passwordControl.value)
        .subscribe((data) => {
          console.log(data);
        });
    } else {
      console.warn(
        'Control(s) is null so cannot continue with form submission.'
      );
    }
  }
}
