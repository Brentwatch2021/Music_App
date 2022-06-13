let AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: 'Brent',
    secretAccessKey: 'BrentKey',
    region: "localhost",
    endpoint: 'http://localhost:8000',
});

const dynamoDB = AWS.DynamoDB.DocumentClient();
let tools = null;
dynamoDB.scan({TableName:"Tools",})
.promise()
.then(data => {
    console.log("This is my data from the dynamoDB: " + data);
})
.catch(err => {
    console.log("This is the new error" + err);
});




