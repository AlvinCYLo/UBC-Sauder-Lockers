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
const LockerSystem_1 = require("../controller/LockerSystem");
class LockerSystemServer {
    constructor() {
        this.ls = new LockerSystem_1.default();
    }
    ;
    addLockerFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let lockersExcel = req.params.body;
                let added = yield this.ls.getAvailableLockers(lockersExcel);
                res.json(200, { added: added });
                return next();
            }
            catch (error) {
                res.json(400, { error: `Could not add Locker File with error: ${error}` });
                return next();
            }
        });
    }
    ;
    addClientFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let clientExcel = req.params.body;
                let added = yield this.ls.getAllClients(clientExcel);
                res.json(200, { added: added });
                return next();
            }
            catch (error) {
                res.json(400, { error: `Could not add Client File with error: ${error}` });
                return next();
            }
        });
    }
    ;
    removeLockerFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let removed = this.ls.removeLockerFile();
                res.json(200, { removed: removed });
                return next();
            }
            catch (error) {
                res.json(400, { error: `Could not remove Locker File with error: ${error}` });
                return next();
            }
        });
    }
    removeClientFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let removed = this.ls.removeClientFile();
                res.json(200, { removed: removed });
                return next();
            }
            catch (error) {
                res.json(400, { error: `Could not remove Client File with error: ${error}` });
                return next();
            }
        });
    }
    ;
    currentDataset(req, res, next) {
        try {
            let current = this.ls.currentDataset();
            res.json(200, { current: current });
            return next();
        }
        catch (error) {
            res.json(400, { error: `Could not get current dataset with error: ${error}` });
            return next();
        }
    }
    searchLockerByClient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let found = this.ls.searchLockerByStudentNumber(req.params.lockerOrStudentNumber);
                res.json(200, { client: found });
                return next();
            }
            catch (error) {
                res.json(400, { error: `Could not search Locker by Student number with error: ${error}` });
            }
        });
    }
    ;
    searchClientByLocker(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let lockerFound = this.ls.searchClientByLocker(req.params.body);
                res.json(200, { locker: lockerFound });
                return next();
            }
            catch (error) {
                res.json(400, { error: `Could not search client by Locker number with error: ${error}` });
                return next();
            }
        });
    }
    ;
    makeLockerAssignments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.ls.makeAssignments();
                let dataset = this.ls.currentDataset();
                res.json(200, { assigned: dataset });
                return next();
            }
            catch (error) {
                res.json(400, { error: `Could not make Locker Assignments with error: ${error}` });
                return next();
            }
        });
    }
    ;
}
module.exports = LockerSystemServer;
//# sourceMappingURL=LockerSystemServer.js.map