import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  headerTitle: string = 'Login';
  isLoggedIn: boolean = false;

  constructor(private _accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this._accountService.headerTitle$.subscribe((title) => {
      this.headerTitle = title;
    });

    this._accountService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    // Check if the user is already logged in
    this.isLoggedIn = !!localStorage.getItem('token');
    if (this.isLoggedIn) {
      this._accountService.setLoggedIn(true);
    }
  }

  navigateTo(page: string, route: string): void {
    this._accountService.setHeaderTitle(page);
    this.router.navigate([route]);
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this._accountService.setHeaderTitle('Login');
    this._accountService.setLoggedIn(false);
    this.router.navigate(['/login']);
  }
  
}
