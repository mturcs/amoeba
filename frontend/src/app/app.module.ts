import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "@core/core.module";
import {Grid, Placemark} from "./feature/user/messages/grid";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    CoreModule.forRoot(),
    MatSlideToggleModule
  ],
  providers: [ Grid, Placemark],
  bootstrap: [AppComponent]
})
export class AppModule {}
