import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EndpointsService } from 'src/app/shared/endpoints.service';
import { GeneralService } from 'src/app/shared/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  usersUrl = 'api/users'
  userDetails: any = {};
  buttonTitle = 'Edit'

  constructor(private route: ActivatedRoute,
    private endpoint: EndpointsService,
    private router: Router, private generalServ: GeneralService) {
    this.route.params.subscribe(res => {
      const { id } = res;
      this.endpoint.fetchOne(this.usersUrl, id).subscribe(res => {
        const { data } = res;
        this.userDetails = data;
      })

    })
  }

  ngOnInit() {
  }

  handleEdit(id) {
    if (this.buttonTitle === 'Save') {
      this.generalServ.sweetAlertUpdate('User').then(res => {
        if (res.value) {
          const payload = this.userDetails;
          this.endpoint.edit(this.usersUrl, id, payload).subscribe(res => {
            Swal.fire({
              type: 'success',
              title: 'Done',
              text: `User Updated`,
            });
          });
          this.buttonTitle = 'Edit';
        }
      })
      return;
    }
    this.buttonTitle = 'Save';
  }

}
