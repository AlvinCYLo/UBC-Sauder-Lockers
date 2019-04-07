import {Client} from "./Client";
import {Locker} from "./Locker";
import Log from "../Util";
import ExcelUtils from "./ExcelUtils";

const fs = require("fs");
const http = require("http");
const excel = ExcelUtils;

export default class LockerSystem {
    private availableLockers: Locker[];
    private clients: Client[];
    private lockerAssignments: Map<Client, Locker[]>;

    constructor() {
        this.availableLockers = [];
        this.clients = [];
        this.lockerAssignments = new Map<Client, Locker[]>();
        Log.trace("Locker System Init");
    }

    public getAvailableLockers() {

    }

    public getAllClients() {

    }

    public publishAssignment() {

    }

}