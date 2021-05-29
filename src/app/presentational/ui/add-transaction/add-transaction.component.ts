import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EnvelopeBudget } from 'src/app/shared/models/envelope-budget.model';
import { ReportTransaction } from 'src/app/shared/models/report-transaction.model';
import { BudgetService } from 'src/app/shared/services/budget.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {

  chosenEnvelope:EnvelopeBudget;
  trans$:Observable<ReportTransaction[]>;

  addTransactionForm:FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddTransactionComponent>,
    private budgetService: BudgetService
  ) {
   } 

  ngOnInit(): void {
    this.chosenEnvelope = this.data.envelope;
    this.trans$ = this.data.transactions;

    this.addTransactionForm = new FormGroup({
      transactionName: new FormControl('', [Validators.required]),
      category: new FormControl(''),
      amount: new FormControl('',[Validators.required,Validators.min(1),Validators.max(this.chosenEnvelope.balance)])
    })
  }

  submit() {
    this.dialogRef.close([
      new EnvelopeBudget(
        this.chosenEnvelope.id,
        this.chosenEnvelope.balance - this.addTransactionForm.get('amount').value,
        this.chosenEnvelope.name
     ),
     new ReportTransaction(
      this.addTransactionForm.get('amount').value,
      this.addTransactionForm.get('transactionName').value,
      this.addTransactionForm.get('category').value,
      new Date().toDateString(),
      this.budgetService.idGenerator()
     )
    ]);
  }

  cancel() {
    this.dialogRef.close();
  }




}
