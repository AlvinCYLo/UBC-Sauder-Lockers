"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class TestUtil {
    static readFileAsync(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
}
exports.default = TestUtil;
//# sourceMappingURL=TestUtil.js.map