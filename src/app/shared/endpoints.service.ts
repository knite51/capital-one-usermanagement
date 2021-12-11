import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { LocalStorageService } from "../utils/LocalStorage";
import { GeneralService } from "./general.service";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class EndpointsService {
  private host = environment.apiUrl;
  tokenGenerated = new BehaviorSubject<string>("");

  constructor(private http: HttpClient, private storeSrv: LocalStorageService, private gs: GeneralService) {
    const token = JSON.parse(
      this.storeSrv.getFromLocalStorage('Usertoken')
    );
    this.tokenGenerated.next(token);
  }


  // Handle Errors
  public handleError = (error: any): Observable<any> => {
    let message = "";
    if (error) {
      console.log(error, 're')
      message = error.error.error
      this.gs.sweetAlertError(message);
    }
    return of(null);
  };

  create(url, payload) {
    try {
      return this.http.post(`${this.host}${url}`, payload).pipe(catchError(this.handleError));
    } catch (error) {
      this.handleError;
    }
  }

  fetchAll(url) {
    try {
      return this.http.get(`${this.host}${url}`).pipe(catchError(this.handleError));
    } catch (error) {
      this.handleError;
    }
  }

  fetchOne(url, id) {
    try {
      return this.http.get(`${this.host}${url}${id}`).pipe(catchError(this.handleError));
    } catch (error) {
      this.handleError;
    }
  }

  edit(url, id, payload) {
    try {
      return this.http.patch(
        `${this.host}${url}${id}`,
        payload
      ).pipe(catchError(this.handleError));
    } catch (error) {
      this.handleError;
    }
  }

  delete(url, id) {
    try {
      return this.http.delete(`${this.host}${url}${id}`).pipe(catchError(this.handleError));
    } catch (error) {
      this.handleError;
    }
  }
}
