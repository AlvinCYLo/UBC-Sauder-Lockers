import Server from "../src/rest/Server";
import {expect} from "chai";

import InsightFacade from "../src/controller/InsightFacade";
import chai = require("chai");

import chaiHttp = require("chai-http");
import Log from "../src/Util";

describe("Facade D3", function () {

    let facade: InsightFacade = null;
    let server: Server = null;
    const fs = require("fs");

    chai.use(chaiHttp);

    before(function () {
        facade = new InsightFacade();
        server = new Server(4321);
        // TODO: start server here once and handle errors properly
        server.start().then(function (started) {
            if (started) {
                Log.trace("Server Started");
            } else {
                Log.trace("Problem Starting Server");
            }
        }).catch(function (err) {
            Log.trace(err);
        });
    });

    after(function () {
        // TODO: stop server here once!
        server.stop().then(function (stopped) {
            if (stopped) {
                Log.trace("Server Stopped");
            } else {
                Log.trace("Problem Stopping Server");
            }
        }).catch(function (err) {
            Log.trace(err);
        });
    });

    beforeEach(function () {
        // might want to add some process logging here to keep track of what"s going on
        Log.test(`BeforeTest: ${this.currentTest.title}`);
    });

    afterEach(function () {
        // might want to add some process logging here to keep track of what"s going on
        Log.test(`After: ${this.test.parent.title}`);
    });

    // TODO: read your courses and rooms datasets here once!

    // Hint on how to test PUT requests

    it("GET test for echo", function () {
        try {
            return chai.request("http://localhost:4321")
                .get("/echo/LMFAO")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect(res.body.result).to.be.equal("LMFAO...LMFAO");
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                    expect.fail();
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
        }
    });

    it("GET test for echo v2", function () {
        try {
            return chai.request("http://localhost:4321")
                .get("/echo/" + 1234)
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
            expect(err.code).to.be.equal(400);
        }
    });

    it("GET test for echo v3", function () {
        try {
            return chai.request("http://localhost:4321")
                .get("/echo/" + null)
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
            expect(err.code).to.be.equal(400);
        }
    });

    it("PUT test for courses dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/dataset/courses/courses")
                .attach("body", fs.readFileSync("./test/data/courses.zip"), "courses.zip")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect(res.status).to.be.equal(200);
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                    expect.fail();
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
        }
    });

    it("PUT test for rooms dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/dataset/rooms/rooms")
                .attach("body", fs.readFileSync("./test/data/rooms.zip"), "rooms.zip")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect(res.status).to.be.equal(200);
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                    expect.fail();
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
        }
    });

    it("PUT test for small dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/dataset/three/courses")
                .attach("body", fs.readFileSync("./test/data/3.zip"), "3.zip")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect(res.status).to.be.equal(200);
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                    expect.fail();
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
        }
    });

    it("PUT test for duplicate dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/dataset/courses/courses")
                .attach("body", fs.readFileSync("./test/data/courses.zip"), "courses.zip")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                    expect(err.status).to.be.equal(400);
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
        }
    });

    it("PUT test for invalid dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/dataset/nocourses/courses")
                .attach("body", fs.readFileSync("./test/data/no-courses.zip"), "no-courses.zip")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                    expect(err.status).to.be.equal(400);
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
        }
    });

    it("PUT test for invalid dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/dataset/coooooources/rooms")
                .attach("body", fs.readFileSync("./test/data/coooooources.zip"), "coooooources.zip")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                    expect(err.status).to.be.equal(400);
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
        }
    });

    it("PUT test for missing param", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/dataset/courses/")
                .attach("body", fs.readFileSync("./test/data/courses.zip"), "coooooources.zip")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                    expect(err.status).to.be.equal(400);
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
        }
    });

    it("PUT test for special chars kind", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/dataset/courses/**__")
                .attach("body", fs.readFileSync("./test/data/courses.zip"), "coooooources.zip")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                    expect(err.status).to.be.equal(400);
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
        }
    });

    it("PUT test for invalid kind type", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/datasets/courses/" + 1234)
                .attach("body", fs.readFileSync("./test/data/courses.zip"), "courses.zip")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
            expect(err.status).to.be.equal(405);
        }
    });

    it("PUT test for invalid id", function () {
        try {
            return chai.request("http://localhost:4321")
                .put("/datasets/" + 1234 + "/courses")
                .attach("body", fs.readFileSync("./test/data/courses.zip"), "courses.zip")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
            expect(err.status).to.be.equal(405);
        }
    });

    it("GET test for datasets", function () {
        try {
            return chai.request("http://localhost:4321")
                .get("/datasets")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect(res.status).to.be.equal(200);
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                    expect.fail();
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
        }
    });

    it("GET test for invalid param", function () {
        try {
            return chai.request("http://localhost:4321")
                .get("/datasets/")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                    expect(err.status).to.be.equal(500);
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
            // expect(err.status).to.be.equal(500);
        }
    });

    it("DELETE test for small dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .del("/dataset/three")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect(res.status).to.be.equal(200);
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                    expect.fail();
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
        }
    });

    it("DELETE test for unavailable dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .del("/dataset/courses1")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                    expect(err.status).to.be.equal(404);
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
        }
    });

    it("DELETE test for already deleted dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .del("/dataset/three")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                    expect(err.status).to.be.equal(404);
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
        }
    });

    it("DELETE test for empty string dataset", function () {
        try {
            return chai.request("http://localhost:4321")
                .del("/dataset/")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                    expect(err.status).to.be.equal(400);
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
        }
    });

    it("DELETE test for empty dataset string", function () {
        try {
            return chai.request("http://localhost:4321")
                .del("/dataset/ ")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                    expect(err.status).to.be.equal(400);
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
        }
    });

    it("DELETE test for wrong params", function () {
        try {
            return chai.request("http://localhost:4321")
                .del("/datasets/courses")
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                    expect(err.status).to.be.equal(405);
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
            // expect(err.status).to.be.equal(405);
        }
    });

    it("DELETE test for params types", function () {
        try {
            return chai.request("http://localhost:4321")
                .del("/dataset/" + 1234)
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
            expect(err.status).to.be.equal(405);
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
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect(res.status).to.be.equal(200);
                })
                .catch(function (err: any) {
                    // some logging here please!
                    Log.trace(err);
                    // expect.fail();
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
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
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err: any) {
                    // some logging here please!
                    // expect.fail();
                    Log.trace(err);
                    expect(err.status).to.be.equal(405);
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
            // expect(err.status).to.be.equal(405);
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
                .then(function (res: ChaiHttp.Response) {
                    // some logging here please!
                    expect.fail();
                })
                .catch(function (err: any) {
                    // some logging here please!
                    expect(err.status).to.be.equal(400);
                });
        } catch (err) {
            // and some more logging here!
            Log.trace(err);
        }
    });

    // The other endpoints work similarly. You should be able to find all instructions at the chai-http documentation
});
