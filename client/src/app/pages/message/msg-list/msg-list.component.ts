import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import gql from 'graphql-tag';
import { MsgType, Query } from '../../../types';
import {ComponentPageTitle} from '../../page-title/page-title';

@Component({
  selector: 'app-msg-list',
  templateUrl: './msg-list.component.html',
  styleUrls: ['./msg-list.component.scss']
})
export class MsgListComponent implements OnInit {
  messages: Observable<MsgType[]>;
  constructor(
    public _componentPageTitle: ComponentPageTitle,
    private apollo: Apollo) { }

  ngOnInit() {
    this._componentPageTitle.title = "所有班级";
    this.messages = this.apollo.watchQuery<Query>({
      query: gql`
        query messages {
          messages {
            _id
            title
            description
          }
        }
      `
    })
      .valueChanges
      .pipe(
        map(result => result.data.messages)
      );
  }

}
