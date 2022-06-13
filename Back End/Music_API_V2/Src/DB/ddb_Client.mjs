// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// const REGION = "localhost";

// const ddbClient = new DynamoDBClient({
//     accessKeyId: 'Brent',
//     secretAccessKey: 'BrentKey',
//     region: "localhost",
//     endpoint: 'http://localhost:8000',
//   });

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// Set the AWS Region.
const REGION = "localhost"; //e.g. "us-east-1"
// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({
       accessKeyId: 'Brent',
       secretAccessKey: 'BrentKey',
       region: "localhost",
       endpoint: 'http://localhost:8000',
     });
export { ddbClient };
  // export { ddbClient };