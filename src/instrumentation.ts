import connect from "@/lib/mongoDb";

export async function register() {
  await connect();
}
