"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("./Client");
class Locker {
    constructor(num) {
        this.id = num;
        this.student = new Client_1.Client("CUS", "IT", 6048273772, "cus.ca", 0, "Fourth", new Date("January 1, 2019 00:00:00"), "Top");
        this.topLocker = num % 2 !== 0;
        let f = num.toString();
        if (f.length === 4) {
            if (f.startsWith("2")) {
                this.floor = "Second Floor";
            }
            else if (f.startsWith("3")) {
                this.floor = "Third Floor";
            }
            else {
                this.floor = "Fourth Floor";
            }
        }
        else {
            this.floor = "Basement";
        }
    }
    getLockerNumber() {
        return this.id;
    }
    setClientOfLocker(student) {
        this.student = student;
    }
    getLockerFloor() {
        return this.floor;
    }
    top() {
        return this.topLocker;
    }
}
exports.Locker = Locker;
//# sourceMappingURL=Locker.js.map