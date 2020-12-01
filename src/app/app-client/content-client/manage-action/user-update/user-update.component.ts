import {Component, NgZone, OnInit} from '@angular/core';
import {faCloudUploadAlt, faHeart, faTrash, faUpload} from "@fortawesome/free-solid-svg-icons";
import {User} from "../../../../model/user";
import {AppConfig} from "../../../../util/app-config";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../../../service/post.service";
import {MapsAPILoader} from "@agm/core";
import {AuthenticationService} from "../../../../service/authentication.service";
import {CommentService} from "../../../../service/comment.service";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  user: User;

  PREFIX_URL = AppConfig.PREFIX_URL;
  CONTEXT_URL: string = "";
  DEFAULT_IMAGE: string = "./assets/images/avatar.png";

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private authenticationService: AuthenticationService,
              private commentService: CommentService) {
    this.PREFIX_URL = this.PREFIX_URL + this.CONTEXT_URL + "/image/get?imageUrl=";
  }

  ngOnInit(): void {
    if (this.authenticationService.checkLogin()) {
      this.authenticationService.getCurrentUser().subscribe(resp => {
        this.user = resp.data;
      });
    }
  }

  url : any;
  image: File;

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.url = event.target.result;
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
    this.image = event.target.files[0];
  }

  removeImages(){
    this.url = null;
  }

  saveUserImage(){

  }

  faUpload = faUpload;
  faCloudUploadAlt = faCloudUploadAlt;
  faTrash = faTrash;
}
