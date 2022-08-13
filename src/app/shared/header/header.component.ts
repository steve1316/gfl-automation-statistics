import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('jwt_token');
        console.log('Logged out.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.warn('Failed to log out: ', err);
        this.snackBar.open(
          `Login unsuccessful with status code: ${err.status}`,
          '',
          {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn'],
          }
        );
      },
    });
  }
}
