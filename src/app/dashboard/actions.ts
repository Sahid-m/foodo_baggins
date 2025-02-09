"use server";

import { connectDB } from "@/lib/mongoDb";
import User from "@/schema/user";

export async function getUserByEmail(emailAddress: string) {
  await connectDB();
  const existingUser = await User.findOne({ emailAddress }).lean();

  if (!existingUser) return null;

  return existingUser;
}
