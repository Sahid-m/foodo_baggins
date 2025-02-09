"use server";

import { connectDB } from "@/lib/mongoDb";
import User from "@/schema/user";

export async function setUserInitialData(formData: any, emailAddress: string) {
  await connectDB();
  // Ensure MongoDB is connected

  const existingUser = await User.findOne({
    emailAddress: emailAddress,
  });

  if (existingUser) {
    existingUser.userWeight = formData.weight;
    existingUser.userGender = formData.gender;
    existingUser.userHeight = formData.height;
    existingUser.userDOB = JSON.stringify(formData.dateOfBirth);
    existingUser.userGoal = formData.goal;

    let age = new Date().getFullYear() - parseInt(formData.dateOfBirth.year);
    let maintainceCalories = 0;

    if (formData.gender === "male") {
      let BMR =
        10 * parseFloat(formData.weight) +
        6.25 * parseFloat(formData.height) -
        5 * age +
        5;
      maintainceCalories = BMR;

      if (formData.goal === "gain") {
        maintainceCalories = BMR + 500;
      } else if (formData.goal === "lose") {
        maintainceCalories = BMR - 500;
      } else if (formData.goal === "maintain") {
        maintainceCalories = BMR;
      }

      existingUser.userMaintainceCalories = maintainceCalories.toString();
    } else if (formData.gender === "female") {
      let BMR =
        10 * parseFloat(formData.weight) +
        6.25 * parseFloat(formData.height) -
        5 * age -
        161;

      if (formData.goal === "gain") {
        maintainceCalories = BMR + 500;
      } else if (formData.goal === "lose") {
        maintainceCalories = BMR - 500;
      } else if (formData.goal === "maintain") {
        maintainceCalories = BMR;
      }

      existingUser.userMaintainceCalories = BMR.toString();
    } else if (formData.gender === "other") {
      let BMR =
        10 * parseFloat(formData.weight) +
        6.25 * parseFloat(formData.height) -
        5 * age +
        161;

      if (formData.goal === "gain") {
        maintainceCalories = BMR + 500;
      } else if (formData.goal === "lose") {
        maintainceCalories = BMR - 500;
      } else if (formData.goal === "maintain") {
        maintainceCalories = BMR;
      }

      existingUser.userMaintainceCalories = BMR.toString();

      console.log("Successfully done!");
    }

    await existingUser.save();
  }
}
