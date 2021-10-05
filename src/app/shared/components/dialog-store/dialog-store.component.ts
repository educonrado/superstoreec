import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '@data/model/product';

@Component({
  selector: 'app-dialog-store',
  templateUrl: './dialog-store.component.html',
  styleUrls: ['./dialog-store.component.scss']
})
export class DialogStoreComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogStoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) { 
  }
  
  ngOnInit(): void {
  }

}
