import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../utils/LocalStorage';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  expiredToken = new BehaviorSubject<any>('');

  getDateformat(date) {
    let day = new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : new Date(date).getDate();
    let month = new Date(date).getMonth() + 1 < 10 ? `0${new Date(date).getMonth() + 1}` : new Date(date).getMonth() + 1
    let year = new Date(date).getFullYear()

    return `${year}-${month}-${day}`
  }

  checkPhoneDigits(data) {
    switch (data === 11) {
      case true:
        return '';
      case false:
        return 'Mobile cannot be fewer or exceed 11 digits';
      default:
        return '';
    }
  }

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
      confirmButtonText: "Yes, create it!"
    });
  }

  sweetAlertSuccess(msg) {
    return Swal.fire(
      {
        // icon: 'success',
        title: 'Done',
        text: msg,
        showConfirmButton: false,
        timer: 3000
      })
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
