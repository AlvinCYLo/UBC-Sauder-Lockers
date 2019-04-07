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
const chai_1 = require("chai");
const ExcelUtils_1 = require("../src/controller/ExcelUtils");
const Util_1 = require("../src/Util");
const TestUtil_1 = require("./TestUtil");
const LockerSystem_1 = require("../src/controller/LockerSystem");
const Excel = require("exceljs");
describe("Locker Assignments Read Excels", function () {
    const excels = {
        xlsx: "./test/data/Lockers.xlsx",
        csv: "./test/data/Lockers.csv",
        xls: "./test/data/Lockers.xls"
    };
    let excelUtils;
    let ls;
    let datasets;
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            Util_1.default.test(`Before: ${this.test.parent.title}`);
            try {
                const loadExcelPromises = [];
                for (const [id, path] of Object.entries(excels)) {
                    loadExcelPromises.push(TestUtil_1.default.readFileAsync(path));
                }
                const loadedDatasets = (yield Promise.all(loadExcelPromises)).map((buf, i) => {
                    return { [Object.keys(excels)[i]]: buf.toString("base64") };
                });
                datasets = Object.assign({}, ...loadedDatasets);
                chai_1.expect(Object.keys(datasets)).to.have.length.greaterThan(0);
            }
            catch (err) {
                chai_1.expect.fail("", "", `Failed to read one or load excel sheets. ${JSON.stringify(err)}`);
            }
            try {
                excelUtils = new ExcelUtils_1.default();
                ls = new LockerSystem_1.default();
            }
            catch (err) {
                Util_1.default.error(err);
            }
            finally {
                chai_1.expect(excelUtils).to.be.instanceOf(ExcelUtils_1.default);
            }
        });
    });
    beforeEach(function () {
        Util_1.default.test(`BeforeTest: ${this.currentTest.title}`);
    });
    after(function () {
        Util_1.default.test(`After: ${this.test.parent.title}`);
    });
    afterEach(function () {
        Util_1.default.test(`AfterTest: ${this.currentTest.title}`);
    });
    it("Lockers: Read XLSX", () => __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            response = yield ExcelUtils_1.default.extractLockerInfo("./test/data/Lockers.xlsx");
        }
        catch (err) {
            response = err;
        }
        finally {
            chai_1.expect(response).to.be.equal(new Map());
        }
    }));
    it("Lockers: Read CSV", () => __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            response = yield ExcelUtils_1.default.extractLockerInfo("./test/data/Lockers.csv");
        }
        catch (err) {
            response = err;
        }
        finally {
            chai_1.expect(response.size).to.be.equal(new Map());
        }
    }));
    it("Clients: Read XLSX", () => __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            response = yield ExcelUtils_1.default.extractClientInfo("./test/data/Clients.xlsx");
        }
        catch (err) {
            response = err;
        }
        finally {
            chai_1.expect(response).to.be.equal(new Map());
        }
    }));
    it("Locker System Clients", () => __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            response = yield ls.getAllClients("./test/data/Clients.xlsx");
        }
        catch (err) {
            response = err;
        }
        finally {
            chai_1.expect(response).to.be.equal(new Map());
        }
    }));
    it("Locker System Lockers", () => __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            response = yield ls.getAvailableLockers("./test/data/Lockers.xlsx");
        }
        catch (err) {
            response = err;
        }
        finally {
            chai_1.expect(response).to.be.equal(new Map());
        }
    }));
});
//# sourceMappingURL=LockerAssignmentSpec.js.map