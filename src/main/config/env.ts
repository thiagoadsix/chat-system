export default {
  port: Number(process.env.PORT ?? 3000),
  dynamoDBTableName: process.env.DYNAMODB_TABLE_NAME ?? 'ChatMessages',
  awsRegion: process.env.AWS_REGION ?? 'us-east-1',
  isLocal: process.env.IS_LOCAL ?? 'true',
}
