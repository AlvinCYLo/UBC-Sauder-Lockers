"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../Util");
const ExcelUtils_1 = require("./ExcelUtils");
const fs = require("fs");
class LockerSystem {
    constructor() {
        this.availableLockers = new Map();
        this.clients = new Map();
        this.lockerAssignments = new Map();
        Util_1.default.trace("Locker System Init");
    }
    getAvailableLockers(filepath) {
        return __awaiter(this, void 0, void 0, function* () {
            let that = this;
            if (filepath && fs.existsSync(filepath)) {
                that.availableLockers = yield LockerSystem.excel.extractLockerInfo(filepath);
            }
        });
    }
    getAllClients(filepath) {
        return __awaiter(this, void 0, void 0, function* () {
            let that = this;
            if (filepath && fs.existsSync(filepath)) {
                that.clients = yield LockerSystem.excel.extractClientInfo(filepath);
            }
        });
    }
    makeAssignments() {
        let that = this;
        Object.keys(that.clients).forEach(function (floor) {
            let clientsByFloor = that.clients.get(floor);
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
            let lockersByFloor = that.availableLockers.get(floor);
            let topLockers = [];
            let bottomLockers = [];
            let top = 0;
            let bot = 0;
            for (let i = 0; i < lockersByFloor.length; i++) {
                if (lockersByFloor[i].top()) {
                    topLockers.push(lockersByFloor[i]);
                }
                else {
                    bottomLockers.push(lockersByFloor[i]);
                }
            }
            clientsByFloor.forEach(function (client) {
            });
        });
    }
    publishAssignment() {
    }
}
LockerSystem.excel = new ExcelUtils_1.default();
exports.default = LockerSystem;
//# sourceMappingURL=LockerSystem.js.map