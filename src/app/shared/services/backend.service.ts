import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
// import { of } from 'rxjs';
import { EnvelopeBudget } from '../models/envelope-budget.model';
import { IncomeBalance } from '../models/income-balance.model';
import { ReportTransaction } from '../models/report-transaction.model';
import { Settings } from '../models/settings.model';
// import { testData, income } from '../services/test-data';
import { UserInfo } from '../../shared/models/userInfo.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService implements OnInit {

  user:UserInfo;

  envelopes$;
  income$;
  transactions$;

  constructor(private firestore:AngularFirestore, private auth:AuthService) {
    this.auth.user$
    .subscribe( user => {
      this.user = user;

      this.envelopes$ = this.getEnvelopes();
      this.income$ = this.getIncomeBalance();
      this.transactions$ = this.getTransactions();
      
    })
   }

   ngOnInit() {
   }



  getEnvelopes() {
     return this.firestore.collection<EnvelopeBudget>(`user/${this.user.uid}/envelopes`).valueChanges();
    // return of(testData);
  }
 
  getSettings() {
    return this.firestore.collection<Settings>(`user/${this.user.uid}/settings`).valueChanges();
  }

  getTransactions() {
    return this.firestore.collection<ReportTransaction>(`user/${this.user.uid}/transactions`).valueChanges();
  }

  getIncomeBalance() {
     return this.firestore.collection<IncomeBalance>(`user/${this.user.uid}/incomeBalance`).valueChanges();
    // return of(income);
  }

  addEnvelope(envelope:EnvelopeBudget) {
    this.firestore
      .collection<EnvelopeBudget>(`user/${this.user.uid}/envelopes`)
      .doc(envelope.id)
      .set(Object.assign({}, envelope), {merge: true});
  }

  addTransaction(transaction) {
    this.firestore
    .collection<ReportTransaction>(`user/${this.user.uid}/transactions`)
    .doc(transaction.id)
    .set(Object.assign({}, transaction), {merge: true});
  }

  updateEnvelope(envelopes) {
    let envelopeToUpdate;
    envelopeToUpdate = this.firestore.collection<EnvelopeBudget>(`user/${this.user.uid}/envelopes`);
    envelopes.forEach(envelope => {
      envelopeToUpdate.doc(envelope.id).update(Object.assign({}, envelope)); 
    });   
  }s

  updateIncomeBalance(incomeBalance) {
    this.firestore.collection<IncomeBalance>(`user/${this.user.uid}/incomeBalance/`)
        .doc(incomeBalance.id).update(Object.assign({}, incomeBalance));

  }

  deleteTransaction(transaction) {
    const collection = this.firestore.collection<ReportTransaction>(`user/${this.user.uid}/transactions`);
      collection.doc(transaction.id).delete();
  }

  deleteEnvelope(envelope) {
    console.log(envelope);
    const collection = this.firestore.collection<EnvelopeBudget>(`user/${this.user.uid}/envelopes`);
      collection.doc(envelope.id).delete();
  }

  
  resetEnvelopeandAllocation(envelopes:EnvelopeBudget[], incomeBalance:IncomeBalance) {
      let envelopeToUpdate;
      envelopeToUpdate = this.firestore.collection<EnvelopeBudget>(`user/${this.user.uid}/envelopes`);
      envelopes.forEach(envelope => {
        envelope.balance = 0;
        envelopeToUpdate.doc(envelope.id).update(Object.assign({}, envelope)); 
      });  
      incomeBalance.unallocated += incomeBalance.allocated;
      incomeBalance.allocated = 0;
  
      this.firestore.collection<IncomeBalance>(`user/${this.user.uid}/incomeBalance`)
        .doc(incomeBalance.id).update(Object.assign({}, incomeBalance));
  
  }












}