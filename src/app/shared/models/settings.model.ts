

export class Settings {

    private _payDay:number[];
    private _payCheck:number;
    private _id:string;
    private _envelopeDefaults: {name:string, amount:number}[];


    constructor(amount:number, id?) {
        this._payCheck = amount;
        this._payDay = [15,30];
        this._id = id;
        this._envelopeDefaults = [{name:'', amount:0}];
    }

    public get payCheck() { 
        return this._payCheck;
    }

    public get payDay() {
        return this._payDay;
    }

    public set payDay(day) {this._payDay = day;}
    public set payCheck(check) {this._payCheck = check;}

    public setDefault(name:string, amount:number) {
        this._envelopeDefaults.find(e => e.name === name)
            .amount = amount;
    }

    public get envelopeDefaults(): {name:string, amount:number}[] {
        return this._envelopeDefaults;
    }

    public get id() {
        return this._id;
     }
}