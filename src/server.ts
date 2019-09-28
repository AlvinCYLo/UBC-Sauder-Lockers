const express = require('express');
// @ts-ignore
import { Request, Response, NextFunction } from "express";

const app = express();
const port = 3000;

const LockerSystemServer = require('./server/LockerSystemServer');
const lss = new LockerSystemServer();

app.put('/lockers', async (req: Request, res: Response, next: NextFunction) => {
    await lss.addLockerFile(req, res, next);
});

app.put('/clients', async (req: Request, res: Response, next: NextFunction) => {
    await lss.addClientFile(req, res, next);
});

app.delete('/delete:lockersOrClients', async (req: Request, res: Response, next: NextFunction) => {

});

app.post('/search:studentNumber', async (req: Request, res: Response, next: NextFunction) => {

});

app.get('/data', (req: Request, res: Response) => {
    res.send(lss.currentDataset(res));
});



app.listen(port, () => {
    console.log(`Locker system listening on port ${port}`);
});