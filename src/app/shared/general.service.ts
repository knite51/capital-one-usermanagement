import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../utils/LocalStorage';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {

  sweetAlertCreate(type) {
    return Swal.fire({
      title: `Create ${type}?`,
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create it!"
    });
  }

  sweetAlertUpdate(type) {
    return Swal.fire({
      title: `Update ${type}?`,
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!"
    });
  }

  sweetAlertError(msg) {
    return Swal.fire({
      // icon: 'error',
      title: 'Failed',
      text: msg,
      showConfirmButton: false,
      timer: 3000
    })
  }


  sweetAlertFileDeletions(type) {
    return Swal.fire({
      title: `Delete ${type}?`,
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    });
  }
}
