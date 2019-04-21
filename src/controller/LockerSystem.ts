import {Client} from "./Client";
import {Locker} from "./Locker";
import Log from "../Util";
import ExcelUtils from "./ExcelUtils";

const fs = require("fs");

export default class LockerSystem {
    private availableLockers: Map<string, Locker[]>;
    private clients: Map<string, Client[]>;
    private lockerAssignments: Map<Client, Locker[]>;
    private static excel: ExcelUtils = new ExcelUtils();

    constructor() {
        this.availableLockers = new Map<string, Locker[]>();
        this.clients = new Map<string, Client[]>();
        this.lockerAssignments = new Map<Client, Locker[]>();
        Log.trace("Locker System Init");
    }

    public async getAvailableLockers(filepath: string) {
        let that = this;
        if (filepath && fs.existsSync(filepath)) {
            that.availableLockers = await LockerSystem.excel.extractLockerInfo(filepath);
        }
    }

    public async getAllClients(filepath: string) {
        let that = this;
        if (filepath && fs.existsSync(filepath)) {
            that.clients = await LockerSystem.excel.extractClientInfo(filepath);
        }
    }


    public makeAssignments(): void {
        let that = this;
        Object.keys(that.clients).forEach(function (floor) {
            let clientsByFloor = that.clients.get(floor);

            clientsByFloor.sort(function (client1, client2) {
                if (client1.getDateOfPurchase() < client2.getDateOfPurchase()) {
                    return -1
                } else if (client1.getDateOfPurchase() > client2.getDateOfPurchase()) {
                    return 1;
                } else {
                    return 0;
                }
            });

            let lockersByFloor = that.availableLockers.get(floor);
            let topLockers = [];
            let bottomLockers = [];
            let top = 0;
            let bot = 0;

            for (let i = 0; i < lockersByFloor.length; i++) {
                if (lockersByFloor[i].top()) {
                    topLockers.push(lockersByFloor[i]);
                } else {
                    bottomLockers.push(lockersByFloor[i]);
                }
            }

            clientsByFloor.forEach(function (client) {

            });

        });
    }

    public publishAssignment(): void {

    }


}