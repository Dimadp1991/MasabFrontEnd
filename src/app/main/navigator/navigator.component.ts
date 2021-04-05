import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  @Output() link_pressed=new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  press_link(evt){
   // console.log(evt.target.attributes[1].value);
    this.link_pressed.emit(evt);
  }

}
