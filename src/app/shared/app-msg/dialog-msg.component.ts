import { Component, NgZone, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'dialog-msg',
    templateUrl: 'dialog-msg.html',
  })
  export class DialogMsg {
    constructor(
      public dialogRef: MatDialogRef<DialogMsg>,
      private ngZone: NgZone,
      @Inject(MAT_DIALOG_DATA) public data: any) {}
  
      onNoClick(): void {
      this.ngZone.run(() => {
        this.dialogRef.close();
      });
    }
  
  }