import LockerSystem from '../controller/LockerSystem';
// @ts-ignore
import { Request, Response, NextFunction } from "express";
import {Locker} from "../controller/Locker";

export default class LockerSystemServer {

    private ls: LockerSystem;

    constructor(){
        this.ls = new LockerSystem();
    };

    public async addLockerFile(req: Request, res: Response, next: NextFunction){
        try {
            let lockersExcel = req.params.body;
            let added = await this.ls.getAvailableLockers(lockersExcel);
            res.json(200, `Locker File ${added} was added`);
            return next();
        } catch (error){
            res.json(400, {error: error});
            return next();
        }

    };

    public async addClientFile(req: Request, res: Response, next: NextFunction){
        try {
            let clientExcel = req.params.body;
            let added = await this.ls.getAllClients(clientExcel);
            res.json(200, `Client File ${added} was added`);
            return next();
        } catch (error){
            res.json(400, {error: error});
            return next();
        }
    };

    public async removeLockerFile(req: Request, res: Response, next: NextFunction){
        let removed = this.ls.removeLockerFile();
        res.json(200, {removed: removed});
    }

    public async removeClientFile(req: Request, res: Response, next: NextFunction){
        let removed = this.ls.removeClientFile();
        res.json(200, {removed: removed});
    };

    public async searchLockerByClient(req: Request, res: Response, next: NextFunction){
        try {
            let client = req.params.body;

        } catch (error) {

        }

    };

    public async searchClientByLocker(req: Request, res: Response, next: NextFunction){
        try {
            let locker: Locker = req.params.body;

        } catch (error) {

        }
    };

    public async makeLockerAssignments(req: Request, res: Response, next: NextFunction){
        this.ls.makeAssignments();
    };

}