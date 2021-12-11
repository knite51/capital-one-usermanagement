import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { Injectable, OnInit } from '@angular/core';
import { EndpointsService } from '../shared/endpoints.service';

@Injectable()
export class AuthcrudInterceptorService implements HttpInterceptor, OnInit {
  token: string;

  constructor(private endpoints: EndpointsService) { }

  ngOnInit() { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.endpoints.tokenGenerated.subscribe(token => {
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `${token}`,
          },
        });
      }
    });

    return next.handle(req);
  }
}
