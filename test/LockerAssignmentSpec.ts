import { expect } from "chai";

import Main from "../src/controller/Main";
import Log from "../src/Util";
import TestUtil from "./TestUtil";

const assert = require("assert");

describe("InsightFacade Add/Remove Dataset", function () {
    // Reference any datasets you've added to test/data here and they will
    // automatically be loaded in the Before All hook.
    const datasetsToLoad: { [id: string]: string } = {
        courses: "./test/data/courses.zip",
        somevalid: "./test/data/somevalid.zip",
        blank: "./test/data/blank.zip",
        courses2: "./test/data/courses2.zip",
        notzip: "./test/data/courses.txt",
        nocourses: "./test/data/no-courses.zip",
        nothingincourse: "./test/data/nothingincourses.zip",
        onlyinvalid: "./test/data/onlyinvalid.zip",
        invalidjson: "./test/data/invalidjson.zip",
        three: "./test/data/3.zip",
        courses1: "./test/data/courses1.zip",
        // nullkeys: "./test/data/nullkeys.zip",
        missingkeys: "./test/data/missingkeys.zip",
        nullmissingvals: "./test/data/nullmissingvals.zip",
        rooms: "./test/data/rooms.zip"
    };

    let insightFacade: InsightFacade;
    let datasets: { [id: string]: string };

    before(async function () {
        Log.test(`Before: ${this.test.parent.title}`);

        try {
            const loadDatasetPromises: Array<Promise<Buffer>> = [];
            for (const [id, path] of Object.entries(datasetsToLoad)) {
                loadDatasetPromises.push(TestUtil.readFileAsync(path));
            }
            const loadedDatasets = (await Promise.all(loadDatasetPromises)).map((buf, i) => {
                return { [Object.keys(datasetsToLoad)[i]]: buf.toString("base64") };
            });
            datasets = Object.assign({}, ...loadedDatasets);
            expect(Object.keys(datasets)).to.have.length.greaterThan(0);
        } catch (err) {
            expect.fail("", "", `Failed to read one or load excel sheets. ${JSON.stringify(err)}`);
        }

        try {
            insightFacade = new InsightFacade();
        } catch (err) {
            Log.error(err);
        } finally {
            expect(insightFacade).to.be.instanceOf(InsightFacade);
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

    it("Should print empty array of datasets", async () => {
        let response: InsightDataset[];

        try {
            response = await insightFacade.listDatasets();
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.deep.equal([]);
        }
    });

    it("Should add a valid dataset", async () => {
        const id: string = "courses";
        let response: string[];

        try {
            response = await insightFacade.addDataset(id, datasets[id], InsightDatasetKind.Courses);
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.deep.equal([id]);
        }
    });

    it("Should print an array with 1 dataset", async () => {
        let response: InsightDataset[];

        try {
            response = await insightFacade.listDatasets();
        } catch (err) {
            response = err;
        } finally {
            expect(response).to.deep.equal([{
                id: "courses",
                kind: InsightDatasetKind.Courses,
                numRows: 64612,
            }]);
        }
    });
});