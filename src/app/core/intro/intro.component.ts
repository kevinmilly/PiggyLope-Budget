import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  template: `
  <slideshow 
    [height]="height"
    [minHeight]="'40rem'"
    [autoPlay]="false"
    [showArrows]="true"
    [imageUrls]="imageSources"
    > 
  </slideshow>
  `,
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  height = '40rem';
  imageSources = [];


  constructor() { }

  ngOnInit(): void {
  }

}
