"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../Util");
const ExcelUtils_1 = require("./ExcelUtils");
const fs = require("fs");
const http = require("http");
const excel = ExcelUtils_1.default;
class LockerSystem {
    constructor() {
        this.availableLockers = new Map();
        this.clients = new Map();
        this.lockerAssignments = new Map();
        Util_1.default.trace("Locker System Init");
    }
    getAvailableLockers(filepath) {
        return new Promise(function (resolve, reject) {
            if (filepath && fs.existSync(filepath)) {
                this.availableLockers = excel.extractLockerInfo(filepath);
                resolve(excel.extractLockerInfo(filepath));
            }
            else {
                Util_1.default.trace("File or Path does not exist");
                reject(new Error("Get Available Lockers Failed: File or Path does not exist"));
            }
        });
    }
    getAllClients(filepath) {
        return new Promise(function (resolve, reject) {
            if (filepath && fs.existSync(filepath)) {
                this.clients = excel.extractClientInfo(filepath);
                resolve(excel.extractClientInfo(filepath));
            }
            else {
                Util_1.default.trace("File or Path does not exist");
                reject(new Error("Get All Clients Failed: File or Path does not exist"));
            }
        });
    }
    makeAssignments() {
    }
    publishAssignment() {
    }
}
exports.default = LockerSystem;
//# sourceMappingURL=LockerSystem.js.map