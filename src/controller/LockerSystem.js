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
    carryOverTo(currentFloor) {
        switch (currentFloor) {
            case "Basement":
                return "Second Floor";
            case "Second Floor":
                return "Third Floor";
            case "Third Floor":
                return "Fourth Floor";
        }
    }
    makeAssignments() {
        let that = this;
        let floors = that.clients.keys();
        while (floors) {
            let currentFloor = floors.next().value;
            if (currentFloor) {
                let clientsByFloor = that.clients.get(currentFloor);
                let lockersByFloor = that.availableLockers.get(currentFloor);
                let lockersSize = lockersByFloor.length;
                let clientSize = clientsByFloor.length;
                if (clientSize > lockersSize) {
                    let excess = clientSize - lockersSize;
                    let carryOver = clientsByFloor.splice(clientsByFloor.length - 1 - excess, excess);
                    let target = this.carryOverTo(currentFloor);
                    let update = that.clients.get(target);
                    update.push(...carryOver);
                    that.clients.set(target, update);
                }
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
                    if (top >= topLockers.length) {
                        client.setLockerPreference("Bottom Locker");
                    }
                    else if (bot >= bottomLockers.length) {
                        client.setLockerPreference("Top Locker");
                    }
                    if (client.getLockerPlacement() === "Top Locker") {
                        client.setLocker(topLockers[top]);
                        if (that.lockerAssignments.has(client)) {
                            let lockers = that.lockerAssignments.get(client);
                            lockers.push(topLockers[top]);
                            that.lockerAssignments.set(client, lockers);
                        }
                        else {
                            that.lockerAssignments.set(client, [topLockers[top]]);
                        }
                        top++;
                    }
                    else {
                        client.setLocker(bottomLockers[bot]);
                        if (that.lockerAssignments.has(client)) {
                            let lockers = that.lockerAssignments.get(client);
                            lockers.push(bottomLockers[bot]);
                            that.lockerAssignments.set(client, lockers);
                        }
                        else {
                            that.lockerAssignments.set(client, [bottomLockers[bot]]);
                        }
                        bot++;
                    }
                });
            }
            else {
                return;
            }
        }
    }
    publishAssignment() {
        return __awaiter(this, void 0, void 0, function* () {
            let date = new Date();
            let workbook = LockerSystem.excel.createAndLoadWorkbook(this.lockerAssignments);
            yield LockerSystem.excel.publishLockerAssignments(date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "_Locker Assignments.xlsx", workbook);
        });
    }
}
LockerSystem.excel = new ExcelUtils_1.default();
exports.default = LockerSystem;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Locker Assignment Starting");
        const app = new LockerSystem();
        yield app.getAvailableLockers("./test/data/Lockers.xlsx");
        yield app.getAllClients("./test/data/Clients.xlsx");
        app.makeAssignments();
        app.publishAssignment();
    });
}
start();
//# sourceMappingURL=LockerSystem.js.map