"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("../src/rest/Server");
const chai_1 = require("chai");
const InsightFacade_1 = require("../src/controller/InsightFacade");
const chai = require("chai");
const chaiHttp = require("chai-http");
const Util_1 = require("../src/Util");
describe("Facade D3", function () {
    let facade = null;
    let server = null;
    const fs = require("fs");
    chai.use(chaiHttp);
    before(function () {
        facade = new InsightFacade_1.default();
        server = new Server_1.default(4321);
        server.start().then(function (started) {
            if (started) {
                Util_1.default.trace("Server Started");
            }
            else {
                Util_1.default.trace("Problem Starting Server");
            }
        }).catch(function (err) {
            Util_1.default.trace(err);
        });
    });
    after(function () {
        server.stop().then(function (stopped) {
            if (stopped) {
                Util_1.default.trace("Server Stopped");
            }
            else {
                Util_1.default.trace("Problem Stopping Server");
            }
        }).catch(function (err) {
            Util_1.default.trace(err);
        });
    });
    beforeEach(function () {
        Util_1.default.test(`BeforeTest: ${this.currentTest.title}`);
    });
    afterEach(function () {
        Util_1.default.test(`After: ${this.test.parent.title}`);
    });
    it("GET test for echo", function () {
        try {
            return chai.request("http://localhost:4321")
                .get("/echo/LMFAO")
                .then(function (res) {
                chai_1.expect(res.body.result).to.be.equal("LMFAO...LMFAO");
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect.fail();
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("GET test for echo v2", function () {
        try {
            return chai.request("http://localhost:4321")
                .get("/echo/" + 1234)
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
            chai_1.expect(err.code).to.be.equal(400);
        }
    });
    it("GET test for echo v3", function () {
        try {
            return chai.request("http://localhost:4321")
                .get("/echo/" + null)
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
            chai_1.expect(err.code).to.be.equal(400);
        }
    });
    it("PUT test for courses dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/dataset/courses/courses")
                .attach("body", fs.readFileSync("./test/data/courses.zip"), "courses.zip")
                .then(function (res) {
                chai_1.expect(res.status).to.be.equal(200);
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect.fail();
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("PUT test for rooms dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/dataset/rooms/rooms")
                .attach("body", fs.readFileSync("./test/data/rooms.zip"), "rooms.zip")
                .then(function (res) {
                chai_1.expect(res.status).to.be.equal(200);
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect.fail();
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("PUT test for small dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/dataset/three/courses")
                .attach("body", fs.readFileSync("./test/data/3.zip"), "3.zip")
                .then(function (res) {
                chai_1.expect(res.status).to.be.equal(200);
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect.fail();
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("PUT test for duplicate dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/dataset/courses/courses")
                .attach("body", fs.readFileSync("./test/data/courses.zip"), "courses.zip")
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect(err.status).to.be.equal(400);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("PUT test for invalid dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/dataset/nocourses/courses")
                .attach("body", fs.readFileSync("./test/data/no-courses.zip"), "no-courses.zip")
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect(err.status).to.be.equal(400);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("PUT test for invalid dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/dataset/coooooources/rooms")
                .attach("body", fs.readFileSync("./test/data/coooooources.zip"), "coooooources.zip")
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect(err.status).to.be.equal(400);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("PUT test for missing param", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/dataset/courses/")
                .attach("body", fs.readFileSync("./test/data/courses.zip"), "coooooources.zip")
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect(err.status).to.be.equal(400);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("PUT test for special chars kind", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/dataset/courses/**__")
                .attach("body", fs.readFileSync("./test/data/courses.zip"), "coooooources.zip")
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect(err.status).to.be.equal(400);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("PUT test for invalid kind type", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/datasets/courses/" + 1234)
                .attach("body", fs.readFileSync("./test/data/courses.zip"), "courses.zip")
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
            chai_1.expect(err.status).to.be.equal(405);
        }
    });
    it("PUT test for invalid id", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/datasets/" + 1234 + "/courses")
                .attach("body", fs.readFileSync("./test/data/courses.zip"), "courses.zip")
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
            chai_1.expect(err.status).to.be.equal(405);
        }
    });
    it("GET test for datasets", function () {
        try {
            return chai.request("http://localhost:4321")
                .get("/datasets")
                .then(function (res) {
                chai_1.expect(res.status).to.be.equal(200);
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect.fail();
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("GET test for invalid param", function () {
        try {
            return chai.request("http://localhost:4321")
                .get("/datasets/")
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect(err.status).to.be.equal(500);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("DELETE test for small dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .del("/dataset/three")
                .then(function (res) {
                chai_1.expect(res.status).to.be.equal(200);
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect.fail();
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("DELETE test for unavailable dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .del("/dataset/courses1")
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect(err.status).to.be.equal(404);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("DELETE test for already deleted dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .del("/dataset/three")
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect(err.status).to.be.equal(404);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("DELETE test for empty string dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .del("/dataset/")
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect(err.status).to.be.equal(400);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("DELETE test for empty dataset string", function () {
        try {
            return chai.request("http://localhost:4321")
                .del("/dataset/ ")
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect(err.status).to.be.equal(400);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("DELETE test for wrong params", function () {
        try {
            return chai.request("http://localhost:4321")
                .del("/datasets/courses")
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect(err.status).to.be.equal(405);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("DELETE test for params types", function () {
        try {
            return chai.request("http://localhost:4321")
                .del("/dataset/" + 1234)
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
            chai_1.expect(err.status).to.be.equal(405);
        }
    });
    it("POST test for q1 query", function () {
        try {
            return chai.request("http://localhost:4321")
                .post("/query")
                .send({
                WHERE: {
                    NOT: {
                        NOT: {
                            GT: {
                                courses_avg: 97
                            }
                        }
                    }
                },
                OPTIONS: {
                    COLUMNS: [
                        "courses_dept",
                        "courses_avg"
                    ],
                    ORDER: "courses_avg"
                }
            })
                .then(function (res) {
                chai_1.expect(res.status).to.be.equal(200);
            })
                .catch(function (err) {
                Util_1.default.trace(err);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("POST test for q1 query", function () {
        try {
            return chai.request("http://localhost:4321")
                .post("/querys")
                .send({
                OPTIONS: {
                    COLUMNS: [
                        "courses_dept",
                        "courses_avg"
                    ],
                    ORDER: "courses_avg"
                }
            })
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                Util_1.default.trace(err);
                chai_1.expect(err.status).to.be.equal(405);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
    it("POST test for query, wrong param", function () {
        try {
            return chai.request("http://localhost:4321")
                .post("/query")
                .send({
                OPTIONS: {
                    COLUMNS: [
                        "courses_dept",
                        "courses_avg"
                    ],
                    ORDER: "courses_avg"
                }
            })
                .then(function (res) {
                chai_1.expect.fail();
            })
                .catch(function (err) {
                chai_1.expect(err.status).to.be.equal(400);
            });
        }
        catch (err) {
            Util_1.default.trace(err);
        }
    });
});
//# sourceMappingURL=Server.spec.js.map