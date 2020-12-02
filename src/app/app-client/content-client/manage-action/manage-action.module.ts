import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManageActionRoutingModule} from './manage-action-routing.module';
import {MatListModule} from "@angular/material/list";
import {UserUpdateComponent} from './user-update/user-update.component';
import {ManagePostComponent} from './manage-post/manage-post.component';
import {ManagePostModule} from "./manage-post/manage-post.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatTooltipModule} from "@angular/material/tooltip";
import { CommentComponent } from './comment/comment.component';
import { FavoriteComponent } from './favorite/favorite.component';
import {MatTableModule} from "@angular/material/table";
import { FavoriteDetailDialogComponent } from './favorite/favorite-detail-dialog/favorite-detail-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [UserUpdateComponent, ManagePostComponent, CommentComponent, FavoriteComponent, FavoriteDetailDialogComponent],
  imports: [
    CommonModule,
    MatListModule,
    ManagePostModule,
    ManageActionRoutingModule,
    MatTabsModule,
    MatButtonModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule
  ]
})
export class ManageActionModule {
}
