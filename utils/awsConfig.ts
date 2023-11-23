import { Credentials } from "aws-sdk";
import { AWSError } from "aws-sdk/lib/error";

export const awsConfig: Credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    
    get: function (callback: (err?: AWSError) => void): void {
        throw new Error("Function not implemented.");
    },
    getPromise: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    needsRefresh: function (): boolean {
        throw new Error("Function not implemented.");
    },
    refresh: function (callback: (err?: AWSError) => void): void {
        throw new Error("Function not implemented.");
    },
    refreshPromise: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    expired: false,
    expireTime: undefined
};