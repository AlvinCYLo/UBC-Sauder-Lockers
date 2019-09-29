const restify = require('restify');
let server = restify.createServer({name: 'cusLockers'});
const port = 3000;

const LockerSystemServer = require('./server/LockerSystemServer');
const lss = new LockerSystemServer();

server.put('/add/:lockersOrClient', async (req: restify.Request, res: restify.Response, next: restify.Next) => {
    if (req.params.lockersOrClients.toLowerCase() === 'lockers') {
        lss.addLockerFile(req, res, next);
    } else {
        lss.addClientFile(req, res, next);
    }
});

server.del('/delete/:lockersOrClients', async (req: restify.Request, res: restify.Response, next: restify.Next) => {
    if (req.params.lockersOrClients.toLowerCase() === 'lockers') {
        lss.removeLockerFile(req, res, next);
    } else {
        lss.removeClientFile(req, res, next);
    }
});

server.get('/data', (req: restify.Request, res: restify.Response, next: restify.Next) => {
    lss.currentDataset(req, res, next);
});

server.get('/assignment', (req: restify.Request, res: restify.Response, next: restify.Next) => {
    lss.makeLockerAssignments(req, res, next);
});

server.post('/search/:lockerOrStudentNumber', async (req: restify.Request, res: restify.Response, next: restify.Next) => {
    if (req.params.lockerOrStudentNumber.toLowerCase() === 'lockerNumber') {
        lss.searchClientByLocker(req, res, next);
    } else {
        lss.searchLockerByClient(req, res, next);
    }
});

server.listen(port, () => {
    console.log(`Locker system listening on port ${port}`);
});