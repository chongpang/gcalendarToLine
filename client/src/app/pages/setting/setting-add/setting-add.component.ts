import { Component, OnInit } from '@angular/core';
import { ComponentPageTitle } from '../../page-title/page-title';
import { Setting } from '../../../models/setting';
import { Apollo } from 'apollo-angular';
//import { map } from 'rxjs/operators';
//import { Observable, Subject } from 'rxjs';
import gql from 'graphql-tag';
//import { Class, Query } from '../../../types';
//import { AUTOCOMPLETE_OPTION_HEIGHT } from '@angular/material';
import { Router } from "@angular/router";
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-setting-add',
  templateUrl: './setting-add.component.html',
  styleUrls: ['./setting-add.component.scss']
})

export class SettingAddComponent implements OnInit {

  model = new Setting('', '', '', false, "","", "");

  submitted = false;

  constructor(
    private router: Router,
    private apollo: Apollo,
    public _componentPageTitle: ComponentPageTitle,
    public userService: UserService
  ) { }

  submitNewSetting = gql`
    mutation addSetting($lineUserId: String!, $email: String!, $lineChannelSecret: String!, $lineChannelToken: String!, $schPostTime: String!, $schStart: String!, $schEnd: String!, $autoPost: String!) {
      addSetting(lineUserId: $lineUserId, email: $email, lineChannelSecret: $lineChannelSecret, lineChannelToken: $lineChannelToken, schPostTime: $schPostTime, schStart: $schStart, schEnd: $schEnd, autoPost: $autoPost){
        schPostTime
        schStart
        schEnd
        autoPost
        lineChannelSecret
        lineChannelToken
        email
        lineUserId
        _id
      }
    }
  `;

  ngOnInit() {
    this._componentPageTitle.title = "設定";

    if(!this.userService.isUserSignedIn()){
      this.router.navigate(['/sigin']);
    }
  }

  onSubmit() {
    this.submitted = true;

    this.apollo.mutate({
      mutation: this.submitNewSetting,
      variables: {
        autoPost: this.model.autoPost,
        schEnd: this.model.schEnd,
        schPostTime: this.model.schPostTime,
        schStart: this.model.schStart,
        lineChannelSecret: this.model.lineChannelSecret,
        lineChannelToken: this.model.lineChannelToken,
        email: this.userService.getEmail(),
        lineUserId: this.model.lineUserId
      }
    }).subscribe(({ data }) => {
        this.router.navigate(['/setting/', data.addSetting._id]);
      }
    );
  }

  //get diagnostic() { return JSON.stringify(this.model); }
}
