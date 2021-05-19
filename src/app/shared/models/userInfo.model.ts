export class UserInfo {

    private _name;
    private _email;

    constructor(name,email) {
        this._email = email;
        this._name = name;
    }

    
    public get email() : string {
        return this._email
    }

    
    public get name() : string {
        return this._name;
    }
    
    
}