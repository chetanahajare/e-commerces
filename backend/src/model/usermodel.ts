import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import { UserDocumentExtended, UserModel } from '../interface/types';
 
const userSchema: Schema<UserDocumentExtended> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
 
userSchema.pre<UserDocumentExtended>('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});
const User: UserModel = mongoose.model<UserDocumentExtended, UserModel>('User', userSchema);
 
export default User;
 
