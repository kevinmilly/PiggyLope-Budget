import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Settings } from 'src/app/shared/models/settings.model';
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
  settings:Settings;
  envelopeSub:Subscription;

  totalDefaults:number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<SettingsComponent>,
    private backendService:BackendService
  ) { }

  ngOnInit(): void {
    this.envelopes = this.data.envelopes;
    this.totalDefaults = this.envelopes.reduce((acc, curr) => acc + curr.default,0)
    this.income = this.data.income ? this.data.income : new IncomeBalance(null, 0,0);
    this.settings = this.data.settings;
    this.settingsForm = new FormGroup({
      income: new FormControl(this.income.unallocated, Validators.min(10)),
      payCheck: new FormControl(this.settings.payCheck, Validators.min(this.totalDefaults)),
  
    })
  }

  changeEnvelopeValue(env:EnvelopeBudget, value:any) { 
    env.default = value;
    this.settingsForm.controls.payCheck.setValue(
      this.settingsForm.controls.payCheck.value - value
    );

  }

  submit() {
    this.income.unallocated = this.settingsForm.get("income").value;
    this.settings.payCheck =  this.settingsForm.get("payCheck").value;
    this.dialogRef.close(
        [
          this.income,
          this.settings,
          this.envelopes
        ]
    );
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if(this.envelopeSub) this.envelopeSub.unsubscribe();

  }

}
