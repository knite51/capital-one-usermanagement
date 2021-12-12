import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from '../auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        MatStyleModule,
        RouterTestingModule.withRoutes([])],
      providers: [AuthService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login form should be invalid', async () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('login form should be valid', async () => {
    component.loginForm.controls['email'].setValue('knite51@gmail.com');
    component.loginForm.controls['password'].setValue('12324345');
    expect(component.loginForm.valid).toBeTruthy();
  });

});
