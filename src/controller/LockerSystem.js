"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../Util");
const ExcelUtils_1 = require("./ExcelUtils");
const fs = require("fs");
const excel = ExcelUtils_1.default;
class LockerSystem {
    constructor() {
        this.availableLockers = new Map();
        this.clients = new Map();
        this.lockerAssignments = new Map();
        Util_1.default.trace("Locker System Init");
    }
    getAvailableLockers(filepath) {
        let that = this;
        return new Promise(function (resolve, reject) {
            if (filepath && fs.existsSync(filepath)) {
                let lockersByFloor = excel.extractLockerInfo(filepath);
                lockersByFloor.then(function (allLockers) {
                    that.availableLockers = allLockers;
                });
                resolve(lockersByFloor);
            }
            else {
                Util_1.default.trace("File or Path does not exist");
                reject(new Error("Get Available Lockers Failed: File or Path does not exist"));
            }
        });
    }
    getAllClients(filepath) {
        let that = this;
        return new Promise(function (resolve, reject) {
            if (filepath && fs.existsSync(filepath)) {
                let allClients = excel.extractClientInfo(filepath);
                allClients.then(function (clients) {
                    that.clients = clients;
                });
                resolve(allClients);
            }
            else {
                Util_1.default.trace("File or Path does not exist");
                reject(new Error("Get All Clients Failed: File or Path does not exist"));
            }
        });
    }
    makeAssignments() {
        let that = this;
        Object.keys(that.clients).forEach(function (floor) {
            let clientsByFloor = that.clients.get(floor);
            let lockersByFloor = that.availableLockers.get(floor);
            clientsByFloor.sort(function (client1, client2) {
                if (client1.getDateOfPurchase() < client2.getDateOfPurchase()) {
                    return -1;
                }
                else if (client1.getDateOfPurchase() > client2.getDateOfPurchase()) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            clientsByFloor.forEach(function (client) {
            });
        });
    }
    publishAssignment() {
    }
}
exports.default = LockerSystem;
//# sourceMappingURL=LockerSystem.js.map