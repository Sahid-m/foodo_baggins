import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  imgUrl: string;
  emailAddress: string;
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    imgUrl: { type: String, required: false },
    emailAddress: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
