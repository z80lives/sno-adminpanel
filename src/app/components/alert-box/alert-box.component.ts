import { Component, OnInit, ContentChild, Input } from '@angular/core';

@Component({
  selector: 'alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent implements OnInit {
    @Input('type') _type : string ="info";
  constructor() { }

  ngOnInit(): void {
  }

}
