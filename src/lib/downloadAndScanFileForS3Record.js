import path from "path";
import temp from "temp";
import clamscan from "./clamscan.js";
import cleanupTempFiles from "./util/cleanupTempFiles.js";
import downloadFileFromBucket from "./util/downloadFileFromBucket.js";
import notifySns from "./util/notifySns.js";
import putTagsOnS3Object from "./util/putTagsOnS3Object.js";
import {
    S3_FILE_CONTENT_SCAN_END_TAG,
    S3_FILE_CONTENT_SCAN_IS_INFECTED_TAG,
    S3_FILE_CONTENT_SCAN_START_TAG
} from "./util/index.js";

export const downloadAndScanFileForS3Record = record => {
    const bucket = record.s3.bucket.name;
    const key = record.s3.object.key;
    const file = temp.path({suffix: path.extname(key)});

    return Promise.all([
            downloadFileFromBucket.downloadFileFromBucket(bucket, key, file),
            putTagsOnS3Object.putTagsOnS3Object(bucket, key, {
                [S3_FILE_CONTENT_SCAN_START_TAG]: new Date().toISOString()
            })
        ])
        .then(([localFilePath]) => clamscan.scanFile(localFilePath))
        .then(isInfected => Promise.all([
            notifySns.notifySns(process.env.SLAMSCAN_SCAN_RESULT_SNS_ARN, JSON.stringify({
                Bucket: bucket,
                uri: `s3://${bucket}/${key}`,
                isInfected: isInfected
            })),
            putTagsOnS3Object.putTagsOnS3Object(bucket, key, {
                [S3_FILE_CONTENT_SCAN_END_TAG]: new Date().toISOString(),
                [S3_FILE_CONTENT_SCAN_IS_INFECTED_TAG]: isInfected
            })
        ]))
        .then(() => cleanupTempFiles.cleanupTempFiles());
};

export default downloadAndScanFileForS3Record;
