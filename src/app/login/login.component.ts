import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../service/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {OAuthResponseToken} from "../model/OAuthResponseToken";
import {AppConfig} from "../util/app-config";
import * as moment from 'moment';
import {UserPrincipal} from "../model/UserPrincipal";
import {subscribeOn} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  oAuthResponseToken: OAuthResponseToken;

  constructor(public router: Router,
              private authenticationService: AuthenticationService,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      inputUsername: new FormControl(''),
      inputPassword: new FormControl('')
    });
  }

  login() {
    this.authenticationService.login(this.loginForm.controls.inputUsername.value, this.loginForm.controls.inputPassword.value).subscribe(resp => {
      if (resp.success) {
        this.oAuthResponseToken = resp.data as OAuthResponseToken;
        if (this.oAuthResponseToken != null) {
          this.cookieService.set(AppConfig.COOKIE_TOKEN_NAME, this.oAuthResponseToken.token,
            moment(new Date()).add(this.oAuthResponseToken.expireTime, 'ms').toDate());
          location.href = "/";
        }
      }
    });
  }

  oauthGoogle() {
    location.href = AppConfig.GOOGLE_AUTH_URL;
  }

  oauthFacebook() {
    location.href = AppConfig.FACEBOOK_AUTH_URL;
  }
}
