"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Client {
    constructor(fn, ln, phone, email, stuNum, pref, purchaseDate, topOrBot) {
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
    setLocker(l) {
        this.locker = l;
        l.setClientOfLocker(this);
    }
    isAssignedLocker() {
        if (this.locker) {
            return true;
        }
        else {
            return false;
        }
    }
    getFloorPreference() {
        return this.floorPreference;
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map