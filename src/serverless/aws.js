import {configureAwsSdk} from "@randy.tarampi/serverless";
import AWS from "aws-sdk";
import logger from "./logger.js";

export const Aws = configureAwsSdk(logger).captureAWS(AWS);

export default Aws;
