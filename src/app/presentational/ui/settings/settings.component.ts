import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
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
  envelopeDefaults:{name:string,amount:number}[];
  settingsSub:Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<SettingsComponent>,
    private backendService:BackendService
  ) { }

  ngOnInit(): void {
    this.settingsSub = this.backendService.getSettings()
      .subscribe(settings => {
        this.income = this.data ? this.data : new IncomeBalance(null, 0,0);
        this.settingsForm = new FormGroup({
          income: new FormControl(this.income.unallocated, Validators.min(10)),
          payCheck: new FormControl(settings[0].payCheck, Validators.min(10)),
          payDay: new FormControl(settings[0].payDay, Validators.min(10)),
          envelopeDefaults: this.loadEnvDefaults(settings[0].getDefaults)
        })
      })

  }

  loadEnvDefaults(envelopeDefaults):FormArray {
    return;
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

  }

}
