# Basic-Node.js-AWS-Lambda-function
> Basic aws lambda function using Node.js

Using aws cli create function with following command
````
aws lambda create-function --function-name cli-lambda --runtime nodejs16.x --role arn:aws:iam::<ACCOUNT NUMBER>:role/service-role/GetStartedLambdaBasicExecutionRole --handler index.handler --zip-file fileb://index.zip --region ap-southeast-1
````

aws cli creation response
````
{
    "FunctionName": "cli-lambda",
    "FunctionArn": "arn:aws:lambda:ap-southeast-1:<ACCOUNT NUMBER>:function:cli-lambda",
    "Runtime": "nodejs16.x",
    "Role": "arn:aws:iam::<ACCOUNT NUMBER>:role/service-role/GetStartedLambdaBasicExecutionRole",
    "Handler": "index.handler",
    "CodeSize": 264,
    "Description": "",
    "Timeout": 3,
    "MemorySize": 128,
    "LastModified": "2022-08-24T18:14:16.695+0000",
    "CodeSha256": "wc/XzuIY3OnDoJ9Ka0+GQ8K6IcfwLEW9hF+Il+ZVlcA=",
    "Version": "$LATEST",
    "TracingConfig": {
        "Mode": "PassThrough"
    },
    "RevisionId": "a79030dd-efe5-4f8e-ac31-7b51951b8b8c",
    "State": "Pending",
    "StateReason": "The function is being created.",
    "StateReasonCode": "Creating",
    "PackageType": "Zip",
    "Architectures": [
        "x86_64"
    ],
    "EphemeralStorage": {
        "Size": 512
    }
}
````


Now test the lambda function using aws cli with following command
````
aws lambda invoke --function-name cli-lambda --region ap-southeast-1 res.json
````

To check the response of the lambda function call open the res.json file
````
{"statusCode":200,"body":"\"Hello from Lambda!\""}
````