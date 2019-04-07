import {Client} from "./Client";
import {Locker} from "./Locker";
import Log from "../Util";
import ExcelUtils from "./ExcelUtils";

const fs = require("fs");
const excel = ExcelUtils;

export default class LockerSystem {
    private availableLockers: Map<string, Locker[]>;
    private clients: Map<string, Client[]>;
    private lockerAssignments: Map<Client, Locker[]>;

    constructor() {
        this.availableLockers = new Map<string, Locker[]>();
        this.clients = new Map<string, Client[]>();
        this.lockerAssignments = new Map<Client, Locker[]>();
        Log.trace("Locker System Init");
    }

    public getAvailableLockers(filepath: string): Promise<Map<string, Locker[]>> {
        let that = this;
        return new Promise(function (resolve, reject) {
            if (filepath && fs.existsSync(filepath)) {
                let lockersByFloor = excel.extractLockerInfo(filepath);
                lockersByFloor.then(function (allLockers) {
                    that.availableLockers = allLockers;
                });
                resolve(lockersByFloor);
            } else {
                Log.trace("File or Path does not exist");
                reject(new Error("Get Available Lockers Failed: File or Path does not exist"));
            }
        });
    }

    public getAllClients(filepath: string): Promise<Map<string, Client[]>> {
        let that = this;
        return new Promise(function (resolve, reject) {
            if (filepath && fs.existsSync(filepath)) {
                let allClients = excel.extractClientInfo(filepath);
                allClients.then(function (clients) {
                    that.clients = clients;
                });
                resolve(allClients);
            } else {
                Log.trace("File or Path does not exist");
                reject(new Error("Get All Clients Failed: File or Path does not exist"));
            }
        });
    }


    public makeAssignments(): void {
        let that = this;
        Object.keys(that.clients).forEach(function (floor) {
            let clientsByFloor = that.clients.get(floor);
            let lockersByFloor = that.availableLockers.get(floor);
            clientsByFloor.sort(function (client1, client2) {
                if (client1.getDateOfPurchase() < client2.getDateOfPurchase()) {
                    return -1
                } else if (client1.getDateOfPurchase() > client2.getDateOfPurchase()) {
                    return 1;
                } else {
                    return 0;
                }
            });

            clientsByFloor.forEach(function (client) {
                
            });

        });
    }

    public publishAssignment(): void {

    }


}