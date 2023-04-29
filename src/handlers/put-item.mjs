import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.SAMPLE_TABLE;

export const putItemHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    console.info('received:', event);

    const body = JSON.parse(event.body);
    const id = body.id;
    const name = body.name;

    var params = {
        TableName : tableName,
        Item: { id : id, name: name }
    };

    let response

    try {
        const data = await ddbDocClient.send(new PutCommand(params));
        console.log("Success - item added or updated", data);
        response = {
            statusCode: 200,
            body: JSON.stringify(body)
        };
      } catch (err) {
        console.log("Error", err.stack);
        response = {
            statusCode: 400
        };
      }


    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

    return response;
};
