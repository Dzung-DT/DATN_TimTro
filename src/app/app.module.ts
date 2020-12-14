import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {UrlRedirectComponent} from './redirect/url-redirect/url-redirect.component';
import {AuthenticationService} from "./service/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {JwtInterceptor} from "./filter/jwt.interceptor";
import {AppClientModule} from "./app-client/app-client.module";
import {UrlSecurity} from "./filter/url.security";
import { ToastrModule } from 'ngx-toastr';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonsModule} from "angular-bootstrap-md";
import { EmailVerifyRedirectDialogComponent } from './email-verify/email-verify-redirect-dialog/email-verify-redirect-dialog.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    UrlRedirectComponent,
    EmailVerifyComponent,
    EmailVerifyRedirectDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true
    }),
    MatCardModule,
    ReactiveFormsModule,
    ButtonsModule,
    FontAwesomeModule,
    MatButtonModule
  ],
  providers: [
    AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    CookieService,
    UrlSecurity
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
