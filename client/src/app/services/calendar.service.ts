import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import { Apollo } from "../../../node_modules/apollo-angular";
import { Query } from "../types";
import gql from "../../../node_modules/graphql-tag";
import { map } from 'rxjs/operators';
import { UserService } from "./user.service";
import { MatSnackBar } from '@angular/material';


@Injectable()
export class CalendarService {
    private readonly API_URL: string = 'https://www.googleapis.com/calendar/v3/calendars/';
    public static readonly SESSION_STORAGE_MESSAGE: string = "event_comment";
    public static readonly SESSION_STORAGE_CALSTART: string = "cal_start";
    public static readonly SESSION_STORAGE_CALEND: string = "cal_end";
    //public static readonly serverhost = "http://localhost:4000";
    public static serverhost = "http://demo.xueduoduo.io:4000";
    public static serverhostHttps = "https://demo.xueduoduo.io";

    constructor(
        private httpClient: HttpClient,
        private apollo: Apollo,
        private userService: UserService,
        public snackBar: MatSnackBar,
    
    ) {
    }

    public getEvents(authtoken: string, params: any): Observable<any> {
        let url = this.API_URL + params.calendarId +"/events?";
        for (let key in params) {
            if(key == "clendarId") continue;
            let value = params[key];
            url += key + "=" + value + "&"
        }
        return this.httpClient.get(url, {
          headers: new HttpHeaders({
                Authorization: `Bearer ${authtoken}`
            })
        });
    }

    public saveCalendarImage(dataURL) : Observable<any> {

        return this.httpClient.post( CalendarService.serverhost +  "/upload", { data: dataURL.replace(/^data:image\/png;base64,/, "")},{
            headers: new HttpHeaders({
                'Content-Type': 'Application/json'
            })  
        });
    }

    public saveCalDate (start: string, end: string){

        sessionStorage.setItem(
            CalendarService.SESSION_STORAGE_CALSTART, start);
        sessionStorage.setItem(
                CalendarService.SESSION_STORAGE_CALEND, end);
    }

    public savePushMessage( calStart: string, calEnd: string, image : string, calMsg: string, createdBy : string){

        let newMessage = gql`
            mutation addMessage($calStart: String!, $calEnd: String!, $image: String!, $calMsg: String!, $createdBy: String!) {
                addMessage(calStart: $calStart, calEnd: $calEnd, image: $image, calMsg: $calMsg, createdBy: $createdBy){
                    calStart
                    calEnd
                    image        
                    calMsg
                    createdBy
                }
            }
        `;

        this.apollo.mutate({
            mutation: newMessage,
            variables: {
              calStart: calStart,
              calEnd: calEnd,
              image: image,
              calMsg: calMsg,
              createdBy: createdBy,
            }
          }).subscribe(({ data }) => {
              console.log(data);
            }
          );
    }
    /**
     * 
     * @param items 
     */
    public saveCalCommentToLocal(items: any[]) {

        let commentAll = "";
        items.forEach(item => {
            let comment = "";
            let summay = item.summary;
            if(item.attendees){
                item.attendees.forEach(attendee => {
                    if(attendee.comment){
                        comment = `
                            ${comment}
        
                            ${attendee.email}:
                            ${attendee.comment}
    
                        `;
                    }
                });
            }
            if(comment){

                commentAll = `
                ${commentAll}
                ${summay}
                ${comment}

            `;
            }

        });

        sessionStorage.setItem(
            CalendarService.SESSION_STORAGE_MESSAGE, commentAll);

    }

    public getSetting(){
        return this.apollo.watchQuery<Query>({
          query: gql`
            query setting($email: String!) {
              setting (email: $email){
                schPostTime
                schStart
                schEnd
                autoPost
                lineChannelSecret
                lineChannelToken
                lineUserId
                email
              }
            }
          `,
          variables: {
            email: `${this.userService.getEmail()}`,
          }
        })
          .valueChanges
          .pipe(
            map(result => result.data.setting)
          );
      }
    
    public push(memo: string) {

        let comments = sessionStorage.getItem(
            CalendarService.SESSION_STORAGE_MESSAGE);

        if(!comments){
            comments = memo;
        }

        if(!comments){
            comments = "コメントがありません！";
        }
        let n = new Date();
        let imageUrl = CalendarService.serverhostHttps + "/calendar/calendar_" + n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate() + "_" + n.getHours() + ".png"
        this.savePushMessage(sessionStorage.getItem(
            CalendarService.SESSION_STORAGE_CALSTART), sessionStorage.getItem(
                CalendarService.SESSION_STORAGE_CALEND), imageUrl, comments, sessionStorage.getItem(
            UserService.SESSION_STORAGE_EMAIL));
        
        this.getSetting().subscribe(result => {
            this.httpClient.post(CalendarService.serverhost + "/push", {
                lineUserId: result.lineUserId,
                messages:[
                    {
                        type: "image",
                        originalContentUrl: imageUrl,
                        previewImageUrl: imageUrl
                    },
                    {
                        type: "text",
                        text: comments
                    }
                ],
                lineChannelToken: result.lineChannelToken
            },{
                headers: new HttpHeaders({
                    'Content-Type': 'Application/json',
                })  
            }).subscribe(res => {

                this.savePushMessage(sessionStorage.getItem(
                    CalendarService.SESSION_STORAGE_CALSTART), sessionStorage.getItem(
                        CalendarService.SESSION_STORAGE_CALEND), imageUrl, comments, sessionStorage.getItem(
                    UserService.SESSION_STORAGE_EMAIL));

                this.snackBar.open('イベントをLineに送信しました。', 'SUCCESS', {
                    duration: 5000
                  });
              }, error => {
                console.log(error);
                this.snackBar.open(error.message, 'ERROR', {
                    duration: 3000
                  });
              });;
        });

        
    }
}
