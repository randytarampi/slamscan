import childProcess from "child_process";
import md5 from "md5";
import path from "path";
import logger from "../serverless/logger.js";
import clamscan from "./clamscan.js";
import cleanupTempFiles from "./util/cleanupTempFiles.js";
import createTempDirectory from "./util/createTempDirectory.js";
import getTagsForFileInBucket from "./util/getTagsForFileInBucket.js";
import readFile from "./util/readFile.js";
import uploadFileToBucket from "./util/uploadFileToBucket.js";
import {S3_FILE_CONTENT_MD5_TAG} from "./constants.js";

export const downloadClamscanDbFilesFromFreshclam = directory => new Promise((resolve, reject) => {
    const command = [
        process.env.SLAMSCAN_FRESHCLAM_BINARY_PATH,
        "--config-file=$SLAMSCAN_FRESHCLAM_CONFIG_PATH",
        "--user=$(whoami)",
        `--datadir=${directory}`
    ].join(" ");

    childProcess.exec(command, (error, stdout, stderr) => {
        if (stdout) {
            logger.info("stdout received from %s", command, stdout);
        }
        if (stderr) {
            logger.error("stderr received from %s", command, stderr);
        }

        if (error) {
            return reject(error);
        }

        resolve();
    });
});

export const uploadClamscanDbFile = (tempDirectory, dbFilename) => {
    const dbFilePath = path.join(tempDirectory, dbFilename);
    return uploadFileToBucket.uploadFileToBucket(process.env.SLAMSCAN_CLAMSCAN_DB_BUCKET, dbFilename, dbFilePath);
};

export const uploadClamscanDbFileIfNecessary = (tempDirectory, dbFilename) => Promise.all([
        readFile.readFile(path.join(tempDirectory, dbFilename)),
        getTagsForFileInBucket.getTagsForFileInBucket(process.env.SLAMSCAN_CLAMSCAN_DB_BUCKET, dbFilename)
            .then(tags => {
                const md5Tag = tags.find(tag => tag.Key === S3_FILE_CONTENT_MD5_TAG);

                return md5Tag && md5Tag.Value;
            })
            .catch(error => {
                if (error.message.indexOf("The specified key does not exist") > -1) {
                    return;
                }

                throw error;
            })
    ])
    .then(([downloadedDbFile, bucketDbFileMd5]) => {
        const downloadedDbFileMd5 = md5(downloadedDbFile);

        if (!bucketDbFileMd5 || bucketDbFileMd5 !== downloadedDbFileMd5) {
            return uploadClamscanDbFile(tempDirectory, dbFilename);
        }

        return path.join(tempDirectory, dbFilename);
    });

export const updateClamscanDbFiles = () => createTempDirectory.createTempDirectory()
    .then(tempDirectory => {
        return downloadClamscanDbFilesFromFreshclam(tempDirectory)
            .then(() => Promise.all(clamscan.CLAMSCAN_DB_FILES.map(dbFilename => uploadClamscanDbFileIfNecessary(tempDirectory, dbFilename))))
            .then(() => cleanupTempFiles.cleanupTempFiles());
    });

export default updateClamscanDbFiles;
