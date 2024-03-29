import ExcelUtils from "../src/controller/ExcelUtils";
import Log from "../src/Util";
import LockerSystem from "../src/controller/LockerSystem";

import {expect} from "chai";
import TestUtil from "./TestUtil";

const Excel = require("exceljs");

describe("Locker Assignments Read Excels", function () {
    // Reference any datasets you've added to test/data here and they will
    // automatically be loaded in the Before All hook.
    const excels: { [id: string]: string } = {
        xlsx: "./test/data/Lockers.xlsx",
        csv: "./test/data/Lockers.csv",
        xls: "./test/data/Lockers.xls"
    };

    let excelUtils: ExcelUtils;
    let ls: LockerSystem;
    let datasets: { [id: string]: string };

    before(async function () {
        Log.test(`Before: ${this.test.parent.title}`);

        try {
            const loadExcelPromises: Array<Promise<Buffer>> = [];

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
            ls = new LockerSystem();
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

    it("Lockers: Read XLSX", async () => {
        let response: Map<string, any[]>;
        try {
            response = await excelUtils.extractLockerInfo("./test/data/Lockers.xlsx");
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.be.equal(new Map<string, any[]>());
        }
    });

    it("Lockers: Read CSV", async () => {
        let response: Map<string, any[]>;
        try {
            response = await excelUtils.extractLockerInfo("./test/data/Lockers.csv");
        } catch (err) {
            response = err;
        } finally {
            expect(response.size).to.be.equal(new Map<string, any[]>());
        }
    });

    it("Clients: Read XLSX", async () => {
        let response: Map<string, any[]>;
        try {
            response = await excelUtils.extractClientInfo("./test/data/Clients.xlsx");
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.be.equal(new Map<string, any[]>());
        }
    });


    it("Locker System Clients", async () => {
        let response: any;
        try {
            response = await ls.getAllClients("./test/data/Clients.xlsx");
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.be.equal(new Map<string, any[]>());
        }
    });

    it("Locker System Lockers", async () => {
        let response: any;
        try {
            response = await ls.getAvailableLockers("./test/data/Lockers.xlsx");
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.be.equal(new Map<string, any[]>());
        }
    });

    it("Locker System Assignment and Publish", async () => {
        let response: any;
        try {
            await ls.getAvailableLockers("./test/data/Lockers.xlsx");
            await ls.getAllClients("./test/data/Clients.xlsx");
            ls.makeAssignments();
            let a = ls.searchLockerByStudentNumber('69759074');
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.be.equal(new Map<string, any[]>());
        }
    });

});