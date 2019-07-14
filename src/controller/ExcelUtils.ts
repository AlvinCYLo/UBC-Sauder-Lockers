import {Locker} from "./Locker";
import {Client} from "./Client";

const Excel = require("exceljs");

export default class ExcelUtils {

    public extractLockerInfo(filename: string): Promise<Map<string, Locker[]>> {
        let that = this;
        return new Promise(async function (resolve, reject) {
            let lockersOnFloor = new Map<string, any[]>();
            let workbook = new Excel.Workbook();

            if (filename && filename.endsWith(".xlsx")) {
                let file = await workbook.xlsx.readFile(filename);
                that.cellParserForLockers(file, lockersOnFloor);
                resolve(lockersOnFloor);

            } else if (filename && filename.endsWith(".csv")) {
                let file = await workbook.csv.readFile(filename);
                that.cellParserForLockers(file, lockersOnFloor);
                resolve(lockersOnFloor);
            }
        });
    }


    public extractClientInfo(filename: string): Promise<Map<string, Client[]>> {
        let that = this;
        return new Promise(async function (resolve, reject) {
            let clientsByFloor = new Map<string, any[]>();
            let workbook = new Excel.Workbook();

            if (filename && filename.endsWith(".xlsx")) {
                let file = await workbook.xlsx.readFile(filename);
                that.cellParserForClients(file, clientsByFloor);
                resolve(clientsByFloor);

            } else if (filename && filename.endsWith(".csv")) {
                let file = await workbook.xlsx.readFile(filename);
                that.cellParserForClients(file, clientsByFloor);
                resolve(clientsByFloor);
            }
        });
    }

    private getColumnIndex(allColumnNames: any[]): any {
        let columnIndexes: any = {};

        // indexes for possibly changing excel columns
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

    private cellParserForClients(file: any, clientsByFloor: Map<string, Client[]>): void {
        let that = this;
        let allColumnNames = file._worksheets[1]._rows[0]._cells;
        let columnIndex: any = that.getColumnIndex(allColumnNames);
        let orders = file._worksheets[1]._rows;
        orders.forEach(function (order: any, i: number) {
            if (i !== 0) {
                let client = new Client(orders[i]._cells[columnIndex.firstName]._value.value, orders[i]._cells[columnIndex.lastName]._value.value,
                    parseInt(orders[i]._cells[columnIndex.phoneNumber]._value.value), orders[i]._cells[columnIndex.emailAddress]._value.value,
                    parseInt(orders[i]._cells[columnIndex.studentNumber]._value.value), orders[i]._cells[columnIndex.floorPreference]._value.value,
                    new Date(orders[i]._cells[columnIndex.dateOfPurchase]._value.value), orders[i]._cells[columnIndex.lockerPlacement]._value.value);
                let floorPref = client.getFloorPreference();
                if (clientsByFloor.has(floorPref)) {
                    let oldVal = clientsByFloor.get(floorPref);
                    oldVal.push(client);
                    clientsByFloor.set(floorPref, oldVal);
                } else {
                    clientsByFloor.set(floorPref, [client]);
                }
            }
        });
    }

    private cellParserForLockers(file: any, lockersOnFloor: Map<string, Locker[]>): void {
        file.worksheets.forEach(function (worksheet: any) {
            worksheet._rows.forEach(function (cell: any) {
                let locker = new Locker(cell._cells[0]._value.model.value);
                let floor = locker.getLockerFloor();
                if (lockersOnFloor.has(floor)) {
                    let oldVal = lockersOnFloor.get(floor);
                    oldVal.push(locker);
                    lockersOnFloor.set(floor, oldVal);
                } else {
                    lockersOnFloor.set(locker.getLockerFloor(), [locker]);
                }
            });
        });
    }

    public publishLockerAssignments(filename: string, assignments: Map<Client, Locker[]>): Promise<string> {
        return new Promise( async function(resolve, reject){
            let workbook = Excel.createAndFillWorkbook();
            workbook.xlsx.writeFile(filename)
                .then(function() {
                    let allAssignments = assignments.values();
                    let next = allAssignments.next().value;
                    while(next){
                        next.forEach((ass) => {

                        });
                    }

                });
        });

    }

}


