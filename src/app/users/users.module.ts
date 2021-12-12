import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatStyleModule } from '../mat-style.module';
import { RouterModule } from '@angular/router';
import { UsersListService } from './users-list.service';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserCreateModalComponent } from './components/user-create-modal/user-create-modal.component';

const routes = [
  {
    path: 'list',
    resolve: {
      data: UsersListService
    },
    component: UserListComponent,
  },
  {
    path: 'view/:id',
    component: UserViewComponent,
  },
]

@NgModule({
  declarations: [UserListComponent, UserViewComponent, UserCreateModalComponent],
  entryComponents: [UserCreateModalComponent],
  imports: [
    SharedModule,
    MatStyleModule,
    RouterModule.forChild(routes)
  ],
  exports: [UserListComponent, UserViewComponent],
  providers: [UsersListService],

})
export class UsersModule { }
