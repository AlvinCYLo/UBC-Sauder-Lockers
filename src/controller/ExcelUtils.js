"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Locker_1 = require("./Locker");
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
                    that.cellParser(file, lockersOnFloor);
                    resolve(lockersOnFloor);
                }).catch(function () {
                    reject(new Error());
                });
            }
            else if (fileType && fileType === "csv") {
                workbook.csv.readFile(filename)
                    .then(function (file) {
                    that.cellParser(file, lockersOnFloor);
                    resolve(lockersOnFloor);
                }).catch(function () {
                    reject(new Error());
                });
            }
        });
    }
    cellParser(file, lockersOnFloor) {
        file.eachSheet(function (worksheet) {
            worksheet.rows.foreach(function (cell) {
                let locker = new Locker_1.Locker(cell.value.model.value);
                let floor = locker.getLockerFloor();
                if (lockersOnFloor.has(floor)) {
                    let oldVal = lockersOnFloor.get(floor);
                    oldVal.push(locker);
                    lockersOnFloor.set(floor, oldVal);
                }
                else {
                    let vals = [locker];
                    lockersOnFloor.set(locker.getLockerFloor(), vals);
                }
            });
        });
    }
}
exports.default = ExcelUtils;
//# sourceMappingURL=ExcelUtils.js.map