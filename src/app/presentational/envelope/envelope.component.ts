import { Component, Input, OnInit } from '@angular/core';
import { EnvelopeBudget } from 'src/app/shared/models/envelope-budget.model';


@Component({
  selector: 'app-envelope',
  templateUrl: './envelope.component.html',
  styleUrls: ['./envelope.component.scss']
})
export class EnvelopeComponent implements OnInit {

  @Input() envelope:EnvelopeBudget;

 

  constructor() { }

  ngOnInit(): void {
     console.dir(this.envelope );
  }

}
