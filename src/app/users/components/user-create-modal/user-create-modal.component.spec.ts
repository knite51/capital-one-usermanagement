import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserCreateModalComponent } from './user-create-modal.component';

describe('UserCreateModalComponent', () => {
  let component: UserCreateModalComponent;
  let fixture: ComponentFixture<UserCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserCreateModalComponent],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        MatStyleModule
      ],
      providers: [{
        provide: MatDialogRef,
        useValue: []
      },
      {
        provide: MAT_DIALOG_DATA,
        useValue: []
      }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
