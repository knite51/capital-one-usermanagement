import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { EndpointsService } from 'src/app/shared/endpoints.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LocalStorageService } from '../../utils/LocalStorage';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(null, Validators.required),
  });
  loginUrl = 'api/login';
  isLoading = false;

  constructor(
    private endpoints: EndpointsService,
    private router: Router,
    private authService: AuthService,
    private localstorage: LocalStorageService
  ) {

  }

  ngOnInit() { }

  handleLogin() {
    this.isLoading = true;
    this.endpoints.create(this.loginUrl, this.loginForm.value).subscribe(
      (res: any) => {
        if (res) {
          const { token } = res;
          this.endpoints.tokenGenerated.next(token);
          this.localstorage
            .saveToLocalStorage('Usertoken', token)
            .subscribe(res2 => {
              if (res2) {
                const redirect = this.authService.redirectUrl
                  ? this.authService.redirectUrl
                  : '/users/list';
                this.router.navigate([`${redirect}`]);
              }
            });
        }
        this.isLoading = false;
      });
  }
}
