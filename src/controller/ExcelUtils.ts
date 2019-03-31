const Excel = require("exceljs");

export class ExcelUtils {

    public static extractExcelInfo(filename: string): Map<string, any[]> {
        let lockersOnFloor = new Map<string, any[]>();
        let workbook = new Excel.workbook();
        let fileType = filename.split(".")[1];

        if (fileType && fileType === "xlsx") {
            workbook.xlsx.readFile(filename)
                .then(function (file: any) {
                    
                })
        } else if (fileType && fileType === "csv") {
            workbook.csv.readFile(filename)
                .then(function (file: any) {

                })
        }


        return lockersOnFloor;
    }

}