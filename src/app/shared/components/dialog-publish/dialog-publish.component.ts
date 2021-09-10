import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BodyDialog } from '@data/model/body-dialog';
import { BodyDialogStore } from '@data/model/body-dialog-store';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-publish',
  templateUrl: './dialog-publish.component.html',
  styleUrls: ['./dialog-publish.component.scss'],
})
export class DialogPublishComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BodyDialogStore
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
