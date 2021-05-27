

export class Settings {

    payCheck:number;
    id:string;


    constructor(amount:number, id?) {
        this.payCheck = amount;
        if(id) {
            this.id = id;
        } else {
            this.id = id || this.idGenerator();
        }
        
    }


     idGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
}