import {expect} from "chai";

import ExcelUtils from "../src/controller/ExcelUtils";
import Log from "../src/Util";
import TestUtil from "./TestUtil";

const Excel = require("exceljs");

describe("Locker Assignments Read Excels", function () {
    // Reference any datasets you've added to test/data here and they will
    // automatically be loaded in the Before All hook.
    const excels: { [id: string]: string } = {
        xlsx: "./test/data/Locker.xlsx",
        csv: "./test/data/Locker.csv",
        xls: "./test/data/Locker.xls"
    };

    let excelUtils: ExcelUtils;
    let datasets: { [id: string]: string };

    before(async function () {
        Log.test(`Before: ${this.test.parent.title}`);

        try {
            const loadExcelPromises: Array<Promise<Buffer>> = [];
            var workbook = new Excel.workbook();

            for (const [id, path] of Object.entries(excels)) {
                loadExcelPromises.push(TestUtil.readFileAsync(path));
            }

            const loadedDatasets = (await Promise.all(loadExcelPromises)).map((buf, i) => {
                return {[Object.keys(excels)[i]]: buf.toString("base64")};
            });
            datasets = Object.assign({}, ...loadedDatasets);
            expect(Object.keys(datasets)).to.have.length.greaterThan(0);
        } catch (err) {
            expect.fail("", "", `Failed to read one or load excel sheets. ${JSON.stringify(err)}`);
        }

        try {
            excelUtils = new ExcelUtils();
        } catch (err) {
            Log.error(err);
        } finally {
            expect(excelUtils).to.be.instanceOf(ExcelUtils);
        }
    });

    beforeEach(function () {
        Log.test(`BeforeTest: ${this.currentTest.title}`);
    });

    after(function () {
        Log.test(`After: ${this.test.parent.title}`);
    });

    afterEach(function () {
        Log.test(`AfterTest: ${this.currentTest.title}`);
    });

    it("Read XLSX", async () => {
        let response: Map<string, any[]>
        try {
            response = await ExcelUtils.extractExcelInfo("Locker.xlsx");
        } catch (err) {
            response = err;
        } finally {
            expect(response.size).to.have.length.greaterThan(0);
        }
    });

    it("Read CSV", async () => {
        let response: Map<string, any[]>
        try {
            response = await ExcelUtils.extractExcelInfo("Locker.csv");
        } catch (err) {
            response = err;
        } finally {
            expect(response.size).to.have.length.greaterThan(0);
        }
    });

    it("Can't Read XLS", async () => {
        let response: Map<string, any[]>
        try {
            response = await ExcelUtils.extractExcelInfo("Locker.xls");
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.be.an('error');
        }
    });


});