import { Injectable } from '@angular/core';
import { EnvelopeBudget } from '../models/envelope-budget.model';
import { IncomeBalance } from '../models/income-balance.model';


@Injectable({
  providedIn: 'root'
}) 
export class BudgetService {

  constructor() { } 

  tradeAllocation(env1:EnvelopeBudget, env2:EnvelopeBudget, amount:number): EnvelopeBudget[] {
    console.log({arguments});
    const envelope1 = new EnvelopeBudget(env1.id, env1.balance - amount, env1.name);
    const envelope2 = new EnvelopeBudget(env2.id, env2.balance + amount, env2.name);
    return [envelope1, envelope2];
  }

  allocateFunds(income:IncomeBalance, env:EnvelopeBudget, amount:number): [IncomeBalance,EnvelopeBudget] {
    const newAllocated = {
      allocated: income.allocated + amount, 
      unallocated: income.unallocated - amount,
      id:income.id} as IncomeBalance;
    const envelope = {
      balance: env.balance + amount,
      name: env.name,
      id: env.id} as EnvelopeBudget;
    // console.log({envelope});

    return [newAllocated, envelope];
  }

  removeAllAllocation(income:IncomeBalance, env:EnvelopeBudget): [IncomeBalance,EnvelopeBudget] {
    return [
      {
        allocated: income.allocated - env.balance, 
        unallocated: income.unallocated + env.balance,
         id: income.id
      } as IncomeBalance, 
      {...env} as EnvelopeBudget
    ]
  }

  idGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
}
