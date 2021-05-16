

export class Settings {

    private _payDay:number[];
    private _payCheck:number;
    private _id:string;


    constructor(id?) {
        this._payCheck = 1700;
        this._payDay = [15,30];
        this._id = id;
    }

    public get payCheck() {
        return this._payCheck;
    }

    public get payDay() {
        return this._payDay;
    }

    public set payDay(day) {this._payDay = day;}
    public set payCheck(check) {this._payCheck = check;}

    public get id() {
        return this._id;
     }
}