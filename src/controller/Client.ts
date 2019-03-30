import {Locker} from "./Locker";

export class Client {

    private firstName: string;
    private lastName: string;
    private phoneNumber: number;
    private emailAddress: string;
    private studentNumber: number;
    private locker: Locker;
    private floorPreference: string;

    constructor(fn: string, ln: string, phone: number, email: string, stuNum: number, pref: string) {
        this.firstName = fn;
        this.lastName = ln;
        this.phoneNumber = phone;
        this.emailAddress = email;
        this.studentNumber = stuNum;
        this.locker = null;
        this.floorPreference = pref;
    }

    public setLocker(l: Locker): void {
        this.locker = l;
        l.setClientToLocker(this);
    }

    public isAssignedLocker(): boolean {
        if (this.locker) {
            return true;
        } else {
            return false;
        }
    }


}
