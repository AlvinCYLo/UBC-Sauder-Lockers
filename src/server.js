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
const express = require('express');
const app = express();
const port = 3000;
const LockerSystemServer = require('./server/LockerSystemServer');
const lss = new LockerSystemServer();
app.put('/lockers', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    yield lss.addLockerFile(req, res, next);
}));
app.put('/clients', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    yield lss.addClientFile(req, res, next);
}));
app.delete('/delete:lockersOrClients', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
}));
app.post('/search:studentNumber', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
}));
app.get('/data', (req, res) => {
    res.send(lss.currentDataset(res));
});
app.listen(port, () => {
    console.log(`Locker system listening on port ${port}`);
});
//# sourceMappingURL=server.js.map