import { Component, OnInit } from '@angular/core';
import { ComponentPageTitle } from '../../page-title/page-title';
import { Message } from '../../../models/message';
import { Apollo } from 'apollo-angular';
//import { map } from 'rxjs/operators';
//import { Observable, Subject } from 'rxjs';
import gql from 'graphql-tag';
//import { Class, Query } from '../../../types';
//import { AUTOCOMPLETE_OPTION_HEIGHT } from '@angular/material';
import { Router } from "@angular/router";

@Component({
  selector: 'app-msg-add',
  templateUrl: './msg-add.component.html',
  styleUrls: ['./msg-add.component.scss']
})

export class MsgAddComponent implements OnInit {

  model = new Message('new title', 'new author', 'description', 'topic', 'url');

  submitted = false;

  constructor(
    private router: Router,
    private apollo: Apollo,
    public _componentPageTitle: ComponentPageTitle,
  ) { }

  submitNewClass = gql`
    mutation addClass($url: String!, $title: String!, $description: String!, $topic: String!, $author: String!) {
      addClass(url: $url, title: $title, description: $description, topic: $topic, author: $author){
        url
        title
        description
        topic
        author
      }
    }
  `;

  ngOnInit() {
    this._componentPageTitle.title = "新建班级";
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
