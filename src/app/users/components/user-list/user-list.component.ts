import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user.interfaces';
import { UsersListService } from '../../users-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  dataSource: any;
  _unsubscribeAll = new Subject();
  displayedColumns: string[] = ['id', 'avatar', 'firstName', 'lastName', 'email', 'actions'];


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _usersListService: UsersListService) { }


  ngOnInit() {
    this._usersListService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.dataSource = new MatTableDataSource<User>(response.data);
      console.log(response)
    });
  }

}
