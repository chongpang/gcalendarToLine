import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ComponentPageTitle } from '../../page-title/page-title';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import gql from 'graphql-tag';
import { MsgType, Query } from '../../../types';

@Component({
  selector: 'app-msg-view',
  templateUrl: './msg-view.component.html',
  styleUrls: ['./msg-view.component.scss']
})
export class MsgViewComponent implements OnInit {
  
  message : Observable<MsgType>;
  
  classId : string;
  constructor(
    public _componentPageTitle: ComponentPageTitle,
    private _route: ActivatedRoute,
    private apollo: Apollo

  ) { 

  }

  ngOnInit() {
    
      this.classId = this._route.snapshot.paramMap.get('id')

      this.message = this.apollo.watchQuery<Query>({
        query: gql`
            query Message($_id: String!) {
              class(_id: $_id) {
                _id
                title
                author
                description
                topic
                url
              }
            }
          `,
        fetchPolicy: 'network-only',
        variables: {
          _id: `${this.classId}`
        }
        }).valueChanges.pipe(
          map(result => result.data.message)
        );
        
        // /subscribe((response) => {
        //   this.class = response.data["class"];
        //   console.log( response);
        //  });

  }

  //get diagnostic() { return JSON.stringify(this.class); }
}
