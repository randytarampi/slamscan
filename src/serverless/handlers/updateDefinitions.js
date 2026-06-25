import updateClamscanDbFilesModule from "../../lib/updateClamscanDbFiles.js";
import logger from "../logger.js";
import {configureEnvironment} from "../util/configureEnvironment.js";
import {returnErrorResponse} from "../util/returnErrorResponse.js";

export const handler = (event, context, callback) => {
    logger.debug("%s@%s handling request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);

    configureEnvironment()
        .then(() => updateClamscanDbFilesModule.updateClamscanDbFiles())
        .then(() => callback(null))
        .catch(returnErrorResponse(event, context, callback));
};

export default handler;
