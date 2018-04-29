import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';

/**
 * TokenInterceptor
 * @see https://angular.io/guide/http#intercepting-all-requests-or-responses
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private authService: NbAuthService;
    private tokenService: NbAuthJWTToken;

    constructor(private injector: Injector) {
    }

    // public getToken(): string {
    //     return localStorage.getItem('auth_app_token');
    // }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.authService = this.injector.get(NbAuthService); // get it here within intercept

        this.authService.isAuthenticated().subscribe((result) => {
            if (result) {
                // console.log('logged');
            }
        });

        return next.handle(request);
    }

}
