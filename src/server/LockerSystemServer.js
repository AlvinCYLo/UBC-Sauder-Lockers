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
                res.status(200).json({ added: added });
                return next();
            }
            catch (error) {
                res.status(400).json({ error: error });
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
                res.status(200).json({ added: added });
                return next();
            }
            catch (error) {
                res.status(400).json({ error: error });
                return next();
            }
        });
    }
    ;
    removeLockerFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let removed = this.ls.removeLockerFile();
            res.status(200).json({ removed: removed });
        });
    }
    removeClientFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let removed = this.ls.removeClientFile();
            res.status(200).json({ removed: removed });
        });
    }
    ;
    currentDataset(res) {
        let current = this.ls.currentDataset();
        res.status(200).json(current);
    }
    makeLockerAssignments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ls.makeAssignments();
            let dataset = this.ls.currentDataset();
            res.json(200, { assigned: dataset });
        });
    }
    ;
}
module.exports = LockerSystemServer;
//# sourceMappingURL=LockerSystemServer.js.map