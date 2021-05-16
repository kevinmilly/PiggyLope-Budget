import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { EnvelopeBudget } from 'src/app/shared/models/envelope-budget.model';


@Component({
  selector: 'app-envelope',
  templateUrl: './envelope.component.html',
  styleUrls: ['./envelope.component.scss']
})
export class EnvelopeComponent implements OnInit {

  @Input() envelope:EnvelopeBudget;
  
  @Output() allocationAdjusted = new EventEmitter<EnvelopeBudget>();
  @Output() expenseAdded = new EventEmitter<EnvelopeBudget>();
  @Output() envelopeDeleted = new EventEmitter<EnvelopeBudget>();

 

  constructor() { }

  ngOnInit(): void {
    //  console.dir(this.envelope);
  }

  adjustAllocation(env:EnvelopeBudget) {
    this.allocationAdjusted.emit(env);
  }

  addExpense(env:EnvelopeBudget) {
    this.expenseAdded.emit(env);
  }

  deleteEnvelope(env:EnvelopeBudget) {
    this.envelopeDeleted.emit(env);
  }

  

}
