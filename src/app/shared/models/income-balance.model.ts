export class IncomeBalance {

    allocated:number;
    unallocated:number;
    id:string;

    constructor(id?:string, amount?:number, allocatedAmount?:number) {
        this.allocated = allocatedAmount || 0;
        this.unallocated = amount;
        this.id = id || this.idGenerator();
    }


    idGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }


}