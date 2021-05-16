import { TestBed } from '@angular/core/testing';

import { BudgetService } from './budget.service';
import { testData, income } from './test-data';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should trade allocation from one envelope to another', () => {
    const [envelope1, envelope2] = service.tradeAllocation(testData[0], testData[1], 4);
    expect(testData[0].balance - envelope1.balance).toBe(4);
    expect(testData[1].balance - envelope2.balance).toBe(-4);
  })

  it('it should remove some allocation from the income and add to envelope', () => {
    const [allocated, envelope] = service.allocateFunds(income, testData[0], 4);
    expect(envelope.balance - testData[0].balance).toBe(4);
    expect(allocated.allocated - income.allocated).toBe(-4);

  })

  it('it should add all allocation back to the income unallocated', () => {
    const allocated = service.removeAllAllocation(income,testData[1]);
    expect(income.allocated + testData[1].balance).toBe(allocated.allocated);
  })




});
