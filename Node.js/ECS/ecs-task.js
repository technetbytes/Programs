const AWS = require('aws-sdk');
const s3 = new AWS.S3();
// my s3 bucket name
const ETLBucket = process.env.ETLBucket;
// path where the files need to retrived
const ETLKEY = process.env.ETLKEY;
const params = {Bucket: ETLBucket, Key: ETLKEY};
s3.getObject(params, function(err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log("S3 Object retrived for processing");
        //print s3 content type
        console.log('CONTENT TYPE:', ContentType);
      }
});	