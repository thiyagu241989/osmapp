import { Component, OnInit,Input,OnDestroy,OnChanges } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit,OnDestroy,OnChanges {

  @Input('titleAliasName') name : string;
  timeoutInstance = null;
  constructor() { }

  ngOnChanges(value){
   console.log('ngOnchange Calling'+JSON.stringify(value));
  }
  
  ngOnInit() {
    console.log("component initilization");
    this.timeoutInstance = setInterval(()=>{
      console.log(new Date());
    },1000);
  }

  ngOnDestroy(){
    console.log("component destroyed");
    clearInterval(this.timeoutInstance);
  }

}
