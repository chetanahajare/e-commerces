import { Model } from "mongoose";
 
export interface UserDocument {
    username: string;
    email: string;
    password: string;
}
export interface UserDocumentExtended extends UserDocument, Document {
    isModified(paths?: string | string[] | undefined): boolean;
}
 
export interface UserModel extends Model<UserDocumentExtended> { }
 