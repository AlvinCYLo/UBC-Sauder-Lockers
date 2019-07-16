import * as fs from "fs";
export default class TestUtil {

    /**
     * Wraps readFile in a promise.
     * @param path The location of the file to read.
     * @returns A buffer containing the contents of the file.
     */
    public static readFileAsync(path: string): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(err);
                }

                resolve(data);
            });
        });
    }

}