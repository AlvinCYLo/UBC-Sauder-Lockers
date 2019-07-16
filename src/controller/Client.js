"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Client {
    constructor(fn, ln, phone, email, stuNum, pref, purchaseDate, topOrBot) {
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
    setLocker(l) {
        if (!this.lockers) {
            this.lockers = [];
            this.lockers.push(l);
            l.setClientOfLocker(this);
        }
        else {
            this.lockers.push(l);
            l.setClientOfLocker(this);
        }
    }
    getFloorPreference() {
        return this.floorPreference;
    }
    getDateOfPurchase() {
        return this.dateOfPurchase;
    }
    getLockerPlacement() {
        return this.lockerPlacement;
    }
    getLockers() {
        return this.lockers;
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getStudentNumber() {
        return this.studentNumber;
    }
    getPhoneNumber() {
        return this.phoneNumber;
    }
    getEmailAddress() {
        return this.emailAddress;
    }
    setLockerPreference(pref) {
        this.lockerPlacement = pref;
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map