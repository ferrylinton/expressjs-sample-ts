import { ObjectId } from "mongodb";

export interface Image {
  _id?: ObjectId,
  id?: string,
  filename: string,
  contentType: string,
  uploadDate: Date
}