import {Locker} from "./Locker";

export class Client {

    private firstName: string;
    private lastName: string;
    private phoneNumber: number;
    private emailAddress: string;
    private studentNumber: number;
    private lockers: Locker[];
    private floorPreference: string;
    private dateOfPurchase: Date;
    private lockerPlacement: string;

    constructor(fn: string, ln: string, phone: number, email: string, stuNum: number, pref: string, purchaseDate: Date, topOrBot: string) {
        this.firstName = fn;
        this.lastName = ln;
        this.phoneNumber = phone;
        this.emailAddress = email;
        this.studentNumber = stuNum;
        this.lockers = null;
        this.floorPreference = pref;
        this.dateOfPurchase = purchaseDate;
        this.lockerPlacement = topOrBot;
    }

    public setLocker(l: Locker): void {
        if (!this.lockers) {
            this.lockers = [];
            this.lockers.push(l);
            l.setClientOfLocker(this);
        } else {
            this.lockers.push(l);
            l.setClientOfLocker(this);
        }
    }

    public getFloorPreference(): string {
        return this.floorPreference;
    }

    public getDateOfPurchase(): Date {
        return this.dateOfPurchase;
    }

    public getLockerPlacement(): string {
        return this.lockerPlacement;
    }

    public getLockers(): Locker[] {
        return this.lockers;
    }

    public getFirstName(): String {
        return this.firstName;
    }

    public getLastName(): String {
        return this.lastName;
    }

    public getStudentNumber(): number {
        return this.studentNumber;
    }

    public getPhoneNumber(): number {
        return this.phoneNumber;
    }

    public getEmailAddress(): String {
        return this.emailAddress;
    }

    public setLockerPreference(pref: string) {
        this.lockerPlacement = pref;
    }

}
