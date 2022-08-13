import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {
    this.authService.isLoggedIn.subscribe((data) => {
      if (!data) {
        console.log('Not logged in. Redirecting back to the login screen...');
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {}
}
