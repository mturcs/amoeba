import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessagesRoutingModule } from "./messages-routing.module";
import { MessagesComponent } from "./messages.component";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule
  ]
})
export class MessagesModule {
  private item = [1, 2, 3, 4];
}
