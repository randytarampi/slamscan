import Aws from "../../serverless/aws.js";

export const notifySns = (topicArn, message) => new Aws.SNS()
    .publish({
        TopicArn: topicArn,
        Message: message
    })
    .promise();

export default {
    notifySns
};
