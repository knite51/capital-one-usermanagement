import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { MatStyleModule } from '../mat-style.module';
import { SharedModule } from '../shared/shared.module';

const routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'login'
  }
]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    MatStyleModule,
    RouterModule.forChild(routes)
  ],
  providers: [AuthService],
  exports: [LoginComponent],
})
export class AuthModule { }
