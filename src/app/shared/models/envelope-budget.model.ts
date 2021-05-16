export class EnvelopeBudget {

    balance:number;
    name:string;
    id:string;

    constructor(id?:string, balance?:number, name?:string) {
        this.balance = balance || 0;
        this.name = name;
        this.id = id || this.idGenerator();
    } 

    idGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

}