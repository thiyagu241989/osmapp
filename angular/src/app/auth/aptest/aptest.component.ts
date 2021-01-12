import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aptest',
  templateUrl: './aptest.component.html',
  styleUrls: ['./aptest.component.css']
})
export class AptestComponent implements OnInit {
 show:boolean =false;
 title ="hi hello comp buddy"
  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.show = !this.show;

  }
}
