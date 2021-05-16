import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shared-button',
  templateUrl: './shared-button.component.html',
  styleUrls: ['./shared-button.component.scss']
})
export class SharedButtonComponent implements OnInit {

  @Input() type: string = 'regular';
  @Input() size: string = 'reg';
  @Input() content: string;

  @Output() clicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}