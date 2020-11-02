import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {faHeart, faSignInAlt, faUpload, faUserCircle, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../service/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {AppConfig} from "../../util/app-config";
import {UserPrincipal} from "../../model/UserPrincipal";

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css']
})
export class HeaderClientComponent implements OnInit {

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private cookieService: CookieService) {
  }

  faUpload = faUpload;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faUserCircle = faUserCircle;
  faHeart = faHeart;
  currentUser: UserPrincipal;

  ngOnInit(): void {
    if (this.cookieService.get(AppConfig.COOKIE_TOKEN_NAME)) {
      this.authenticationService.getCurrentUser().subscribe(resp => {
        this.currentUser = resp.data as UserPrincipal;
        console.log(this.currentUser);
      }, error => {
      });
    }
  }

}