import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnvelopeBudget } from 'src/app/shared/models/envelope-budget.model';
import { IncomeBalance } from 'src/app/shared/models/income-balance.model';
import { BudgetService } from 'src/app/shared/services/budget.service';

@Component({
  selector: 'app-add-adjustment',
  templateUrl: './add-adjustment.component.html',
  styleUrls: ['./add-adjustment.component.scss']
})
export class AddAdjustmentComponent implements OnInit {

  envsToReturn:EnvelopeBudget[] = [];
  currentEnvelopes:EnvelopeBudget[] =[];
  selectedEnv:EnvelopeBudget;
  incomeToReturn:IncomeBalance;
  originalIncomeBalance:number;
  originalSelectedEnvelopeBalance:number;

  piggyBalanceForm:FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddAdjustmentComponent>,
    private budgetService: BudgetService
  ) { 

  }

  ngOnInit(): void {

    console.dir(this.data);
  
    this.selectedEnv = this.data.selectedEnv;
    this.currentEnvelopes = this.data.envs.filter(e => e.id !== this.selectedEnv.id);
    this.incomeToReturn = this.data.income;
    this.originalIncomeBalance = this.incomeToReturn.unallocated;
    this.originalSelectedEnvelopeBalance = this.selectedEnv.balance;

    this.piggyBalanceForm = new FormGroup({
      pigincome: new FormControl(
        this.originalIncomeBalance, 
        [Validators.min(0),
        Validators.max(this.originalIncomeBalance)]
      )
    })

  }

  addFromAllocation() {
    const [i, e] = this.budgetService.allocateFunds(
      this.incomeToReturn,
      this.selectedEnv,
      this.piggyBalanceForm.get('pigincome').value);
    
      this.incomeToReturn = new IncomeBalance(i.id, i.unallocated, i.allocated);
      this.selectedEnv = new EnvelopeBudget(e.id, e.balance, e.name);
      this.checkUpdates(this.selectedEnv);

  }
  
  subtractFromAllocation() {
    const [i, e] = this.budgetService.allocateFunds(
      this.incomeToReturn,
      this.selectedEnv,
      -this.piggyBalanceForm.get('pigincome').value);
      this.incomeToReturn = i;
      this.selectedEnv = e;
      this.checkUpdates(this.selectedEnv);
  }

  addFromOtherEnvelope(other) {
    const [from, to] = this.budgetService.tradeAllocation(other,this.selectedEnv,1);

    this.selectedEnv = new EnvelopeBudget(to.id, to.balance, to.name);
    this.currentEnvelopes.find(currenv => currenv.id === from.id).balance = from.balance;

    this.checkUpdates(from);
    this.checkUpdates(to);



  }

  addToOtherEnvelope(other) {
    const [from, to] = this.budgetService.tradeAllocation(this.selectedEnv, other, 1);

   

    this.selectedEnv = new EnvelopeBudget(from.id, from.balance, from.name);
    this.currentEnvelopes.find(currenv => currenv.id === to.id).balance = to.balance;

    this.checkUpdates(from);
    this.checkUpdates(to);
  }

  submit() {
    //decide which envelopes to update and then send thoses
    //send income balance if changed
    console.dir([this.envsToReturn,this.incomeToReturn]);
    this.dialogRef.close([this.envsToReturn,this.incomeToReturn]);
  }

  cancel() {
    this.dialogRef.close(null);
    this.selectedEnv.balance = this.originalSelectedEnvelopeBalance;
    this.incomeToReturn.unallocated = this.originalIncomeBalance;
  }

  checkUpdates(env:EnvelopeBudget) {
    const arrayIndex = this.checkIfAdded(env);
    console.log(arrayIndex);
    if(!!arrayIndex) {
      this.envsToReturn.push(env);
      console.log("not in the index");
  
    } else {
        this.envsToReturn[arrayIndex].balance = env.balance;
    }
    console.dir(this.envsToReturn);
  }

  checkIfAdded(env:EnvelopeBudget) {
    return this.envsToReturn.findIndex(e => e.id === env.id);
  }

}
