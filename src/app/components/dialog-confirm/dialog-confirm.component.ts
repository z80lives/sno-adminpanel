import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData{
    title: string;
    msg: string;    
};

@Component({
  selector: 'dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent implements OnInit {
    
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  ngOnInit(): void {
  }

}
