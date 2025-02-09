import { connectDB } from "@/lib/mongoDb";
import User from "@/schema/user";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { data }: any = await req.json();

  await connectDB();
  console.log("clerk webhook recieved", data);

  const firstName = data.first_name;
  const lastName = data.last_name;
  const imageUrl = data.image_url;
  const id = data.id;
  const emailAddress = data.email_addresses[0].email_address;

  const newUser = new User({
    firstName,
    id: id,
    lastName,
    imgUrl: imageUrl,
    emailAddress,
  });
  await newUser.save();

  return Response.json(
    {},
    {
      status: 200,
    }
  );
}
