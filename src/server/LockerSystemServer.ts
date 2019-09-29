import LockerSystem from '../controller/LockerSystem';
import restify = require("restify");

class LockerSystemServer {

    private ls: LockerSystem;

    constructor() {
        this.ls = new LockerSystem();
    };

    public async addLockerFile(req: restify.Request, res: restify.Response, next: restify.Next) {
        try {
            let lockersExcel = req.params.body;
            let added = await this.ls.getAvailableLockers(lockersExcel);
            res.json(200, {added: added});
            return next();
        } catch (error) {
            res.json(400, {error: `Could not add Locker File with error: ${error}`});
            return next();
        }

    };

    public async addClientFile(req: restify.Request, res: restify.Response, next: restify.Next) {
        try {
            let clientExcel = req.params.body;
            let added = await this.ls.getAllClients(clientExcel);
            res.json(200, {added: added});
            return next();
        } catch (error) {
            res.json(400, {error: `Could not add Client File with error: ${error}`});
            return next();
        }
    };

    public async removeLockerFile(req: restify.Request, res: restify.Response, next: restify.Next) {
        try {
            let removed = this.ls.removeLockerFile();
            res.json(200, {removed: removed});
            return next();
        } catch (error) {
            res.json(400, {error: `Could not remove Locker File with error: ${error}`});
            return next();
        }

    }

    public async removeClientFile(req: restify.Request, res: restify.Response, next: restify.Next) {
        try {
            let removed = this.ls.removeClientFile();
            res.json(200, {removed: removed});
            return next();
        } catch (error) {
            res.json(400, {error: `Could not remove Client File with error: ${error}`});
            return next();
        }
    };

    public currentDataset(req: restify.Request, res: restify.Response, next: restify.Next) {
        try {
            let current = this.ls.currentDataset();
            res.json(200, {current: current});
            return next();
        } catch (error) {
            res.json(400, {error: `Could not get current dataset with error: ${error}`});
            return next();
        }
    }

    public async searchLockerByClient(req: restify.Request, res: restify.Response, next: restify.Next){
        try {
            let found = this.ls.searchLockerByStudentNumber(req.params.lockerOrStudentNumber);
            res.json(200, {client: found});
            return next();
        } catch (error) {
            res.json(400, {error: `Could not search Locker by Student number with error: ${error}`});
        }
    };


    public async searchClientByLocker(req: restify.Request, res: restify.Response, next: restify.Next) {
        try {
            let lockerFound = this.ls.searchClientByLocker(req.params.body);
            res.json(200, {locker: lockerFound});
            return next();
        } catch (error) {
            res.json(400, {error: `Could not search client by Locker number with error: ${error}`});
            return next();
        }
    };

    public async makeLockerAssignments(req: restify.Request, res: restify.Response, next: restify.Next) {
        try {
            this.ls.makeAssignments();
            let dataset = this.ls.currentDataset();
            res.json(200, {assigned: dataset});
            return next();
        } catch (error) {
            res.json(400, {error: `Could not make Locker Assignments with error: ${error}`});
            return next();
        }
    };


}

module.exports = LockerSystemServer;