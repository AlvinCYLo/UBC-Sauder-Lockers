"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Locker_1 = require("./Locker");
const Client_1 = require("./Client");
const Excel = require("exceljs");
const COLUMNS = [
    { header: 'First Name', key: 'firstName', width: 20 },
    { header: 'Last Name', key: 'lastName', width: 20 },
    { header: 'Student Number', key: 'studentNumber', width: 20 },
    { header: 'Phone Number', key: 'phoneNumber', width: 20 },
    { header: 'Email Address', key: 'emailAddress', width: 20 },
    { header: 'Locker Number', key: 'lockerNumber', width: 20 },
];
class ExcelUtils {
    extractLockerInfo(filename) {
        let that = this;
        return new Promise(function (resolve, reject) {
            return __awaiter(this, void 0, void 0, function* () {
                let lockersOnFloor = new Map();
                let workbook = new Excel.Workbook();
                if (filename && filename.endsWith(".xlsx")) {
                    let file = yield workbook.xlsx.readFile(filename);
                    that.cellParserForLockers(file, lockersOnFloor);
                    resolve(lockersOnFloor);
                }
                else if (filename && filename.endsWith(".csv")) {
                    let file = yield workbook.csv.readFile(filename);
                    that.cellParserForLockers(file, lockersOnFloor);
                    resolve(lockersOnFloor);
                }
            });
        });
    }
    extractClientInfo(filename) {
        let that = this;
        return new Promise(function (resolve, reject) {
            return __awaiter(this, void 0, void 0, function* () {
                let clientsByFloor = new Map();
                let workbook = new Excel.Workbook();
                if (filename && filename.endsWith(".xlsx")) {
                    let file = yield workbook.xlsx.readFile(filename);
                    that.cellParserForClients(file, clientsByFloor);
                    resolve(clientsByFloor);
                }
                else if (filename && filename.endsWith(".csv")) {
                    let file = yield workbook.xlsx.readFile(filename);
                    that.cellParserForClients(file, clientsByFloor);
                    resolve(clientsByFloor);
                }
            });
        });
    }
    getColumnIndex(allColumnNames) {
        let columnIndexes = {};
        for (let i = 0; i < allColumnNames.length; i++) {
            switch (allColumnNames[i]._value.model.value) {
                case "First Name":
                    columnIndexes.firstName = i;
                    break;
                case "Last Name":
                    columnIndexes.lastName = i;
                    break;
                case "Phone Number":
                    columnIndexes.phoneNumber = i;
                    break;
                case "Email Address":
                    columnIndexes.emailAddress = i;
                    break;
                case "Student Number":
                    columnIndexes.studentNumber = i;
                    break;
                case "Floor Preference":
                    columnIndexes.floorPreference = i;
                    break;
                case "Date Purchased":
                    columnIndexes.dateOfPurchase = i;
                    break;
                case "Locker Placement":
                    columnIndexes.lockerPlacement = i;
                    break;
            }
        }
        return columnIndexes;
    }
    cellParserForClients(file, clientsByFloor) {
        let that = this;
        let allColumnNames = file._worksheets[1]._rows[0]._cells;
        let columnIndex = that.getColumnIndex(allColumnNames);
        let orders = file._worksheets[1]._rows;
        orders.forEach(function (order, i) {
            if (i !== 0) {
                let client = new Client_1.Client(orders[i]._cells[columnIndex.firstName]._value.value, orders[i]._cells[columnIndex.lastName]._value.value, parseInt(orders[i]._cells[columnIndex.phoneNumber]._value.value), orders[i]._cells[columnIndex.emailAddress]._value.value, parseInt(orders[i]._cells[columnIndex.studentNumber]._value.value), orders[i]._cells[columnIndex.floorPreference]._value.value, new Date(orders[i]._cells[columnIndex.dateOfPurchase]._value.value), orders[i]._cells[columnIndex.lockerPlacement]._value.value);
                let floorPref = client.getFloorPreference();
                if (clientsByFloor.has(floorPref)) {
                    let oldVal = clientsByFloor.get(floorPref);
                    oldVal.push(client);
                    clientsByFloor.set(floorPref, oldVal);
                }
                else {
                    clientsByFloor.set(floorPref, [client]);
                }
            }
        });
    }
    cellParserForLockers(file, lockersOnFloor) {
        file.worksheets.forEach(function (worksheet) {
            worksheet._rows.forEach(function (cell) {
                let locker = new Locker_1.Locker(cell._cells[0]._value.model.value);
                let floor = locker.getLockerFloor();
                if (lockersOnFloor.has(floor)) {
                    let oldVal = lockersOnFloor.get(floor);
                    oldVal.push(locker);
                    lockersOnFloor.set(floor, oldVal);
                }
                else {
                    lockersOnFloor.set(locker.getLockerFloor(), [locker]);
                }
            });
        });
    }
    createAndLoadWorkbook(assignments) {
        let workbook = new Excel.Workbook();
        workbook.addWorksheet("Basement");
        workbook.addWorksheet("Second Floor");
        workbook.addWorksheet("Third Floor");
        workbook.addWorksheet("Fourth Floor");
        this.loadWorkbook(assignments, workbook);
        this.formatWorkbook(workbook);
        return workbook;
    }
    ;
    loadWorkbook(assignments, workbook) {
        let basement = [], second = [], third = [], fourth = [];
        assignments.forEach((value) => {
            value.forEach((locker) => {
                switch (locker.getLockerFloor()) {
                    case "Basement":
                        basement.push(locker);
                        break;
                    case "Second Floor":
                        second.push(locker);
                        break;
                    case "Third Floor":
                        third.push(locker);
                        break;
                    case "Fourth Floor":
                        fourth.push(locker);
                        break;
                }
            });
        });
        let allFloors = new Map();
        allFloors.set("Basement", basement);
        allFloors.set("Second Floor", second);
        allFloors.set("Third Floor", third);
        allFloors.set("Fourth Floor", fourth);
        let keys = allFloors.keys();
        while (keys) {
            let currentSheet = keys.next().value;
            if (currentSheet) {
                let sheet = workbook.getWorksheet(currentSheet);
                sheet.columns = COLUMNS;
                let lockers = allFloors.get(currentSheet);
                lockers.forEach((locker) => {
                    sheet.addRow({
                        firstName: locker.getClient().getFirstName(),
                        lastName: locker.getClient().getLastName(),
                        studentNumber: locker.getClient().getStudentNumber(),
                        phoneNumber: locker.getClient().getPhoneNumber(),
                        emailAddress: locker.getClient().getEmailAddress(),
                        lockerNumber: locker.getLockerNumber()
                    });
                });
            }
            else {
                return;
            }
        }
    }
    ;
    formatWorkbook(workbook) {
        workbook.eachSheet((worksheet) => {
            worksheet.getRow(1).eachCell(function (cell) {
                cell.font = { bold: true };
            });
        });
    }
    ;
    publishLockerAssignments(filename, workbook) {
        let total = 0;
        workbook.eachSheet((worksheet) => {
            total += worksheet.rowCount - 1;
        });
        workbook.xlsx.writeFile(filename).then(() => {
            console.log(total + " Lockers Assigned");
        });
    }
}
exports.default = ExcelUtils;
//# sourceMappingURL=ExcelUtils.js.map