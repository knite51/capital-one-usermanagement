import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/interfaces/user.interfaces';
import { EndpointsService } from 'src/app/shared/endpoints.service';
import { GeneralService } from 'src/app/shared/general.service';
import Swal from 'sweetalert2';
import { UsersListService } from '../../users-list.service';
import { UserCreateModalComponent } from '../user-create-modal/user-create-modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  dataSource: any;
  usersUrl = 'api/users'
  _unsubscribeAll = new Subject();
  displayedColumns: string[] = ['id', 'avatar', 'firstName', 'lastName', 'email', 'actions'];

  paginationButton = {
    no_of_item: 0,
    next: false,
    prev: false,
    currentPage: 0,
    totalPages: 0,
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _usersListService: UsersListService,
    private endpoints: EndpointsService, private generalServ: GeneralService,
    public dialog: MatDialog, private authServ: AuthService,
    private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(res => {
      const { page } = res;
      this._usersListService.getDataTableRows(page);
    })
  }


  ngOnInit() {
    this._usersListService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.setDataSource(response)
    });

  }

  private setDataSource(res) {
    const { data, page, per_page, total, total_pages } = res;

    this.paginationButton.no_of_item = per_page;
    this.paginationButton.currentPage = page;
    this.paginationButton.totalPages = total_pages;

    // Reset Values
    this.paginationButton.prev = false;
    this.paginationButton.next = false;

    if (this.paginationButton.currentPage > 1) {
      this.paginationButton.prev = true;
    }
    if (this.paginationButton.currentPage < total_pages) {
      this.paginationButton.next = true;
    }

    this.dataSource = new MatTableDataSource<User>(res.data);
  }

  handleCreate(): void {
    this.dialog.open(UserCreateModalComponent, {
      width: 'auto',
    });
  }


  handleDelete(id) {
    this.generalServ.sweetAlertFileDeletions('User').then(res => {
      if (res.value) {
        this.endpoints.delete(this.usersUrl, id).subscribe(res => {
          Swal.fire({
            type: 'success',
            title: 'Done',
            text: `User Deleted`,
          });
          this._usersListService.getDataTableRows();
        })
      }
    })
  }

  handlePagination(type) {
    let pageNo = 0;
    type === 'next' ? pageNo = this.paginationButton.currentPage + 1 : pageNo = this.paginationButton.currentPage - 1;
    this.router.navigate(['/users/list'], {
      queryParams: { page: pageNo },
    })
    this._usersListService.getDataTableRows(pageNo);
  }


  handleLogout() {
    this.authServ.logout();
  }

}
