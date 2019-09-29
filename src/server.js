var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const restify = require('restify');
let server = restify.createServer({ name: 'cusLockers' });
const port = 3000;
const LockerSystemServer = require('./server/LockerSystemServer');
const lss = new LockerSystemServer();
server.put('/add/:lockersOrClient', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (req.params.lockersOrClients.toLowerCase() === 'lockers') {
        lss.addLockerFile(req, res, next);
    }
    else {
        lss.addClientFile(req, res, next);
    }
}));
server.del('/delete/:lockersOrClients', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (req.params.lockersOrClients.toLowerCase() === 'lockers') {
        lss.removeLockerFile(req, res, next);
    }
    else {
        lss.removeClientFile(req, res, next);
    }
}));
server.get('/data', (req, res, next) => {
    lss.currentDataset(req, res, next);
});
server.get('/assignment', (req, res, next) => {
    lss.makeLockerAssignments(req, res, next);
});
server.post('/search/:lockerOrStudentNumber', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (req.params.lockerOrStudentNumber.toLowerCase() === 'lockerNumber') {
        lss.searchClientByLocker(req, res, next);
    }
    else {
        lss.searchLockerByClient(req, res, next);
    }
}));
server.listen(port, () => {
    console.log(`Locker system listening on port ${port}`);
});
//# sourceMappingURL=server.js.map