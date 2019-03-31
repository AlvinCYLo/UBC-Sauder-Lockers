"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Client {
    constructor(fn, ln, phone, email, stuNum, pref) {
        this.firstName = fn;
        this.lastName = ln;
        this.phoneNumber = phone;
        this.emailAddress = email;
        this.studentNumber = stuNum;
        this.locker = null;
        this.floorPreference = pref;
    }
    setLocker(l) {
        this.locker = l;
        l.setClientToLocker(this);
    }
    isAssignedLocker() {
        if (this.locker) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map