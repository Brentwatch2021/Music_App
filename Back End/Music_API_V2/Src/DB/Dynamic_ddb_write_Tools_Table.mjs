// Import required AWS SDK clients and commands for Node.js
import { BatchWriteItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./ddb_Client.mjs";



//  ProvisionedThroughput: {
//     ReadCapacityUnits: 1,
//     WriteCapacityUnits: 1,
//   },
// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html
// https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_ProvisionedThroughput.html
// Investigate the values above to see why more than one tool cant be created


let new_tool_meta = {};
new_tool_meta.Tool_ID = "howzitmychinaTookhosadsdassdsdwjl1jhg0";
new_tool_meta.Tool_Name = "Monitor";
new_tool_meta.Tool_Department = "Electrical";
new_tool_meta.Tool_Location = "A2";
new_tool_meta.Tool_Image_URL = "https://nsbv1.s3.af-south-1.amazonaws.com/Parts/WhatsApp%20Image%202022-05-24%20at%2012.55.04%20PM.jpeg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMiJGMEQCIFXVdvL19pHDPO23Hz9Y2rWYnDfYNrusu496rrp34I66AiAPWrLWih4BnZ8PLeQrZ6C0oNZ78ruQg0ompyfxIgKDeCrtAgiR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDM5OTY3NTc3NDgwMiIMpd5BLlIyHb%2F9oMFMKsECHDngwtVgSr8VrXQx%2BKvdWZUGf%2BKMXz7GVqaqAoqZnSgCRA%2Fm%2BNBVxmXNL24rJa7o2bo3jrbej%2F6UyOuCzB464S5rBHBHEp17NBJybWWVhFqdglMc3FsVNnlBYY5WfVe2cWga1HjjONXU%2BLNjJHNlPFuAC6C3iB5w1y%2F1Zyn6yeon9mMYCzW341VSncbtRYRMo6GAQs6PtKSSSVYqDuX1HRQzAWLPgPtqLb0HSqOaOmwm5Yn74Eq3KHM8eqbpYW%2Fiu%2BHKc3gmMwQ%2F2uYJcFMttn%2Fh8FN2F6eadqaIcG2P%2BVesuObvioZ81OxOeyYAbvzCtzLPZ6BU7%2FHs0CFHfsCtpuZSEDokjHoBBpb4sTR42E0FNzS4lhTcNi3QH%2FNKhulYOV1V%2FeSjNXId0mNJXvyndk0Kv5idROSeuCgJc8bGypFVMMWquZQGOrQC5Aeban8TqkMOkla6zFOLhcmcTtA4jsIJSMoCWAsDjwXMFUM03qxD29FevjqoiH0Wi3mTSJGlqXAAtYIuX1tbZQeeeNf1S0ngi6%2B8K%2FKtzY9yM0RwSPxHFdCbqiC8cyu0mKMLGzfAnkCEls2TXboGboYhTW7q1a8beRgPR9uO8sysjC88UvyihHBXx1TpbuK2szLN%2FnexM0ks25bu47AR4SLYwq%2B6l6G4fCrrAXNElmZ9NkGradWFVhjGE4Mww28LA3H9JXz5PiKuDmQKvN6o8IpzhvQlGF6HlghSvptVe7p%2FwwfmuzKqxh1tyHzjkQ9hBGRpTus%2Bb430hqYa4SMDmN2lEITotKQ3yeUiEhRV4fpPZOFqwU81MHLn3yZEQhULrsC8g5mEanj5Jlyh6jqE7zAFK0M%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220525T161209Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAV2DUIK5JH2N4XMHR%2F20220525%2Faf-south-1%2Fs3%2Faws4_request&X-Amz-Signature=d405417b9e3e281aae666019470080bc29ecac3627c92476732bc7f38d386b10";

// Set the Array parameters
// const dummytoolArray = [
//     {
//             Tool: { S: new_tool_meta.Tool_ID },
//             Name: { S: new_tool_meta.Tool_Name },
//             Department: { S: new_tool_meta.Tool_Department },
//             Location: { S: new_tool_meta.Tool_Location },
//             Image:{S: new_tool_meta.Tool_Image_URL},
//     },
//     {
//         Tool: { S: new_tool_meta.Tool_ID + "tool2aweneessssss" },
//         Name: { S: new_tool_meta.Tool_Name },
//         Department: { S: new_tool_meta.Tool_Department },
//         Location: { S: new_tool_meta.Tool_Location },
//         Image:{S: new_tool_meta.Tool_Image_URL},
// }
// ];


const Build_Tools_Insert_Write = () => {
    // const tools_to_Insert = dummytoolArray.map((tool) => {
    //     const tool_to_be_Inserted = {
            
    //     };
        
        
        
    //     return 
    // })
    
    //  return tools_to_Insert;
    return {
        PutRequest: {
          Item: {
            Tool: { S: new_tool_meta.Tool_ID },
            Name: { S: new_tool_meta.Tool_Name },
            Department: { S: new_tool_meta.Tool_Department },
            Location: { S: new_tool_meta.Tool_Location },
            Image:{S: new_tool_meta.Tool_Image_URL},
          },
        },
    };
}

export const params = {
  RequestItems: {
    Tools: [
      
          Build_Tools_Insert_Write()
      
    ],
  },
};

export const run = async (tool_To_Create) => {
  try {
    const data = await ddbClient.send(new BatchWriteItemCommand(params));
    console.log("Success, items inserted", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

