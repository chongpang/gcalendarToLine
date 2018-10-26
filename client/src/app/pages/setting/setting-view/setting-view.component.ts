import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ComponentPageTitle } from '../../page-title/page-title';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { SettingType, Query } from '../../../types';
import { UserService } from '../../../services/user.service';
import { CalendarService } from '../../../services/calendar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SendDialogComponentDialog } from '../../send-dialog/send-dialog.component';
@Component({
  selector: 'app-setting-view',
  templateUrl: './setting-view.component.html',
  styleUrls: ['./setting-view.component.scss']
})
export class SettingViewComponent implements OnInit {
  
  setting : Observable<SettingType>;
  
  settingId : string;

  memo: string;

  constructor(
    public _componentPageTitle: ComponentPageTitle,
    private _route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    public userService: UserService,
    private calendarService: CalendarService,
    public dialog: MatDialog

  ) { 

  }

  ngOnInit() {

      if(!this.userService.isUserSignedIn()){
        this.router.navigate(['/sigin']);
      }

      this.settingId = this._route.snapshot.paramMap.get('id');
      let email = this.userService.getEmail();

      if(!this.settingId && !email){
        this.router.navigate(['/setting/add']);
      }
    
      this.setting = this.apollo.watchQuery<Query>({
        query: gql`
            query setting($email: String!) {
              setting(email: $email) {
                _id
                schPostTime
                schStart
                schEnd
                autoPost
                lineChannelSecret
                lineChannelToken
                email
                lineUserId
              }
            }
          `,
        fetchPolicy: 'network-only',
        variables: {
          email: `${this.userService.getEmail()}`,
        }
        }).valueChanges.pipe(
          map(result => result.data.setting)
        );
        
        // /subscribe((response) => {
        //   this.class = response.data["class"];
        //   console.log( response);
        //  });
  }

  send(){
    console.log("send");
    //this.calendarService.push();

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SendDialogComponentDialog, {
      width: '50%',
      disableClose: true,
      data: {memo: sessionStorage.getItem(
        CalendarService.SESSION_STORAGE_MESSAGE)}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.memo = result;
    });
  }

  //get diagnostic() { return JSON.stringify(this.setting); }
}
