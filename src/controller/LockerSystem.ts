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
        let floors = that.clients.keys();
        while(floors){
            let currentFloor = floors.next().value;
            let clientsByFloor = that.clients.get(currentFloor);

            clientsByFloor.sort(function (client1, client2) {
                if (client1.getDateOfPurchase() < client2.getDateOfPurchase()) {
                    return -1
                } else if (client1.getDateOfPurchase() > client2.getDateOfPurchase()) {
                    return 1;
                } else {
                    return 0;
                }
            });

            let lockersByFloor = that.availableLockers.get(currentFloor);
            let topLockers: Locker[] = [];
            let bottomLockers: Locker[] = [];
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
                if(client.getLockerPlacement() === "Top Locker"){
                    client.setLocker(topLockers[top]);
                    if(that.lockerAssignments.has(client)){
                        let lockers = that.lockerAssignments.get(client);
                        lockers.push(topLockers[top]);
                        that.lockerAssignments.set(client, lockers);
                    } else {
                        that.lockerAssignments.set(client, [topLockers[top]]);
                    }
                    top++;
                } else {
                    client.setLocker(bottomLockers[bot]);
                    if(that.lockerAssignments.has(client)){
                        let lockers = that.lockerAssignments.get(client);
                        lockers.push(bottomLockers[bot]);
                        that.lockerAssignments.set(client, lockers);
                    } else {
                        that.lockerAssignments.set(client, [bottomLockers[bot]]);
                    }
                    bot++;
                }
            });
        }
    }

    public publishAssignment(): void {
        let that = this;

    }


}