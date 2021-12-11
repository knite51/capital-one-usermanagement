import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EndpointsService } from 'src/app/shared/endpoints.service';
import { GeneralService } from 'src/app/shared/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-create-modal',
  templateUrl: './user-create-modal.component.html',
  styleUrls: ['./user-create-modal.component.css']
})
export class UserCreateModalComponent implements OnInit {

  usersUrl = 'api/users'
  userForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    job: new FormControl(null, Validators.required),
  });

  constructor(private endpoints: EndpointsService,
    private generalServ: GeneralService,
    public dialogRef: MatDialogRef<UserCreateModalComponent>,) { }

  ngOnInit() {
  }

  handleUserCreation() {
    this.generalServ.sweetAlertCreate('User').then(res => {
      if (res.value) {
        const payload = this.userForm.value;
        this.endpoints.create(this.usersUrl, payload).subscribe(res => {
          if (res) {
            this.dialogRef.close()
            Swal.fire({
              type: 'success',
              title: 'Done',
              text: `User Created`,
            });
          }
        })
      }
    })
  }

}
