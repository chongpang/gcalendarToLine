import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatCardModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatDialogModule, MatSidenavModule, MatInputModule,MatNativeDateModule, MatDatepickerModule ,MatCheckboxModule} from '@angular/material';
import { CoreModule } from './core/core.module';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ComponentHeaderModule } from './pages/page-header/page-header.component';
import { ComponentPageTitle } from './pages/page-title/page-title';
import { MsgListComponent } from './pages/message/msg-list/msg-list.component';
import { MsgAddComponent } from './pages/message/msg-add/msg-add.component';
import { MsgViewComponent } from './pages/message/msg-view/msg-view.component';
import { MsgEditComponent } from './pages/message/msg-edit/msg-edit.component';
import { SettingEditComponent } from './pages/setting/setting-edit/setting-edit.component';
import { SettingViewComponent } from './pages/setting/setting-view/setting-view.component';
import { SettingAddComponent } from './pages/setting/setting-add/setting-add.component';
import { SiginComponent } from './pages/sigin/sigin.component';
import { UserService} from './services/user.service';
import { CalendarService} from './services/calendar.service';

import {
  GoogleApiModule, 
  NgGapiClientConfig, 
  NG_GAPI_CONFIG,
} from "ng-gapi";
import { SendDialogComponentDialog } from './pages/send-dialog/send-dialog.component';

let serverName = "http://yoursever:4000";
let gapiClientConfig: NgGapiClientConfig = {
  client_id: "939447181424-5virpc63ng99b797nsruusa6n05jb330.apps.googleusercontent.com",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  scope: [
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/calendar"
  ].join(" ")
};

//declare var gapi : any;

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MsgListComponent,
    MsgAddComponent,
    MsgViewComponent,
    MsgEditComponent,
    SettingEditComponent,
    SettingViewComponent,
    SettingAddComponent,
    SiginComponent,
    SendDialogComponentDialog
  ],
  imports: [
    CoreModule,
    FormsModule,
    ComponentHeaderModule,
  	MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    AppRoutingModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ],
  entryComponents: [SendDialogComponentDialog],
  providers: 
  [
    ComponentPageTitle,
    UserService,
    CalendarService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({
        uri: serverName + '/graphql',
      }),
      cache: new InMemoryCache()
    });
  }
}