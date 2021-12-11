import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatStyleModule } from '../mat-style.module';
import { RouterModule } from '@angular/router';
import { UsersListService } from './users-list.service';

const routes = [
  {
    path: 'list',
    resolve: {
      data: UsersListService
    },
    component: UserListComponent,
  },
]

@NgModule({
  declarations: [UserListComponent],
  imports: [
    SharedModule,
    MatStyleModule,
    RouterModule.forChild(routes)
  ],
  exports: [UserListComponent],
  providers: [UsersListService]
})
export class UsersModule { }
