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
const LockerSystem_1 = require("./controller/LockerSystem");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Locker Assignment Starting");
        const app = new LockerSystem_1.default();
        yield app.getAvailableLockers("./test/data/Lockers.xlsx");
        yield app.getAllClients("./test/data/Clients.xlsx");
        app.makeAssignments();
        yield app.publishAssignment();
        app.persistAssignments();
    });
}
start();
//# sourceMappingURL=App.js.map