import {returnErrorResponseForLogger} from "@randy.tarampi/serverless";
import logger from "../logger.js";

export const returnErrorResponse = returnErrorResponseForLogger(logger);

export default returnErrorResponse;
