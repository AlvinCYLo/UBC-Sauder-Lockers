import {Locker} from "./Locker";

export class Client {

    private firstName: string;
    private lastName: string;
    private phoneNumber: number;
    private emailAddress: string;
    private studentNumber: number;
    private locker: Locker;
    private floorPreference: string;
    private dateOfPurchase: Date;
    private lockerPlacement: string;

    constructor(fn: string, ln: string, phone: number, email: string, stuNum: number, pref: string, purchaseDate: Date, topOrBot: string) {
        this.firstName = fn;
        this.lastName = ln;
        this.phoneNumber = phone;
        this.emailAddress = email;
        this.studentNumber = stuNum;
        this.locker = null;
        this.floorPreference = pref;
        this.dateOfPurchase = purchaseDate;
        this.lockerPlacement = topOrBot;
    }

    public setLocker(l: Locker): void {
        this.locker = l;
        l.setClientOfLocker(this);
    }

    public isAssignedLocker(): boolean {
        if (this.locker) {
            return true;
        } else {
            return false;
        }
    }

    public getFloorPreference(): string {
        return this.floorPreference;
    }

    public getDateOfPurchase(): Date {
        return this.dateOfPurchase;
    }

}
