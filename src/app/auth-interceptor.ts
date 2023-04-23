import { AuthService } from '@auth0/auth0-angular';
import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {mergeMap, Observable} from "rxjs";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(public auth:AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.getAccessTokenSilently()
      .pipe(
        mergeMap((token) => {
          return next.handle(req.clone({ setHeaders: { 'Authorization' : 'Bearer ' + token } }));
        })
      );
  }
}
