import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CalendarService } from '../../services/calendar.service';

export interface DialogData {
  memo: string;
}

@Component({
  selector: 'send-dialog.component.dialog',
  templateUrl: 'send-dialog.component.dialog.html',
  styleUrls: ['send-dialog.component.dialog.scss']
})
export class SendDialogComponentDialog {

  constructor(
    private calendarService: CalendarService,
    public dialogRef: MatDialogRef<SendDialogComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSend(): void {
    this.calendarService.push(this.data.memo);
  }

}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */