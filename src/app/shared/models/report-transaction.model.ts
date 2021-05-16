export class ReportTransaction {

    private _balance:number;
    private _name:string;
    private _type:string;
    private _date:string;
    private _id:string;

    constructor(balance:number, name:string, type:string, date:string, id:string) {
        this._balance = balance;
        this._name = name;
        this._type = type;
        this._date = date;
        this._id = id;
    }

    public get balance() {
       return this._balance;
    }

    public set balance(value:number) {
        this._balance = value;
    }

    public get name() {
        return this._name;
     }
 
     public set name(value:string) {
         this._name = value;
     }
     
    public get type() {
        return this._type;
     }
 
     public set type(value:string) {
         this._type = value;
     }

     public get date() {
        return this._date;
     }
 
     public set date(value:string) {
         this._date = value;
     }

     public get id() {
        return this._id;
     }
}