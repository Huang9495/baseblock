
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule,Http } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
//import { RoleProvider } from './role.provider';

import * as moment from 'moment';

//*******************************************************//
//邮件通过供应商的认证
import { NbEmailPassAuthProvider, NbAuthModule } from '@nebular/auth';
//导入那个模块检测用户jwt登陆的部分
import { NB_AUTH_TOKEN_CLASS, NbAuthJWTToken,NbAuthJWTInterceptor } from '@nebular/auth';
import { AuthGuard } from './auth-guard.service';
//令牌拦截
import { TokenInterceptor } from './token.interceptor';
//import { NbAuthJWTInterceptor } from './NbAuthJWTInterceptor';
//http拦截
import { HTTP_INTERCEPTORS } from '@angular/common/http';
//*******************************************************//



const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,


    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
         providers: {
           email: {
             service: NbEmailPassAuthProvider,
             config: {
                 baseEndpoint: 'http://localhost:3000/v1',
                 login: {
                   endpoint: '/auth/signin',
                   method: 'post',
                 },
                 register: {
                   endpoint: '/auth/signup',
                   method: 'post',
                 },
                 logout: {
                    endpoint: '/auth/signout',
                    method: 'post',
                  },
                  requestPass: {
                    endpoint: '/auth/forgot',
                    method: 'post',
                  },
                  resetPass: {
                    endpoint: '/auth/reset',
                    method: 'post',
                  },
             },
           },
         },
         forms: {
          login: formSetting,
          register: formSetting,
          requestPassword: formSetting,
          resetPassword: formSetting,
          logout: {
            redirectDelay: 0,
          },
        },
       }),


//https://github.com/akveo/nebular/blob/master/src/app/app.module.ts
   NbSecurityModule.forRoot({
     accessControl: {
       guest: {
         view: ['news', 'comments'],
       },
       user: {
         parent: 'guest',
         create: 'comments',
       },
       moderator: {
         parent: 'user',
         create: 'news',
         remove: '*',
       },
     },
   }),

  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: 'moment', useValue: moment },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: NB_AUTH_TOKEN_CLASS, useValue: NbAuthJWTToken },
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
//    { provide: NbRoleProvider, useClass: RoleProvider },

    // { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
  ],
})
export class AppModule {
}