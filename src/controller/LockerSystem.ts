import {Client} from "./Client";
import {Locker} from "./Locker";
import Log from "../Util";
import ExcelUtils from "./ExcelUtils";

const fs = require("fs");
const path = require('path');

export default class LockerSystem {
    private availableLockers: Map<string, Locker[]>;
    private clients: Map<string, Client[]>;
    private lockerAssignments: Map<Client, Locker[]>;
    private currentLockerExcelFile: String;
    private currentClientExcelFile: String;
    private static excel: ExcelUtils = new ExcelUtils();

    constructor() {
        this.availableLockers = new Map<string, Locker[]>();
        this.clients = new Map<string, Client[]>();
        this.lockerAssignments = new Map<Client, Locker[]>();
        this.currentLockerExcelFile = '';
        this.currentClientExcelFile = '';
        Log.trace("Locker System Init");
    }

    public async getAvailableLockers(filepath: string) {
        let that = this;
        if (filepath && fs.existsSync(filepath)) {
            that.availableLockers = await LockerSystem.excel.extractLockerInfo(filepath);
            that.currentLockerExcelFile = path.basename(filepath, '.xlsx');
        }
        return path.basename(filepath);
    }

    public async getAllClients(filepath: string) {
        let that = this;
        if (filepath && fs.existsSync(filepath)) {
            that.clients = await LockerSystem.excel.extractClientInfo(filepath);
            that.currentClientExcelFile = path.basename(filepath, '.xlsx');
        }
        return path.basename(filepath);
    }

    private carryOverTo(currentFloor: string) {
        switch (currentFloor) {
            case "Basement":
                return "Second Floor";
            case "Second Floor":
                return "Third Floor";
            case "Third Floor":
                return "Fourth Floor";
        }
    }

    public makeAssignments(): void {
        let that = this;
        let floors = that.clients.keys();

        if (fs.existsSync(`${that.currentLockerExcelFile}-${that.currentClientExcelFile}.json`)) {
            that.lockerAssignments = JSON.parse(fs.readFileSync(`${that.currentLockerExcelFile}-${that.currentClientExcelFile}.json`));
        } else {
            while (floors) {
                let currentFloor = floors.next().value;
                if (currentFloor) {
                    let clientsByFloor = that.clients.get(currentFloor);
                    let lockersByFloor = that.availableLockers.get(currentFloor);

                    let lockersSize = lockersByFloor.length;
                    let clientSize = clientsByFloor.length;

                    if (clientSize > lockersSize) {
                        let excess = clientSize - lockersSize;
                        let carryOver = clientsByFloor.splice(clientsByFloor.length - 1 - excess, excess);
                        let target = this.carryOverTo(currentFloor);
                        let update = that.clients.get(target);
                        update.push(...carryOver);
                        that.clients.set(target, update);
                    }

                    clientsByFloor.sort(function (client1, client2) {
                        if (client1.getDateOfPurchase() < client2.getDateOfPurchase()) {
                            return -1
                        } else if (client1.getDateOfPurchase() > client2.getDateOfPurchase()) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

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
                        if (top >= topLockers.length) {
                            client.setLockerPreference("Bottom Locker");
                        } else if (bot >= bottomLockers.length) {
                            client.setLockerPreference("Top Locker");
                        }

                        if (client.getLockerPlacement() === "Top Locker") {
                            client.setLocker(topLockers[top]);
                            if (that.lockerAssignments.has(client)) {
                                let lockers = that.lockerAssignments.get(client);
                                lockers.push(topLockers[top]);
                                that.lockerAssignments.set(client, lockers);
                            } else {
                                that.lockerAssignments.set(client, [topLockers[top]]);
                            }
                            top++;
                        } else {
                            client.setLocker(bottomLockers[bot]);
                            if (that.lockerAssignments.has(client)) {
                                let lockers = that.lockerAssignments.get(client);
                                lockers.push(bottomLockers[bot]);
                                that.lockerAssignments.set(client, lockers);
                            } else {
                                that.lockerAssignments.set(client, [bottomLockers[bot]]);
                            }
                            bot++;
                        }
                    });
                } else {
                    return;
                }
            }
        }
    }

    public async publishAssignment() {
        let date = new Date();
        let workbook = LockerSystem.excel.createAndLoadWorkbook(this.lockerAssignments);
        await LockerSystem.excel.publishLockerAssignments(date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "_Locker-Assignments.xlsx", workbook);
    }

    public persistAssignments() {
        fs.writeFileSync(`${this.currentLockerExcelFile}-${this.currentClientExcelFile}.json`, JSON.stringify(this.lockerAssignments));
    }

    public currentDataset(){
        return (`${this.currentLockerExcelFile} and ${this.currentClientExcelFile}`);
    };

    public removeLockerFile(){
        this.availableLockers.clear();
        this.currentLockerExcelFile = '';
        return (`${new Date().toISOString()} Locker File ${this.currentLockerExcelFile} removed}`);
    }

    public removeClientFile(){
        this.clients.clear();
        this.currentClientExcelFile = '';
        return (`${new Date().toISOString()} Client File ${this.currentClientExcelFile} removed}`);
    }

    public searchClientByLocker(lockerNumber: number){
        let floor;
        let lockerString = lockerNumber.toString();

        if (lockerString.length === 4) {
            if (lockerString.startsWith("2")) {
                floor = "Second Floor";
            } else if (lockerString.startsWith("3")) {
                floor = "Third Floor";
            } else {
                floor = "Fourth Floor";
            }
        } else {
            floor = "Basement";
        }

        let lockersOnFloor = this.availableLockers.get(floor);
        let found = lockersOnFloor.find((locker) => {
            return locker.getLockerNumber() === lockerNumber;
        });

        return found.getClient();

    };

    public searchLockerByStudentNumber(studentNumber: number){

    };

    public searchLockerByClientName(studentName: string){

    };
}

async function start() {
    console.log("Locker Assignment Starting");
    const app = new LockerSystem();
    await app.getAvailableLockers("./test/data/Lockers.xlsx");
    await app.getAllClients("./test/data/Clients.xlsx");
    app.makeAssignments();
    await app.publishAssignment();
    app.persistAssignments();
}

start();