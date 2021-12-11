import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

  totalItemCount = 0;
  paginationUrl = {
    next: "",
    previous: "",
    viewCountStart: 1,
    viewCountEnd: 6
  };
  pageNumber = 1;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _usersListService: UsersListService,
    private endpoints: EndpointsService, private generalServ: GeneralService,
    public dialog: MatDialog) { }


  ngOnInit() {
    this._usersListService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.setDataSource(response)
    });

  }

  private setDataSource(res) {
    console.log(res, 'err')
    // data: (6)[{… }, {… }, {… }, {… }, {… }, {… }]
    // page: 1
    // per_page: 6
    // support: { url: 'https://reqres.in/#support-heading', text: 'To keep ReqRes free, contributions towards server costs are appreciated!' }
    // total: 12
    // total_pages: 2
    const { data, next, previous, total } = res;
    this.totalItemCount = total;
    // set pagination next, previous and page counts values
    this.paginationUrl = { ...this.paginationUrl, next, previous };
    // check if page is the lastnext, then set page count to total item count
    this.paginationUrl.next !== null
      ? this.paginationUrl
      : (this.paginationUrl.viewCountEnd = this.totalItemCount);
    // check if page is the lastprevious, then set page count to perPage count[10]
    this.paginationUrl.previous !== null
      ? this.paginationUrl
      : (this.paginationUrl.viewCountEnd = 6);
    // check if page is the single, then set page count to perPage count[count]
    total > this.paginationUrl.viewCountEnd
      ? this.paginationUrl
      : (this.paginationUrl.viewCountEnd = total);


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

  handlePagination(rd) { }

}
