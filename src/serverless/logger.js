import {configureLogger as genericConfigureLogger, createLogger} from "@randy.tarampi/lambda-logger";
import {createRequire} from "module";

const require = createRequire(import.meta.url);
const packageJson = require("../../package.json");

export const configureLogger = () => genericConfigureLogger(packageJson);

export default createLogger(packageJson);
