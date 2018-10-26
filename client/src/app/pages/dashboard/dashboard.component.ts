import { AfterViewInit, ElementRef, Component, OnInit, NgZone, ViewChild, DoCheck } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Router } from "@angular/router";
import { Query } from '../../types';
import { GoogleAuthService } from 'ng-gapi';
import { GoogleApiService } from 'ng-gapi';
import { CalendarService } from '../../services/calendar.service';
import { UserService } from '../../services/user.service';


//declare var gapi : any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, AfterViewInit, DoCheck{

  events: any[];

  params:  { [key: string]: string; } = {};;

  rectW = 199.5;
  rectH = 40;
  canvasH = 800;
  canvasW = 1024;
  rectColor = '#f5f5f5';
  gridColor = 'lightgrey';
  gbColor = 'whitesmoke';
  maxEndTime = null;

  url = "";

  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private zone: NgZone,
    private authService: GoogleAuthService,
    private gapiService: GoogleApiService,
    private calendarService: CalendarService,
    private userServie: UserService
  ) { 
    this.url = router.url;
    this.gapiService.onLoad().subscribe();
  }

  public ngAfterViewInit() {
    console.log(this.url );
    if(this.url != "/dashboard"){ 
      return;
    }
    // 参照をとれる
    const canvas = this.myCanvas.nativeElement;
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');

    //this.drawGrid([]);

    // let res = JSON.parse("{\r\n      \"kind\": \"calendar#events\",\r\n      \"etag\": \"\\\"p330ct34hsmhdo0g\\\"\",\r\n      \"summary\": \"chong.pang@bizreach.co.jp\",\r\n      \"updated\": \"2018-07-16T04:32:44.808Z\",\r\n      \"timeZone\": \"Asia\/Tokyo\",\r\n      \"accessRole\": \"owner\",\r\n      \"defaultReminders\": [\r\n       {\r\n        \"method\": \"popup\",\r\n        \"minutes\": 10\r\n       }\r\n      ],\r\n      \"items\": [\r\n       {\r\n        \"kind\": \"calendar#event\",\r\n        \"etag\": \"\\\"3061739878170000\\\"\",\r\n        \"id\": \"560q8av017olahnc5ul6suoss4_20180717T010000Z\",\r\n        \"status\": \"confirmed\",\r\n        \"htmlLink\": \"https:\/\/www.google.com\/calendar\/event?eid=NTYwcThhdjAxN29sYWhuYzV1bDZzdW9zczRfMjAxODA3MTdUMDEwMDAwWiBjaG9uZy5wYW5nQGJpenJlYWNoLmNvLmpw\",\r\n        \"created\": \"2017-06-26T11:20:04.000Z\",\r\n        \"updated\": \"2018-07-06T09:38:59.085Z\",\r\n        \"summary\": \"\u3010\u4E88\u5B9A\u5165\u308C\u308B\u3068\u304D\u306F\u8981\u76F8\u8AC7\u3011CT \u30C1\u30B1\u30C3\u30C8\u30C6\u30B9\u30C8\",\r\n        \"location\": \"\u57F7\u52D9\u5BA4\",\r\n        \"creator\": {\r\n         \"email\": \"mashiko@bizreach.co.jp\"\r\n        },\r\n        \"organizer\": {\r\n         \"email\": \"bizreach.co.jp_1ua8u98kh0gk253eicsvkontc0@group.calendar.google.com\",\r\n         \"displayName\": \"CT\u30EA\u30EA\u30FC\u30B9\u30B5\u30A4\u30AF\u30EB\"\r\n        },\r\n        \"start\": {\r\n         \"dateTime\": \"2018-07-17T10:00:00+09:00\",\r\n         \"timeZone\": \"Asia\/Tokyo\"\r\n        },\r\n        \"end\": {\r\n         \"dateTime\": \"2018-07-17T17:00:00+09:00\",\r\n         \"timeZone\": \"Asia\/Tokyo\"\r\n        },\r\n        \"recurringEventId\": \"560q8av017olahnc5ul6suoss4_R20180717T010000\",\r\n        \"originalStartTime\": {\r\n         \"dateTime\": \"2018-07-17T10:00:00+09:00\",\r\n         \"timeZone\": \"Asia\/Tokyo\"\r\n        },\r\n        \"iCalUID\": \"560q8av017olahnc5ul6suoss4_R20180717T010000@google.com\",\r\n        \"sequence\": 5,\r\n        \"attendees\": [\r\n         {\r\n          \"email\": \"div-product_ct@bizreach.co.jp\", \"comment\": \"div-product_ct@bizreach.co.jp\",\r\n          \"displayName\": \"\u30D7\u30ED\u30C0\u30AF\u30C8\u90E8\uFF08\u30AD\u30E3\u30EA\u30C8\u30EC\uFF09\",\r\n          \"responseStatus\": \"needsAction\"\r\n         },\r\n         {\r\n          \"email\": \"wei.xu@bizreach.co.jp\",\r\n          \"responseStatus\": \"needsAction\"\r\n         },\r\n         {\r\n          \"email\": \"koki.miura@bizreach.co.jp\",\r\n          \"responseStatus\": \"needsAction\"\r\n         },\r\n         {\r\n          \"email\": \"div-product_design_ct@bizreach.co.jp\",\r\n          \"displayName\": \"\u30AD\u30E3\u30EA\u30A2\u30C8\u30EC\u30C3\u30AF\u4E8B\u696D\u30B0\u30EB\u30FC\u30D7\uFF08\u30D7\u30ED\u30C0\u30AF\u30C8\u30C7\u30B6\u30A4\u30F3\uFF09\",\r\n          \"responseStatus\": \"needsAction\"\r\n         },\r\n         {\r\n          \"email\": \"chong.pang@bizreach.co.jp\",\r\n          \"self\": true,\r\n          \"responseStatus\": \"needsAction\"\r\n         }\r\n        ],\r\n        \"guestsCanModify\": true,\r\n        \"reminders\": {\r\n         \"useDefault\": true\r\n        }\r\n       },\r\n       {\r\n        \"kind\": \"calendar#event\",\r\n        \"etag\": \"\\\"3062937698800000\\\"\",\r\n        \"id\": \"qqrjs1um28kmbs3d8r1mn51b20_20180717T080000Z\",\r\n        \"status\": \"confirmed\",\r\n        \"htmlLink\": \"https:\/\/www.google.com\/calendar\/event?eid=cXFyanMxdW0yOGttYnMzZDhyMW1uNTFiMjBfMjAxODA3MTdUMDgwMDAwWiBjaG9uZy5wYW5nQGJpenJlYWNoLmNvLmpw\",\r\n        \"created\": \"2017-06-26T11:36:50.000Z\",\r\n        \"updated\": \"2018-07-13T08:00:49.400Z\",\r\n        \"summary\": \"\u3010\u4E88\u5B9A\u5165\u308C\u308B\u3068\u304D\u306F\u8981\u76F8\u8AC7\u3011CT \u30B7\u30CA\u30EA\u30AA\u30C6\u30B9\u30C8\",\r\n        \"location\": \"\u57F7\u52D9\u5BA4\",\r\n        \"creator\": {\r\n         \"email\": \"mashiko@bizreach.co.jp\"\r\n        },\r\n        \"organizer\": {\r\n         \"email\": \"bizreach.co.jp_1ua8u98kh0gk253eicsvkontc0@group.calendar.google.com\",\r\n         \"displayName\": \"CT\u30EA\u30EA\u30FC\u30B9\u30B5\u30A4\u30AF\u30EB\"\r\n        },\r\n        \"start\": {\r\n         \"dateTime\": \"2018-07-17T17:00:00+09:00\",\r\n         \"timeZone\": \"Asia\/Tokyo\"\r\n        },\r\n        \"end\": {\r\n         \"dateTime\": \"2018-07-17T18:00:00+09:00\",\r\n         \"timeZone\": \"Asia\/Tokyo\"\r\n        },\r\n        \"recurringEventId\": \"qqrjs1um28kmbs3d8r1mn51b20_R20180522T080000\",\r\n        \"originalStartTime\": {\r\n         \"dateTime\": \"2018-07-17T17:00:00+09:00\",\r\n         \"timeZone\": \"Asia\/Tokyo\"\r\n        },\r\n        \"iCalUID\": \"qqrjs1um28kmbs3d8r1mn51b20_R20180522T080000@google.com\",\r\n        \"sequence\": 5,\r\n        \"attendees\": [\r\n         {\r\n          \"email\": \"chong.pang@bizreach.co.jp\",\"comment\": \"chong.pang@bizreach.co.jp\",\r\n          \"self\": true,\r\n          \"responseStatus\": \"needsAction\"\r\n         },\r\n         {\r\n          \"email\": \"div-product_ct@bizreach.co.jp\",\r\n          \"displayName\": \"\u30D7\u30ED\u30C0\u30AF\u30C8\u90E8\uFF08\u30AD\u30E3\u30EA\u30C8\u30EC\uFF09\",\r\n          \"responseStatus\": \"needsAction\"\r\n         },\r\n         {\r\n          \"email\": \"koki.miura@bizreach.co.jp\",\r\n          \"responseStatus\": \"needsAction\"\r\n         },\r\n         {\r\n          \"email\": \"div-product_design_ct@bizreach.co.jp\",\r\n          \"displayName\": \"\u30AD\u30E3\u30EA\u30A2\u30C8\u30EC\u30C3\u30AF\u4E8B\u696D\u30B0\u30EB\u30FC\u30D7\uFF08\u30D7\u30ED\u30C0\u30AF\u30C8\u30C7\u30B6\u30A4\u30F3\uFF09\",\r\n          \"responseStatus\": \"needsAction\"\r\n         }\r\n        ],\r\n        \"guestsCanModify\": true,\r\n        \"reminders\": {\r\n         \"useDefault\": true\r\n        }\r\n       },\r\n       {\r\n        \"kind\": \"calendar#event\",\r\n        \"etag\": \"\\\"3063102862982000\\\"\",\r\n        \"id\": \"45hljkkcsco2kuae9uc5kegkof_20180718T003000Z\",\r\n        \"status\": \"confirmed\",\r\n        \"htmlLink\": \"https:\/\/www.google.com\/calendar\/event?eid=NDVobGpra2NzY28ya3VhZTl1YzVrZWdrb2ZfMjAxODA3MThUMDAzMDAwWiBjaG9uZy5wYW5nQGJpenJlYWNoLmNvLmpw\",\r\n        \"created\": \"2018-03-22T01:39:12.000Z\",\r\n        \"updated\": \"2018-07-14T06:57:11.491Z\",\r\n        \"summary\": \"CT\u5168\u4F53\u671D\u4F1A\",\r\n        \"description\": \"\u25C6\u30A2\u30B8\u30A7\u30F3\u30C0\\n\uFF15\u5206\u3000\u4E2D\u6751\u3055\u3093\u30FB\u8302\u6728\u3055\u3093\u30FB\u5F90\u3055\u3093\u81EA\u5DF1\u7D39\u4ECB \\n\uFF17\u5206\u3000\u30EA\u30EA\u30FC\u30B9\u5171\u6709 \\n\uFF15\u5206\u3000\u6328\u62F6\\n\uFF13\u5206\u3000\u4E2D\u5D8B\u3055\u3093\u3088\u308A\",\r\n        \"creator\": {\r\n         \"email\": \"shiori.obara@bizreach.co.jp\"\r\n        },\r\n        \"organizer\": {\r\n         \"email\": \"shiori.obara@bizreach.co.jp\"\r\n        },\r\n        \"start\": {\r\n         \"dateTime\": \"2018-07-18T09:30:00+09:00\"\r\n        },\r\n        \"end\": {\r\n         \"dateTime\": \"2018-07-18T09:55:00+09:00\"\r\n        },\r\n        \"recurringEventId\": \"45hljkkcsco2kuae9uc5kegkof_R20180718T003000\",\r\n        \"originalStartTime\": {\r\n         \"dateTime\": \"2018-07-18T09:30:00+09:00\"\r\n        },\r\n        \"iCalUID\": \"45hljkkcsco2kuae9uc5kegkof_R20180718T003000@google.com\",\r\n        \"sequence\": 0,\r\n        \"attendees\": [\r\n         {\r\n          \"email\": \"shuichi.yomo@bizreach.co.jp\",\"comment\": \"shuichi.yomo@bizreach.co.jp\",\r\n          \"responseStatus\": \"accepted\"\r\n         },\r\n         {\r\n          \"email\": \"ryusuke.kogetsu@bizreach.co.jp\",\r\n          \"responseStatus\": \"needsAction\"\r\n         },\r\n         {\r\n          \"email\": \"chong.pang@bizreach.co.jp\",\r\n          \"self\": true,\r\n          \"responseStatus\": \"needsAction\"\r\n         },\r\n         {\r\n          \"email\": \"rie.asano@bizreach.co.jp\",\r\n          \"displayName\": \"\u6D45\u91CE\u91CC\u82F1\",\r\n          \"responseStatus\": \"needsAction\"\r\n         },\r\n         {\r\n          \"email\": \"a.yamamoto@bizreach.co.jp\",\r\n          \"responseStatus\": \"needsAction\"\r\n         },\r\n         {\r\n          \"email\": \"tatsuya.tokudome@bizreach.co.jp\",\r\n          \"responseStatus\": \"declined\"\r\n         },\r\n         {\r\n          \"email\": \"div-product_design_ct@bizreach.co.jp\",\r\n          \"displayName\": \"\u30AD\u30E3\u30EA\u30A2\u30C8\u30EC\u30C3\u30AF\u4E8B\u696D\u30B0\u30EB\u30FC\u30D7\uFF08\u30D7\u30ED\u30C0\u30AF\u30C8\u30C7\u30B6\u30A4\u30F3\uFF09\",\r\n          \"responseStatus\": \"needsAction\"\r\n         },\r\n         {\r\n          \"email\": \"shiori.obara@bizreach.co.jp\",\r\n          \"organizer\": true,\r\n          \"responseStatus\": \"accepted\"\r\n         },\r\n         {\r\n          \"email\": \"div-careertrek_business@bizreach.co.jp\",\r\n          \"displayName\": \"\u30AD\u30E3\u30EA\u30A2\u30C8\u30EC\u30C3\u30AF\u4E8B\u696D\u90E8\",\r\n          \"responseStatus\": \"needsAction\"\r\n         }\r\n        ],\r\n        \"hangoutLink\": \"https:\/\/hangouts.google.com\/hangouts\/_\/bizreach.co.jp\/div-careertrek?hceid=c2hpb3JpLm9iYXJhQGJpenJlYWNoLmNvLmpw.45hljkkcsco2kuae9uc5kegkof\",\r\n        \"conferenceData\": {\r\n         \"entryPoints\": [\r\n          {\r\n           \"entryPointType\": \"video\",\r\n           \"uri\": \"https:\/\/hangouts.google.com\/hangouts\/_\/bizreach.co.jp\/div-careertrek?hceid=c2hpb3JpLm9iYXJhQGJpenJlYWNoLmNvLmpw.45hljkkcsco2kuae9uc5kegkof\",\r\n           \"label\": \"div-careertrek\"\r\n          }\r\n         ],\r\n         \"conferenceSolution\": {\r\n          \"key\": {\r\n           \"type\": \"eventNamedHangout\"\r\n          },\r\n          \"name\": \"Hangouts\",\r\n          \"iconUri\": \"https:\/\/lh5.googleusercontent.com\/proxy\/9vT2XwMHPzrIcW56Ic3FX6_OSYvrjHEwOUYOmA0eMoR-_sY59k4mQMd0JnqCp8GCOmqimFKP3vSeFaIe4k5MewpEcCuK6PXlB2Z4AKTMV78OB_CJqXHrrkAO-yf5FYJsiaTBwjUP9cU0lRlP-HPC2w\"\r\n         },\r\n         \"conferenceId\": \"div-careertrek\",\r\n         \"signature\": \"AGyl5B8Ur+XfS\/WSAZFzZ65W7BH3\"\r\n        },\r\n        \"reminders\": {\r\n         \"useDefault\": true\r\n        }\r\n       },\r\n       {\r\n        \"kind\": \"calendar#event\",\r\n        \"etag\": \"\\\"3061739918176000\\\"\",\r\n        \"id\": \"qkle2da159o954btr5d3dksut8_20180718T010000Z\",\r\n        \"status\": \"confirmed\",\r\n        \"htmlLink\": \"https:\/\/www.google.com\/calendar\/event?eid=cWtsZTJkYTE1OW85NTRidHI1ZDNka3N1dDhfMjAxODA3MThUMDEwMDAwWiBjaG9uZy5wYW5nQGJpenJlYWNoLmNvLmpw\",\r\n        \"created\": \"2017-06-26T11:47:04.000Z\",\r\n        \"updated\": \"2018-07-06T09:39:19.088Z\",\r\n        \"summary\": \"\u3010\u4E88\u5B9A\u5165\u308C\u308B\u3068\u304D\u306F\u8981\u76F8\u8AC7\u3011CT \u30B7\u30CA\u30EA\u30AA\u30C6\u30B9\u30C8(\u4E88\u5099\u6642\u9593)\",\r\n        \"location\": \"\u57F7\u52D9\u5BA4\",\r\n        \"creator\": {\r\n         \"email\": \"mashiko@bizreach.co.jp\"\r\n        },\r\n        \"organizer\": {\r\n         \"email\": \"bizreach.co.jp_1ua8u98kh0gk253eicsvkontc0@group.calendar.google.com\",\r\n         \"displayName\": \"CT\u30EA\u30EA\u30FC\u30B9\u30B5\u30A4\u30AF\u30EB\"\r\n        },\r\n        \"start\": {\r\n         \"dateTime\": \"2018-07-18T10:00:00+09:00\",\r\n         \"timeZone\": \"Asia\/Tokyo\"\r\n        },\r\n        \"end\": {\r\n         \"dateTime\": \"2018-07-18T12:00:00+09:00\",\r\n         \"timeZone\": \"Asia\/Tokyo\"\r\n        },\r\n        \"recurringEventId\": \"qkle2da159o954btr5d3dksut8_R20180718T010000\",\r\n        \"originalStartTime\": {\r\n         \"dateTime\": \"2018-07-18T10:00:00+09:00\",\r\n         \"timeZone\": \"Asia\/Tokyo\"\r\n        },\r\n        \"iCalUID\": \"qkle2da159o954btr5d3dksut8_R20180718T010000@google.com\",\r\n        \"sequence\": 4,\r\n        \"attendees\": [\r\n         {\r\n          \"email\": \"wei.xu@bizreach.co.jp\",\r\n          \"responseStatus\": \"needsAction\"\r\n         },\r\n         {\r\n          \"email\": \"div-product_design_ct@bizreach.co.jp\",\r\n          \"displayName\": \"\u30AD\u30E3\u30EA\u30A2\u30C8\u30EC\u30C3\u30AF\u4E8B\u696D\u30B0\u30EB\u30FC\u30D7\uFF08\u30D7\u30ED\u30C0\u30AF\u30C8\u30C7\u30B6\u30A4\u30F3\uFF09\",\r\n          \"responseStatus\": \"needsAction\"\r\n         },\r\n         {\r\n          \"email\": \"div-product_ct@bizreach.co.jp\",\r\n          \"displayName\": \"\u30D7\u30ED\u30C0\u30AF\u30C8\u90E8\uFF08\u30AD\u30E3\u30EA\u30C8\u30EC\uFF09\",\r\n          \"responseStatus\": \"needsAction\"\r\n         },\r\n         {\r\n          \"email\": \"chong.pang@bizreach.co.jp\",\r\n          \"self\": true,\r\n          \"responseStatus\": \"needsAction\"\r\n         },\r\n         {\r\n          \"email\": \"koki.miura@bizreach.co.jp\",\r\n          \"responseStatus\": \"needsAction\"\r\n         }\r\n        ],\r\n        \"guestsCanModify\": true,\r\n        \"reminders\": {\r\n         \"useDefault\": true\r\n        }\r\n       }\r\n      ]\r\n     }");
    // //let res = JSON.parse("{\r\n \"kind\": \"calendar#events\",\r\n \"etag\": \"\\\"p338bjcu8puhto0g\\\"\",\r\n \"summary\": \"\u5E9E\u51B2\",\r\n \"updated\": \"2018-07-16T12:28:54.946Z\",\r\n \"timeZone\": \"Asia\/Tokyo\",\r\n \"accessRole\": \"owner\",\r\n \"defaultReminders\": [\r\n  {\r\n   \"method\": \"popup\",\r\n   \"minutes\": 10\r\n  }\r\n ],\r\n \"items\": [\r\n  {\r\n   \"kind\": \"calendar#event\",\r\n   \"etag\": \"\\\"3063488269892000\\\"\",\r\n   \"id\": \"3d0fmfeba4dvm35frb80krlckq\",\r\n   \"status\": \"confirmed\",\r\n   \"htmlLink\": \"https:\/\/www.google.com\/calendar\/event?eid=M2QwZm1mZWJhNGR2bTM1ZnJiODBrcmxja3EgeW5wYW5nY2hvbmdAbQ\",\r\n   \"created\": \"2018-07-16T11:27:19.000Z\",\r\n   \"updated\": \"2018-07-16T12:28:54.946Z\",\r\n   \"summary\": \"\u7D0D\u54C1\",\r\n   \"creator\": {\r\n    \"email\": \"ynpangchong@gmail.com\",\r\n    \"displayName\": \"PANG CHONG\",\r\n    \"self\": true\r\n   },\r\n   \"organizer\": {\r\n    \"email\": \"ynpangchong@gmail.com\",\r\n    \"displayName\": \"PANG CHONG\",\r\n    \"self\": true\r\n   },\r\n   \"start\": {\r\n    \"dateTime\": \"2018-07-17T14:15:00+09:00\"\r\n   },\r\n   \"end\": {\r\n    \"dateTime\": \"2018-07-17T23:15:00+09:00\"\r\n   },\r\n   \"iCalUID\": \"3d0fmfeba4dvm35frb80krlckq@google.com\",\r\n   \"sequence\": 1,\r\n   \"extendedProperties\": {\r\n    \"private\": {\r\n     \"everyoneDeclinedDismissed\": \"-1\"\r\n    }\r\n   },\r\n   \"reminders\": {\r\n    \"useDefault\": true\r\n   }\r\n  },\r\n  {\r\n   \"kind\": \"calendar#event\",\r\n   \"etag\": \"\\\"3063480931322000\\\"\",\r\n   \"id\": \"4t56gc7kituau52htjaqog2csp\",\r\n   \"status\": \"confirmed\",\r\n   \"htmlLink\": \"https:\/\/www.google.com\/calendar\/event?eid=NHQ1NmdjN2tpdHVhdTUyaHRqYXFvZzJjc3AgeW5wYW5nY2hvbmdAbQ\",\r\n   \"created\": \"2018-07-16T11:27:45.000Z\",\r\n   \"updated\": \"2018-07-16T11:27:45.661Z\",\r\n   \"summary\": \"\u518D\u7D0D\u54C1\",\r\n   \"creator\": {\r\n    \"email\": \"ynpangchong@gmail.com\",\r\n    \"displayName\": \"PANG CHONG\",\r\n    \"self\": true\r\n   },\r\n   \"organizer\": {\r\n    \"email\": \"ynpangchong@gmail.com\",\r\n    \"displayName\": \"PANG CHONG\",\r\n    \"self\": true\r\n   },\r\n   \"start\": {\r\n    \"dateTime\": \"2018-07-17T15:30:00+09:00\"\r\n   },\r\n   \"end\": {\r\n    \"dateTime\": \"2018-07-17T17:00:00+09:00\"\r\n   },\r\n   \"iCalUID\": \"4t56gc7kituau52htjaqog2csp@google.com\",\r\n   \"sequence\": 0,\r\n   \"extendedProperties\": {\r\n    \"private\": {\r\n     \"everyoneDeclinedDismissed\": \"-1\"\r\n    }\r\n   },\r\n   \"reminders\": {\r\n    \"useDefault\": true\r\n   }\r\n  },\r\n  {\r\n   \"kind\": \"calendar#event\",\r\n   \"etag\": \"\\\"3059821531604000\\\"\",\r\n   \"id\": \"6gqjl54mhnt84p6bmp2qbt5f69_20180717T133000Z\",\r\n   \"status\": \"confirmed\",\r\n   \"htmlLink\": \"https:\/\/www.google.com\/calendar\/event?eid=Nmdxamw1NG1obnQ4NHA2Ym1wMnFidDVmNjlfMjAxODA3MTdUMTMzMDAwWiB5bnBhbmdjaG9uZ0Bt\",\r\n   \"created\": \"2018-06-25T07:12:45.000Z\",\r\n   \"updated\": \"2018-06-25T07:12:45.802Z\",\r\n   \"summary\": \"\u4ECA\u65E5\u306ETODO\u78BA\u8A8D\u6642\u9593\",\r\n   \"description\": \"\u4ECA\u65E5\u306ETODO\u306F\u5168\u90E8\u30AF\u30EA\u30A2\u3057\u305F\uFF1F\\n\\n\u660E\u65E5\u306ETODO\u306F\u660E\u78BA\u306B\u306A\u3063\u3066\u3044\u308B\u304B\uFF1F\",\r\n   \"creator\": {\r\n    \"email\": \"ynpangchong@gmail.com\",\r\n    \"displayName\": \"PANG CHONG\",\r\n    \"self\": true\r\n   },\r\n   \"organizer\": {\r\n    \"email\": \"ynpangchong@gmail.com\",\r\n    \"displayName\": \"PANG CHONG\",\r\n    \"self\": true\r\n   },\r\n   \"start\": {\r\n    \"dateTime\": \"2018-07-17T22:30:00+09:00\",\r\n    \"timeZone\": \"Asia\/Tokyo\"\r\n   },\r\n   \"end\": {\r\n    \"dateTime\": \"2018-07-17T23:30:00+09:00\",\r\n    \"timeZone\": \"Asia\/Tokyo\"\r\n   },\r\n   \"recurringEventId\": \"6gqjl54mhnt84p6bmp2qbt5f69\",\r\n   \"originalStartTime\": {\r\n    \"dateTime\": \"2018-07-17T22:30:00+09:00\",\r\n    \"timeZone\": \"Asia\/Tokyo\"\r\n   },\r\n   \"iCalUID\": \"6gqjl54mhnt84p6bmp2qbt5f69@google.com\",\r\n   \"sequence\": 0,\r\n   \"extendedProperties\": {\r\n    \"private\": {\r\n     \"everyoneDeclinedDismissed\": \"-1\"\r\n    }\r\n   },\r\n   \"reminders\": {\r\n    \"useDefault\": true\r\n   }\r\n  },\r\n  {\r\n   \"kind\": \"calendar#event\",\r\n   \"etag\": \"\\\"3059821322882000\\\"\",\r\n   \"id\": \"7qi739uir6u3s68r2esb33lsc8_20180718T000000Z\",\r\n   \"status\": \"confirmed\",\r\n   \"htmlLink\": \"https:\/\/www.google.com\/calendar\/event?eid=N3FpNzM5dWlyNnUzczY4cjJlc2IzM2xzYzhfMjAxODA3MThUMDAwMDAwWiB5bnBhbmdjaG9uZ0Bt\",\r\n   \"created\": \"2018-06-25T07:11:01.000Z\",\r\n   \"updated\": \"2018-06-25T07:11:01.441Z\",\r\n   \"summary\": \"\u4ECA\u65E5\u306ETODO\u78BA\u8A8D\uFF08Private, Work\uFF09\",\r\n   \"description\": \"\u4ECA\u65E5\u306ETODO\u78BA\u8A8D\uFF08Private, Work\uFF09\\n\\n\u4ECA\u65E5\u306ETODO\u3092\u4ECA\u65E5\u3067\u5B8C\u7D50\u3057\u308D\uFF01\",\r\n   \"colorId\": \"11\",\r\n   \"creator\": {\r\n    \"email\": \"ynpangchong@gmail.com\",\r\n    \"displayName\": \"PANG CHONG\",\r\n    \"self\": true\r\n   },\r\n   \"organizer\": {\r\n    \"email\": \"ynpangchong@gmail.com\",\r\n    \"displayName\": \"PANG CHONG\",\r\n    \"self\": true\r\n   },\r\n   \"start\": {\r\n    \"dateTime\": \"2018-07-17T21:00:00+09:00\",\r\n    \"timeZone\": \"Asia\/Tokyo\"\r\n   },\r\n   \"end\": {\r\n    \"dateTime\": \"2018-07-18T10:00:00+09:00\",\r\n    \"timeZone\": \"Asia\/Tokyo\"\r\n   },\r\n   \"recurringEventId\": \"7qi739uir6u3s68r2esb33lsc8\",\r\n   \"originalStartTime\": {\r\n    \"dateTime\": \"2018-07-17T21:00:00+09:00\",\r\n    \"timeZone\": \"Asia\/Tokyo\"\r\n   },\r\n   \"iCalUID\": \"7qi739uir6u3s68r2esb33lsc8@google.com\",\r\n   \"sequence\": 0,\r\n   \"extendedProperties\": {\r\n    \"private\": {\r\n     \"everyoneDeclinedDismissed\": \"-1\"\r\n    }\r\n   },\r\n   \"reminders\": {\r\n    \"useDefault\": true\r\n   }\r\n  }\r\n ]\r\n}\r\n");
    
    // this.drawGrid(res.items);
    // this.drawEvents(res.items);

    // this.calendarService.saveCalCommentToLocal(res.items);

    // setTimeout(() => {
    //   this.calendarService.saveCalendarImage(this.myCanvas.nativeElement.toDataURL("image/png")).subscribe(res => {
    //       console.log(res);
    //     });
    // }, 100);
    
  }

    /** 値の変更時を監視するライフサイクルイベント */
  public ngDoCheck() {
     // this.drawBox(0, 0, "");
    }

  public drawEvents(events: any[]){

    const ctx = this.context;

    if(ctx != null){
      let currentX = 0;
      let currentDayChanged = 0;
      let currentDay = null;
      let eStartPos = null;
      let overlapCnt = 0;

      events.forEach(event => {

        let tStart = new Date(event.start.dateTime);
        let tEnd = new Date(event.end.dateTime);

        if(currentDay == null){
          currentDay = tStart.getDay();
        }
        if(new Date(event.start.dateTime).getDay() != currentDay){
          currentDayChanged++; 
        }
        
        if(eStartPos == null){
          eStartPos = new Date(event.start.dateTime);
        }

        if(this.maxEndTime == null){
          this.maxEndTime = tEnd;
          overlapCnt = 0;
          currentX = 0 + 0.5 + this.rectW / 2;
        }else{

          if(tStart < this.maxEndTime){
            // overlap
            overlapCnt++;
            currentX += 0 + 0.5 + this.rectW * overlapCnt;
            
          }else{
            currentX = 0 + 0.5 + this.rectW / 2;
            overlapCnt = 0;
          }

          if(this.maxEndTime < tEnd){
            this.maxEndTime = tEnd;
          }
        }
      
        let sTmpEnd = (new Date(event.end.dateTime));
        let sTmpStart = (new Date(event.start.dateTime));
        sTmpStart.setSeconds(0), sTmpStart.setMilliseconds(0); 
        sTmpEnd.setSeconds(0), sTmpEnd.setMilliseconds(0);
        eStartPos.setMinutes(0), eStartPos.setSeconds(0);
        eStartPos.setMilliseconds(0);

        let startMinutes = Math.abs(sTmpStart.getTime() - eStartPos.getTime()) / (60 * 1000);
        let hMinutes = Math.abs(sTmpEnd.getTime()- sTmpStart.getTime()) / (60 * 1000);
        let endMinutes = Math.abs(sTmpEnd.getTime()- eStartPos.getTime()) / ( 60 * 1000);

        let startPos = startMinutes * (this.rectH / 60);
        let eventH = hMinutes * (this.rectH / 60);
        let endPos = endMinutes *  (this.rectH / 60);

        let offset = 0;
        if(new Date(event.start.dateTime).getDay() != currentDay){
          //offset = currentDayChanged * (5 * this.rectH); 
        }

        ctx.strokeStyle = "red";//this.gridColor;
        //ctx.fillStyle = 'rgba(255,255,255,.9)';
        ctx.strokeRect(currentX , endPos - eventH - offset, this.rectW, eventH) ;
        let tmpH = endPos;
        if(eventH / 2  > this.rectH){
          tmpH = eventH / 2 + startPos ;
        }
        ctx.fillStyle = "black";
        ctx.fillText(event.summary, currentX , tmpH-offset , 200);
        currentX = 0 + 0.5 + this.rectW / 2;
      });

    }

  }
  
  public drawGrid( events: any[]){
    const ctx = this.context;
    let len = events.length; // events.length
    if( len < 1 ){
        return;
    }
    let start = new Date(events[0].start.dateTime);
    let end = new Date(events[len -1].end.dateTime);
    
    this.calendarService.saveCalDate(events[0].start.dateTime, events[len -1].end.dateTime);

    if(ctx != null){
      // X 
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.fillRect(0, 0, this.canvasW, this.canvasH);
      for (var x = 0; x <= this.canvasW; x += this.rectW) {

        if(x == this.rectW ){
          ctx.moveTo((0.5 + x) / 2 , 0);
          ctx.strokeStyle = this.gridColor;
          ctx.lineTo((0.5 + x) / 2, this.canvasH);
          ctx.stroke();
        }else{
          if( x > 0){
            ctx.moveTo(0.5 + x - this.rectW /2 , 0);
            ctx.strokeStyle = this.gridColor;
            ctx.lineTo(0.5 + x - this.rectW /2, this.canvasH);
            ctx.stroke();
          }else{
            ctx.moveTo(0.5 + x , 0);
            ctx.strokeStyle = this.gridColor;
            ctx.lineTo(0.5 + x, this.canvasH );
            ctx.stroke();
          }
  
        }
      }

      // y
      for (var y = 0; y <= this.canvasH; y += this.rectH) {

        ctx.moveTo(0, 0.5 + y);
        ctx.strokeStyle = this.gridColor;
        ctx.lineTo(this.canvasW , 0.5 + y);
        ctx.stroke();

        // time label
        if(start <=  end){

          ctx.font = "italic bold 18px 'Arial'";
          ctx.textBaseline = 'bottom';
          ctx.strokeStyle = this.gridColor;
          ctx.strokeRect(0, 0.5 + y + this.rectH , this.rectW /2, this.rectH);
          ctx.fillStyle = "black";
          ctx.fillText(start.getDate() + " " + start.getHours() + ":00" , 15, 0.5 + y + this.rectH, this.rectW);
          start.setHours(start.getHours() + 1);
        }

      }
    }
  }

 public ngOnInit() {

    if( this.url != "/dashboard"){

      return;
    }

    if(this.userServie.isUserSignedIn()){
      this.getSetting().subscribe(result => {
        if(result.length > 0 ){
            //this.params['timeMin'] = (new Date(result[0].schStart)).toISOString();
            this.params['timeMin'] = (new Date(result[0].schStart)).toISOString();
            this.params['timeMax'] = (new Date(result[0].schEnd)).toISOString();
            this.params['maxResults'] = '100';
            this.params['orderBy'] = "startTime";
            this.params['showDeleted'] = 'false',
            this.params['singleEvents']= 'true',
            this.params['calendarId'] = this.userServie.getEmail();
            this.calendarService.getEvents(this.userServie.getToken(),this.params)
            .subscribe( 
              res => { this.zone.run(() => {
                this.events = res.items;
                this.drawGrid(this.events);
                this.drawEvents(this.events);

                this.calendarService.saveCalCommentToLocal(res.items);

                setTimeout(() => {
                    this.calendarService.saveCalendarImage(this.myCanvas.nativeElement.toDataURL("image/png")).subscribe(res => {
                      console.log(res);
                    });
                }, 100);
              });} );
          }
      });
    }else{
      this.router.navigate(['sigin']);
    }
  }

public getSetting(){
    return this.apollo.watchQuery<Query>({
      query: gql`
        query settings {
          settings {
            schStart,
            schEnd
          }
        }
      `
    })
      .valueChanges
      .pipe(
        map(result => result.data.settings)
      );
  }
}
