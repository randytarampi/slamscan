import {expect} from "chai";
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";
import {scanFile} from "../../../../src/lib/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("clamscan", function () {
    describe("scanFile", function () {
        this.timeout(60000);

        before(function () {
            try {
                if (!fs.existsSync(process.env.SLAMSCAN_CLAMSCAN_DB_PATH) || fs.readdirSync(process.env.SLAMSCAN_CLAMSCAN_DB_PATH).length === 0) {
                    this.skip();
                }
            } catch {
                this.skip();
            }
        });

        it("returns `true` for EICAR-AV-Test", function () {
            const eicarAvTestFile = path.join(__dirname, "../../..", "resources", "EICAR-AV-Test");

            return scanFile(eicarAvTestFile)
                .then(isInfected => {
                    expect(isInfected).to.eql(true);
                });
        });
    });
});
