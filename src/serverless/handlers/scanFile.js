import downloadAndScanFileForS3RecordModule from "../../lib/downloadAndScanFileForS3Record.js";
import downloadClamscanDbFilesFromS3Module from "../../lib/downloadClamscanDbFilesFromS3.js";
import logger from "../logger.js";
import {configureEnvironment} from "../util/configureEnvironment.js";
import {returnErrorResponse} from "../util/returnErrorResponse.js";

export const handler = (event, context, callback) => {
    logger.debug("%s@%s handling request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);

    configureEnvironment()
        .then(() => downloadClamscanDbFilesFromS3Module.downloadClamscanDbFilesFromS3())
        .then(() => Promise.all(event.Records.map(downloadAndScanFileForS3RecordModule.downloadAndScanFileForS3Record)))
        .then(() => callback(null))
        .catch(returnErrorResponse(event, context, callback));
};

export default handler;
