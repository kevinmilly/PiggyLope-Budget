import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { EnvelopeBudget } from 'src/app/shared/models/envelope-budget.model';
import { IncomeBalance } from 'src/app/shared/models/income-balance.model';
import { BackendService } from 'src/app/shared/services/backend.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  income:IncomeBalance;
  settingsForm:FormGroup;
  settingsSub:Subscription;

  envelopes:EnvelopeBudget[] = [];
  envelopeSub:Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<SettingsComponent>,
    private backendService:BackendService
  ) { }

  ngOnInit(): void {
    this.envelopes = this.data.envelopes;
    this.income = this.data.income ? this.data.income : new IncomeBalance(null, 0,0);
    this.settingsForm = new FormGroup({
      income: new FormControl(this.income.unallocated, Validators.min(10)),
      payCheck: new FormControl(this.data.settings.payCheck, Validators.min(10)),
  
    })
  }

  changeEnvelopeValue(event, env:EnvelopeBudget) { 
    console.log({env});
    env.default = event.value;
  }

  submit() {
    this.dialogRef.close(
        [new IncomeBalance(this.income.id, this.settingsForm.get("income").value)]
    );
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if(this.envelopeSub) this.envelopeSub.unsubscribe();

  }

}
