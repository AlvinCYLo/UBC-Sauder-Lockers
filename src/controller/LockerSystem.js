"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../Util");
const ExcelUtils_1 = require("./ExcelUtils");
const fs = require("fs");
const http = require("http");
const excel = ExcelUtils_1.default;
class LockerSystem {
    constructor() {
        this.availableLockers = [];
        this.clients = [];
        this.lockerAssignments = new Map();
        Util_1.default.trace("Locker System Init");
    }
    getAvailableLockers() {
    }
    getAllClients() {
    }
    publishAssignment() {
    }
}
exports.default = LockerSystem;
//# sourceMappingURL=LockerSystem.js.map