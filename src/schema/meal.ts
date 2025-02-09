import { connectDB } from "@/lib/mongoDb";
import { Document, Schema, Types, model } from "mongoose";

interface IMeal extends Document {
  userId: Types.ObjectId;
  name: string;
  description?: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  createdAt: Date;
  updatedAt: Date;
}

const MealSchema = new Schema<IMeal>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Meal = model<IMeal>("Meal", MealSchema);

export default Meal;

interface MealData {
  userId: string;
  name: string;
  description?: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export async function addMeal(mealData: MealData) {
  try {
    await connectDB();

    const newMeal = new Meal(mealData);
    await newMeal.save();

    return { success: true, meal: newMeal };
  } catch (error) {
    console.error("Error adding meal:", error);
    return { success: false, error: "Failed to add meal" };
  }
}
