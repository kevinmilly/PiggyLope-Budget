

export class Settings {

    private _payCheck:number;
    private _id:string;


    constructor(amount:number, id?) {
        this._payCheck = amount;
        if(id) {
            this._id = id;
        } else {
            this._id = id || this.idGenerator();
        }
        
    }

    public get payCheck() { 
        return this._payCheck;
    }

    public set payCheck(check) {this._payCheck = check;}


    public get id() {
        return this._id;
     }

     idGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
}