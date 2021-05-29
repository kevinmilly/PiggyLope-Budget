import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnvelopeBudget } from 'src/app/shared/models/envelope-budget.model';

@Component({
  selector: 'app-add-envelope',
  templateUrl: './add-envelope.component.html',
  styleUrls: ['./add-envelope.component.scss']
})
export class AddEnvelopeComponent implements OnInit {

  addEnvelopeForm = new FormGroup({
    envelopeName: new FormControl('', [Validators.required, Validators.maxLength(12)]),
  })


  constructor(
    public dialogRef: MatDialogRef<AddEnvelopeComponent>,
  ) { 
       
  }

  ngOnInit(): void {

  }

  submit() {
    this.dialogRef.close(new EnvelopeBudget(null,0,this.addEnvelopeForm.get('envelopeName').value));
  }

  cancel() {
    this.dialogRef.close();
  }

}
 