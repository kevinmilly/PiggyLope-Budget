import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IncomeBalance } from 'src/app/shared/models/income-balance.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  income:IncomeBalance;
  settingsForm:FormGroup;
 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<SettingsComponent>,
  ) { }

  ngOnInit(): void {
    this.income = this.data;
    this.settingsForm = new FormGroup({
      income: new FormControl(this.income.unallocated, Validators.min(10))
    })
  }

  submit() {
    this.dialogRef.close(
        [new IncomeBalance(this.income.id, this.settingsForm.get("income").value)]
    );
  }

  cancel() {
    this.dialogRef.close();
  }

}
