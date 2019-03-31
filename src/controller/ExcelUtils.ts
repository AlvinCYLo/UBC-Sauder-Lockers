import {Locker} from "./Locker";

const Excel = require("exceljs");

export default class ExcelUtils {

    public static extractExcelLockerInfo(filename: string): Promise<Map<string, any[]>> {
        let that = this;
        return new Promise(function (resolve, reject) {
            let lockersOnFloor = new Map<string, any[]>();
            let workbook = new Excel.Workbook();
            let fileType = filename.slice(-4);
            if (fileType.charAt(0) === ".") {
                fileType = fileType.substr(1);
            }
            if (fileType && fileType === "xlsx") {
                workbook.xlsx.readFile(filename)
                    .then(function (file: any) {
                        //TODO: Fix
                        that.cellParser(file, lockersOnFloor);
                        resolve(lockersOnFloor);

                    }).catch(function () {
                    reject(new Error());
                })
            } else if (fileType && fileType === "csv") {
                workbook.csv.readFile(filename)
                    .then(function (file: any) {
                        that.cellParser(file, lockersOnFloor);
                        resolve(lockersOnFloor)
                    }).catch(function () {
                    reject(new Error());
                })
            }
        });
    }

    private cellParser(file: any, lockersOnFloor: Map<string, any[]>): void {
        file.eachSheet(function (worksheet: any) {
            worksheet.rows.foreach(function (cell: any) {
                let locker = new Locker(cell.value.model.value);
                let floor = locker.getLockerFloor();
                if (lockersOnFloor.has(floor)) {
                    let oldVal = lockersOnFloor.get(floor);
                    oldVal.push(locker);
                    lockersOnFloor.set(floor, oldVal);
                } else {
                    let vals = [locker];
                    lockersOnFloor.set(locker.getLockerFloor(), vals);
                }
            });
        });
    }


}