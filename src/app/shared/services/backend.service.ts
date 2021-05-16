import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
// import { of } from 'rxjs';
import { EnvelopeBudget } from '../models/envelope-budget.model';
import { IncomeBalance } from '../models/income-balance.model';
import { ReportTransaction } from '../models/report-transaction.model';
import { Settings } from '../models/settings.model';
// import { testData, income } from '../services/test-data';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private firestore:AngularFirestore) { }


  getEnvelopes() {
     return this.firestore.collection<EnvelopeBudget>(`/envelopes`).valueChanges();
    // return of(testData);
  }
 
  getSettings() {
    return this.firestore.collection<Settings>(`/settings`).valueChanges();
  }

  getTransactions() {
    return this.firestore.collection<ReportTransaction>(`/transactions`).valueChanges();
  }

  getIncomeBalance() {
     return this.firestore.collection<IncomeBalance>(`/incomeBalance`).valueChanges();
    // return of(income);
  }

  addEnvelope(envelope:EnvelopeBudget) {
    this.firestore
      .collection<EnvelopeBudget>(`/envelopes`)
      .doc(envelope.id)
      .set(Object.assign({}, envelope), {merge: true});
  }

  addTransaction(transaction) {
    this.firestore
    .collection<ReportTransaction>(`/transactions`)
    .doc(transaction.id)
    .set(Object.assign({}, transaction), {merge: true});
  }

  updateEnvelope(envelopes) {
    let envelopeToUpdate;
    envelopeToUpdate = this.firestore.collection<EnvelopeBudget>(`/envelopes`);
    envelopes.forEach(envelope => {
      envelopeToUpdate.doc(envelope.id).update(Object.assign({}, envelope)); 
    });   
  }s

  updateIncomeBalance(incomeBalance) {
    this.firestore.collection<IncomeBalance>(`incomeBalance/`)
        .doc(incomeBalance.id).update(Object.assign({}, incomeBalance));

  }

  deleteTransaction(transaction) {
    const collection = this.firestore.collection<ReportTransaction>(`/transactions`);
      collection.doc(transaction.id).delete();
  }

  deleteEnvelope(envelope) {
    console.log(envelope);
    const collection = this.firestore.collection<EnvelopeBudget>(`/envelopes`);
      collection.doc(envelope.id).delete();
  }

  
  resetEnvelopeandAllocation(envelopes:EnvelopeBudget[], incomeBalance:IncomeBalance) {
      let envelopeToUpdate;
      envelopeToUpdate = this.firestore.collection<EnvelopeBudget>(`/envelopes`);
      envelopes.forEach(envelope => {
        envelope.balance = 0;
        envelopeToUpdate.doc(envelope.id).update(Object.assign({}, envelope)); 
      });  
      incomeBalance.unallocated += incomeBalance.allocated;
      incomeBalance.allocated = 0;
  
      this.firestore.collection<IncomeBalance>(`/incomeBalance`)
        .doc(incomeBalance.id).update(Object.assign({}, incomeBalance));
  
  }












}