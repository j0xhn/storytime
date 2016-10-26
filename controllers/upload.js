const s3 = require('s3');

 const client = s3.createClient({
   maxAsyncS3: 20,     // this is the default
   s3RetryCount: 3,    // this is the default
   s3RetryDelay: 1000, // this is the default
   multipartUploadThreshold: 20971520, // this is the default (20 MB)
   multipartUploadSize: 15728640, // this is the default (15 MB)
   s3Options: {
     accessKeyId: process.env.S3_ACCESS_KEY_ID,
     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
     region: process.env.S3_REGION
   }
 });

 module.exports.sendMongoBackupToS3 = function(){
   const date = new Date()
   const backupParams = {
     localDir: "dump",
     s3Params: {
       Bucket: "story-time",
       Prefix: `backups/${date}`
     }
   }

   const uploader = client.uploadDir(backupParams);
   uploader.on('error', function(err) {
     console.error("unable to upload:", err.stack);
   });
   uploader.on('progress', function() {
     console.log("progress", uploader.progressMd5Amount,
     uploader.progressAmount, uploader.progressTotal);
   });
   uploader.on('end', function() {
     console.log("done uploading");
   });
 }
