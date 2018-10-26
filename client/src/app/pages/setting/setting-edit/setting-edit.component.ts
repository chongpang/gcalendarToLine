import { Component, OnInit } from '@angular/core';
import { ComponentPageTitle } from '../../page-title/page-title';
import { Setting } from '../../../models/setting';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-setting-edit',
  templateUrl: '../setting-add/setting-add.component.html',
  styleUrls: ['./setting-edit.component.scss']
})
export class SettingEditComponent implements OnInit {
  
  model = new Setting('', '', '', false,"","","");

  submitted = false;

  settingId = null;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    public _componentPageTitle: ComponentPageTitle,
    private userService: UserService
  ) { }

  submitNewClass = gql`
    mutation updateSetting($lineUserId: String!, $_id: String!,$lineChannelSecret: String!, $lineChannelToken: String!,$schPostTime: String!, $schStart: String!, $schEnd: String!, $autoPost: Boolean!) {
      updateSetting(lineUserId: $lineUserId, _id: $_id, lineChannelSecret: $lineChannelSecret, lineChannelToken: $lineChannelToken, schPostTime: $schPostTime, schStart: $schStart, schEnd: $schEnd, autoPost: $autoPost){
        _id
        schPostTime
        schStart
        schEnd
        autoPost
        lineChannelSecret
        lineChannelToken,
        lineUserId
      }
    }
  `;

  ngOnInit() {

    if(!this.userService.isUserSignedIn()){
      this.router.navigate(['/sigin']);
    }

    this._componentPageTitle.title = "設定を変更する";

    this.settingId = this._route.snapshot.paramMap.get('id');

    this.apollo.watchQuery({
      query: gql`
          query setting($_id: String!) {
            setting(_id: $_id) {
              _id
              schPostTime
              schStart
              schEnd
              autoPost
              lineChannelSecret
              lineChannelToken
              lineUserId
            }
          }
        `,
      fetchPolicy: 'network-only',
      variables: {
        _id: `${this.settingId}`
      }
      }).valueChanges.subscribe((response) => {
        this.model = Object.assign(new Setting('', '', '', false,"","", ""), response.data["setting"]);
      });
  }

  onSubmit() {
    this.submitted = true;

    this.apollo.mutate({
      mutation: this.submitNewClass,
      variables: {
        _id: this.settingId ,
        schStart: this.model.schStart,
        schEnd: this.model.schEnd,
        schPostTime: this.model.schPostTime,
        autoPost: this.model.autoPost,
        lineChannelSecret: this.model.lineChannelSecret,
        lineChannelToken: this.model.lineChannelToken,
        lineUserId: this.model.lineUserId
      }
    }).subscribe(({ data }) => {
        this.router.navigate(['/setting/', this.settingId]);
      }
    );
  }

  get diagnostic() { return JSON.stringify(this.model); }
}