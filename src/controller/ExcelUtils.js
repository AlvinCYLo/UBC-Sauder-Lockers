"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Locker_1 = require("./Locker");
const Client_1 = require("./Client");
const Excel = require("exceljs");
class ExcelUtils {
    static extractExcelLockerInfo(filename) {
        let that = this;
        return new Promise(function (resolve, reject) {
            let lockersOnFloor = new Map();
            let workbook = new Excel.Workbook();
            let fileType = filename.slice(-4);
            if (fileType.charAt(0) === ".") {
                fileType = fileType.substr(1);
            }
            if (fileType && fileType === "xlsx") {
                workbook.xlsx.readFile(filename)
                    .then(function (file) {
                    that.cellParserForLockers(file, lockersOnFloor);
                    resolve(lockersOnFloor);
                }).catch(function (e) {
                    reject("XLSX Error: " + e.message);
                });
            }
            else if (fileType && fileType === "csv") {
                workbook.csv.readFile(filename)
                    .then(function (file) {
                    that.cellParserForLockers(file, lockersOnFloor);
                    resolve(lockersOnFloor);
                }).catch(function (e) {
                    reject("CSV Error: " + e.message);
                });
            }
        });
    }
    static extractClientInfo(filename) {
        let that = this;
        return new Promise(function (resolve, reject) {
            let clientsByFloor = new Map();
            let workbook = new Excel.Workbook();
            let fileType = filename.slice(-4);
            if (fileType.charAt(0) === ".") {
                fileType = fileType.substr(1);
            }
            if (fileType && fileType === "xlsx") {
                workbook.xlsx.readFile(filename)
                    .then(function (file) {
                    that.cellParserForClients(file, clientsByFloor);
                }).catch(function (e) {
                    reject("XLSX Error: " + e.message);
                });
            }
            else if (fileType && fileType === "csv") {
                workbook.csv.readFile(filename)
                    .then(function (file) {
                    that.cellParserForClients(file, clientsByFloor);
                    resolve(clientsByFloor);
                }).catch(function (e) {
                    reject("CSV Error: " + e.message);
                });
            }
        });
    }
    static getColumnIndex(allColumnNames) {
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
    static cellParserForClients(file, clientsByFloor) {
        let that = this;
        let allColumnNames = file._worksheets[1]._rows[0]._cells;
        let columnIndex = that.getColumnIndex(allColumnNames);
        let orders = file._worksheets[1]._rows;
        for (let i = 1; i < orders.legnth; i++) {
            let client = new Client_1.Client(orders[i]._cells[columnIndex.firstName], orders[i]._cells[columnIndex.lastName], parseInt(orders[i]._cells[columnIndex.phoneNumber]), orders[i]._cells[columnIndex.emailAddress], parseInt(orders[i]._cells[columnIndex.studentNumber]), orders[i]._cells[columnIndex.floorPreference], new Date(orders[i]._cells[columnIndex.dateOfPurchase]), orders[i]._cells[columnIndex.lockerPlacement]);
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
    }
    static cellParserForLockers(file, lockersOnFloor) {
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
}
exports.default = ExcelUtils;
//# sourceMappingURL=ExcelUtils.js.map