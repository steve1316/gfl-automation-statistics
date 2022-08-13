import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {
    this.authService.isLoggedIn.subscribe((data) => {
      if (data) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  ngOnInit(): void {}
}
