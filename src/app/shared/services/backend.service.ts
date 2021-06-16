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
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  user:UserInfo;

  envelopes$;
  income$;
  transactions$;
  _settings = new Settings(0);

  constructor(private firestore:AngularFirestore, private auth:AuthService) {
    this.auth.user$
    .subscribe( user => {
      this.user = user;
      this.envelopes$ = this.getEnvelopes();
      this.income$ = this.getIncomeBalance();
      this.transactions$ = this.getTransactions();

    })
   }




  getEnvelopes() {
     return this.firestore.collection<EnvelopeBudget>(`user/${this.user.uid}/envelopes`).valueChanges();
    // return of(testData);
  }
 
  getSettings(): Observable<Settings[]> {
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

  updateEnvelopes(envelopes) {
    let envelopeToUpdate;
    envelopeToUpdate = this.firestore.collection<EnvelopeBudget>(`user/${this.user.uid}/envelopes`);
    envelopes.forEach(envelope => {
      envelopeToUpdate.doc(envelope.id).update(Object.assign({}, envelope)); 
    });   
    
  }
  

  updateIncomeBalance(incomeBalance) {
    this.firestore.collection<IncomeBalance>(`user/${this.user.uid}/incomeBalance/`)
        .doc(incomeBalance.id)
        .get()
        .pipe(take(1))
        .subscribe( incomeRecord => {
          if(incomeRecord.exists) {
            this.firestore.collection<IncomeBalance>(`user/${this.user.uid}/incomeBalance/`)
            .doc(incomeBalance.id)
              .update(Object.assign({}, incomeBalance));
           
          } else { //initialsetup
             //create income
             console.log("adding");
              this.firestore.collection<IncomeBalance>(`user/${this.user.uid}/incomeBalance/`)
              .doc(incomeBalance.id)
              .set(Object.assign({}, incomeBalance), {merge: true});
              //create settings
              this.updateSettings(this._settings);


          }
        })
    


  }

  updateSettings(settings: Settings) { 
    console.dir(settings);
    console.log(`id is ${settings.id}`);
    this.firestore.collection<Settings>(`user/${this.user.uid}/settings/`)
    .doc(settings.id)
      .update(Object.assign({}, settings));
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


  get settings() { return this._settings}









}