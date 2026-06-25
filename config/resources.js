import {S3_FILE_CONTENT_SCAN_IS_INFECTED_TAG} from "../src/lib/constants.js";

export const s3BucketPolicyForSourceBucketName = sourceBucketName => {
    return {
        Type: "AWS::S3::BucketPolicy",
        Properties: {
            Bucket: sourceBucketName,
            PolicyDocument: {
                Version: new Date().toISOString(),
                Statement: [
                    {
                        Effect: "Deny",
                        NotPrincipal: {
                            AWS: [
                                {"Fn::Join": ["", ["arn:aws:iam:::", {Ref: "AWS::AccountId"}, ":role/", {Ref: "IamRoleLambdaExecution"}]]},
                                {"Fn::Join": ["", ["arn:aws:iam:::", {Ref: "AWS::AccountId"}, ":root"]]},
                                {"Fn::Join": ["", ["arn:aws:sts:::", {Ref: "AWS::AccountId"}, ":assumed-role/", {Ref: "IamRoleLambdaExecution"}, "/", {Ref: "IamRoleLambdaExecution"}]]}
                            ]
                        },
                        Action: "s3:GetObject",
                        Resource: `arn:aws:s3:::${sourceBucketName}/*`,
                        Condition: {
                            StringNotEquals: {
                                [`s3:ExistingObjectTag/${S3_FILE_CONTENT_SCAN_IS_INFECTED_TAG}`]: "false"
                            }
                        }
                    },
                    {
                        Effect: "Deny",
                        Action: ["s3:GetObject", "s3:PutObjectTagging"],
                        Principal: "*",
                        Resource: `arn:aws:s3:::${sourceBucketName}/*`,
                        Condition: {
                            StringEquals: {
                                [`s3:ExistingObjectTag/${S3_FILE_CONTENT_SCAN_IS_INFECTED_TAG}`]: "true"
                            }
                        }
                    }
                ]
            }
        }
    };
};

export default () => {
    const sourceBuckets = process.env.SLAMSCAN_SPACE_DELIMITED_SOURCE_BUCKETS && process.env.SLAMSCAN_SPACE_DELIMITED_SOURCE_BUCKETS.split(" ") || [];
    const resources = {
        SNSTopicScanResult: {
            Type: "AWS::SNS::Topic",
            Properties: {
                DisplayName: "${self:service}-${self:provider.stage}-scan-result",
                TopicName: "${self:service}-${self:provider.stage}-scan-result"
            }
        },
        S3BucketScanDb: {
            Type: "AWS::S3::Bucket",
            Properties: {
                BucketName: "${self:provider.environment.SLAMSCAN_CLAMSCAN_DB_BUCKET}"
            }
        },
        SNSTopicLambdaDeadLetterQueue: {
            Type: "AWS::SNS::Topic",
            Properties: {
                DisplayName: "${self:service}-${self:provider.stage}-lambda-dlq",
                TopicName: "${self:service}-${self:provider.stage}-lambda-dlq"
            }
        }
    };

    sourceBuckets.forEach(sourceBucketName => {
        resources[`S3BucketPolicy${sourceBucketName}-slamscan`] = s3BucketPolicyForSourceBucketName(sourceBucketName);
    });

    return {
        Resources: resources
    };
};
