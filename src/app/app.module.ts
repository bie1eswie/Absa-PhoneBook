import { DataServiceService } from './services/DataServiceService';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppviewsModule } from './appviews/appviews/appviews.module';
import { ContactsLayoutComponent } from './common/contacts-layout/contacts-layout.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ContactsLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppviewsModule,
    HttpClientModule,
  ],
  providers:  [DataServiceService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
