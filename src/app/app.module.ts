import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlatformsComponent } from './platforms/platforms.component';
import { PlatformDetailComponent } from './platform-detail/platform-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { PlatformService } from "./platform.service";
import { MessageService } from "./message.service";
import { AppRoutingModule } from './/app-routing.module';
import { DatafilesComponent } from './datafiles/datafiles.component';
import { DatafileService } from "./datafile.service";
import { DatafileDetailComponent } from './datafile-detail/datafile-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PlatformsComponent,
    PlatformDetailComponent,
    MessagesComponent,
    DatafilesComponent,
    DatafileDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PlatformService, DatafileService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
