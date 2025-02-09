import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  imgUrl: string;
  emailAddress: string;
  userWeight?: string;
  userHeight?: string;
  userGender?: string;
  userGoal?: string;
  userDOB?: string;
  userMaintainceCalories?: string;
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    imgUrl: { type: String, required: false },
    emailAddress: { type: String, required: true, unique: true },
    userWeight: { type: String, required: false },
    userHeight: { type: String, required: false },
    userDOB: { type: String, required: false },
    userGender: { type: String, required: false },
    userGoal: { type: String, required: false },
    userMaintainceCalories: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
