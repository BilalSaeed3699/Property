import React from "react";
import s3 from "react-aws-s3";

const config = {
  bucketName: "images-nwlt",
  albumName: "photos",
  region: "us-west-2",
  accessKeyId: "AKIASXNDBBENTYNO2DVS",
  secretAccessKey: "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",
};

export async function amazonUpload(files) {
  let s3Client = new s3(config);
  return s3Client
    .uploadFile(files.target.files[0], files.target.files[0].name)
    .then((data) => data)
    .catch((err) => console.error(err));
}
