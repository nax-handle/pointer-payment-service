import { Types } from "mongoose";
import { createHmac } from "crypto";
import { BadRequest } from "../helpers/error.helper";
export function cleanData(data: any, dto: any) {
  const dtoKeys = Object.keys(new dto());
  const cleanedData: any = {};

  dtoKeys.forEach((key: any) => {
    if (key in data) {
      cleanedData[key] = data[key];
    }
  });

  return cleanedData;
}

export function convertToObjectId(id: string) {
  return new Types.ObjectId(id);
}
export function verifySignature(
  privateKey: string,
  _id: string,
  signature: string
) {
  const jsonString = JSON.stringify(_id);
  const signatureCompare = createHmac("sha256", privateKey)
    .update(jsonString)
    .digest("hex");
  if (signature !== signatureCompare) {
    throw new BadRequest("Signature invalid!");
  }
  return;
}
