// Import required AWS SDK clients and commands for Node.js
import { BatchWriteItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./ddb_Client.mjs";

// Set the parameters
export const params = {
  RequestItems: {
    Tools: [
      {
        PutRequest: {
          Item: {
            Tool: { S: "Tool1" },
            Name: { S: "Drill" },
            Department: { S: "Electrical" },
            Location: { S: "A1" },
            Image:{S: "Horror"},
          },
        },
      },
      {
        PutRequest: {
          Item: {
            Tool: { S: "Tool2" },
            Name: { S: "Drill" },
            Department: { S: "Electrical" },
            Location: { S: "A1" },
            Image:{S: "Horror"},
          },
        },
      },
      {
        PutRequest: {
          Item: {
            Tool: { S: "Tool3" },
            Name: { S: "Drill" },
            Department: { S: "Electrical" },
            Location: { S: "A1" },
            Image:{S: "Horror"},
          },
        },
      },
      {
        PutRequest: {
          Item: {
            Tool: { S: "Tool4" },
            Name: { S: "Drill" },
            Department: { S: "Electrical" },
            Location: { S: "A1" },
            Image:{S: "Horror"},
          },
        },
      },
    ],
  },
};

export const run = async () => {
  try {
    const data = await ddbClient.send(new BatchWriteItemCommand(params));
    console.log("Success, items inserted", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
run();
