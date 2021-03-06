import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { AddAdjustmentComponent } from 'src/app/presentational/ui/add-adjustment/add-adjustment.component';
import { AddEnvelopeComponent } from 'src/app/presentational/ui/add-envelope/add-envelope.component';
import { AddTransactionComponent } from 'src/app/presentational/ui/add-transaction/add-transaction.component';
import { ReportTransaction } from 'src/app/shared/models/report-transaction.model';
import { BackendService } from 'src/app/shared/services/backend.service';
import { IncomeBalance } from '../../../shared/models/income-balance.model';
import { BudgetService } from '../../../shared/services/budget.service';
import { AuthService } from '../../services/auth.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout'
import { Subscription } from 'rxjs';
import { BdcWalkService } from 'bdc-walkthrough';


@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  media$: Observable<MediaChange[]>;

  income$: Observable<IncomeBalance[]>;
  transactions$: Observable<ReportTransaction[]>;

  @Input() user;
  mediaSub:Subscription;

  hide:boolean;
  sizes = ['md','lg','xl'];


  constructor(
    private budgetService: BudgetService,
    public backendService: BackendService,
    public dialog: MatDialog,
    private authService: AuthService,
    private route: ActivatedRoute,
    media:MediaObserver,
    private bdcWalkService: BdcWalkService
  ) {
      this.media$ = media.asObservable();

  }


  ngOnInit() {

    this.mediaSub = this.media$.subscribe(media => {
      console.log(media[0].mqAlias);
      if(this.sizes.includes(media[0].mqAlias)) {
        this.bdcWalkService.setTaskCompleted("dialogWelcome", true);
        this.bdcWalkService.setTaskCompleted("add_initial_income", true);
        this.bdcWalkService.setTaskCompleted("add_envelopes", true);
        this.bdcWalkService.setTaskCompleted("allocateMoney", true);
        this.bdcWalkService.setTaskCompleted("makePurchase", true);
        this.bdcWalkService.setTaskCompleted("resetDefaults", true);
      }
    });
  }

  deleteEnvelope(income, env) {
    if (confirm("Are you sure you want to delete this envelope?  All of the money allocated to it will go back into the piggy bank")) {
      if(income) {
        const [i, e] = this.budgetService.removeAllAllocation(income, env); 
        this.backendService.updateIncomeBalance(i);
        this.backendService.deleteEnvelope(e);
      } else {
          this.backendService.deleteEnvelope(env);
      }
    }
  }

  addTransactionRemoveAllocation(env) {
    let dialogRef = this.dialog.open(AddTransactionComponent, {
    
      width: '25rem',
      panelClass: 'dialog-box',
      data: {
        envelope: env,
        transactions: this.backendService.getTransactions()
      }
    });

    dialogRef.afterClosed().subscribe(adjustment => {
      if (adjustment) {
        const [env, transaction] = adjustment;
        this.backendService.addTransaction(transaction);
        this.backendService.updateEnvelopes([env]);
      }
    });
  }

  addEnvelope() {
    let dialogRef = this.dialog.open(AddEnvelopeComponent, {
      width: '20rem',
      panelClass: 'dialog-box'
    });
    dialogRef.afterClosed().subscribe(envelope => {
      if (envelope) {
        this.backendService.addEnvelope(envelope);
      }
    });
  }

  adjustAllocation(selectedEnv, envs, income) {
    let dialogRef = this.dialog.open(AddAdjustmentComponent, {

      width: '30rem',
      data: {
        selectedEnv,
        envs,
        income
      },
      panelClass: 'dialog-box'
    });

    dialogRef.afterClosed().subscribe(transaction => {
      if (transaction) {
        const [envsReturned, incBalance] = transaction;
        this.backendService.updateEnvelopes(envsReturned);
        this.backendService.updateIncomeBalance(incBalance);
      }
    });
  }

  ngOnDestroy() {
    if(this.mediaSub) this.mediaSub.unsubscribe();
  }
}
