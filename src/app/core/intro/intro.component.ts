import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-intro',
  template: `
  <div class="intro-header">
    <h2>QUICK START GUIDE</h2>
    <p>
      Check out these steps to help you fully enjoy this app!
    </p>
    <a (click)="cancel()">No Thanks, I'm Ready!</a>
  </div>
  <mat-vertical-stepper [linear]="true" #stepper>
  <ng-container *ngFor="let screen of screens; index as i">
      <ng-container *ngIf="i === screens.length - 1; else notLastStep">
           <mat-step>
           <ng-template matStepLabel>{{title[i]}}</ng-template>
      
               <mat-card>
                 <p>{{caption[i]}}</p>
                 <img src="{{screen.url}}" >
               </mat-card>
             <button mat-button matStepperPrevious>Back</button>
             <button mat-button (click)="stepper.reset()">Reset</button>
    
         </mat-step>
      </ng-container>
      <ng-template #notLastStep>
      <mat-step>
      <ng-template matStepLabel>{{title[i]}}</ng-template>
 
        <mat-card>
          <p>{{caption[i]}}</p>
          <img src="{{screen.url}}" >  
        </mat-card>
        <button mat-button matStepperNext>Next</button>

     </mat-step>
      </ng-template>
  </ng-container>
</mat-vertical-stepper>
  `,
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {


  imageSources = [
    '../../../assets/set_initial_income.gif',
    '../../../assets/add_envelopes.gif',
    '../../../assets/allocate_funds.gif',
    '../../../assets/add_transaction.gif',
    '../../../assets/setting_defaults.gif',
    '../../../assets/reset_memory.gif',
    '../../../assets/reset_all_envelopes.gif'

  ];

  caption = [
    'Set initial income for allocation',
    'Add envelopes for each budget category',
    'Allocate money to envelopes',
    'Make purchases and reflect them for the envelopes',
    'Set defaults for quick usage each cycle',
    'Reset for each cycle, use defaults you set',
    'Reset all envelopes to start fresh if you want'
  ]

  title = [
    'Set Income',
    'Add Envelopes',
    'Allocate Money',
    'Record Transactions',
    'Set Defaults',
    'Reset to Defaults',
    'Clear Envelopes'
  ]


  screens = [];

 




  constructor(
    public dialogRef: MatDialogRef<IntroComponent>,
  ) { }

  ngOnInit(): void {
      this.imageSources.forEach( (source, i) => {
        this.screens.push({
          url: source,
        })
      })
      console.dir(this.screens);
  }

  cancel() {
    this.dialogRef.close();
  }

}
