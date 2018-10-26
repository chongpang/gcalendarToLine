import { Component, OnInit } from '@angular/core';
import { ComponentPageTitle } from '../../page-title/page-title';
import { Message } from '../../../models/message';
import { Apollo } from 'apollo-angular';
//import { map } from 'rxjs/operators';
//import { Observable, Subject } from 'rxjs';
import gql from 'graphql-tag';
//import { Class, Query } from '../../../types';


import { Router } from "@angular/router";
@Component({
  selector: 'app-msg-edit',
  templateUrl: '../msg-add/msg-add.component.html',
  styleUrls: ['./msg-edit.component.scss']
})
export class MsgEditComponent implements OnInit {
  
  model = new Message('', '', '', '', '');

  submitted = false;

  constructor(
    private router: Router,
    private apollo: Apollo,
    public _componentPageTitle: ComponentPageTitle,
  ) { }

  submitNewClass = gql`
    mutation updateClass($url: String!, $title: String!, $description: String!, $topic: String!, $author: String!) {
      updateClass(url: $url, title: $title, description: $description, topic: $topic, author: $author){
        url
        title
        description
        topic
        author
      }
    }
  `;

  ngOnInit() {
    this._componentPageTitle.title = "编辑班级";
  }

  onSubmit() {
    this.submitted = true;

    this.apollo.mutate({
      mutation: this.submitNewClass,
      variables: {
        title: this.model.title,
        author: this.model.author,
        topic: this.model.topic,
        description: this.model.description,
        url: this.model.url
      }
    }).subscribe(({ data }) => {
        this.router.navigate(['/class/']);
      }
    );
  }

  //get diagnostic() { return JSON.stringify(this.model); }
}