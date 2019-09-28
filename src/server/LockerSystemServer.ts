import LockerSystem from '../controller/LockerSystem';
// @ts-ignore
import { Request, Response, NextFunction } from "express";

    class LockerSystemServer {

    private ls: LockerSystem;

    constructor(){
        this.ls = new LockerSystem();
    };

    public async addLockerFile(req: Request, res: Response, next: NextFunction){
        try {
            let lockersExcel = req.params.body;
            let added = await this.ls.getAvailableLockers(lockersExcel);
            res.status(200).json({added: added});
            return next();
        } catch (error){
            res.status(400).json({error: error});
            return next();
        }

    };

    public async addClientFile(req: Request, res: Response, next: NextFunction){
        try {
            let clientExcel = req.params.body;
            let added = await this.ls.getAllClients(clientExcel);
            res.status(200).json({added: added});
            return next();
        } catch (error){
            res.status(400).json({error: error});
            return next();
        }
    };

    public async removeLockerFile(req: Request, res: Response, next: NextFunction){
        let removed = this.ls.removeLockerFile();
        res.status(200).json({removed: removed});
    }

    public async removeClientFile(req: Request, res: Response, next: NextFunction){
        let removed = this.ls.removeClientFile();
        res.status(200).json({removed: removed});
    };

    public currentDataset(res: Response){
        let current = this.ls.currentDataset();
        res.status(200).json(current);
    }

    // public async searchLockerByClient(req: Request, res: Response, next: NextFunction){
    //     try {
    //         let client = req.params.body;
    //
    //     } catch (error) {
    //
    //     }
    //
    // };
    //
    // public async searchClientByLocker(req: Request, res: Response, next: NextFunction){
    //     try {
    //         let locker: Locker = req.params.body;
    //
    //     } catch (error) {
    //
    //     }
    // };

    public async makeLockerAssignments(req: Request, res: Response, next: NextFunction){
        this.ls.makeAssignments();
        let dataset = this.ls.currentDataset();
        res.json(200, {assigned: dataset});
    };

}

module.exports = LockerSystemServer;