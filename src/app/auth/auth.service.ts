import { Injectable } from '@angular/core';
import { LocalStorageService } from '../utils/LocalStorage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  constructor(
    private localstorage: LocalStorageService,
    private router: Router,
  ) { }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login() {
    const token = JSON.parse(
      this.localstorage.getFromLocalStorage('Usertoken')
    );
    const status = token !== null ? true : false;
    status ? (this.isLoggedIn = true) : (this.isLoggedIn = false);
    if (!status) {
      this.localstorage.deleteFromLocalStorage('Usertoken');
    }
    return status;
  }

  logout(): void {
    this.localstorage.deleteFromLocalStorage('Usertoken');
    this.isLoggedIn = false;
    this.router.navigate(['/auth/login']);
  }
}
