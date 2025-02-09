// import { type NextRequest } from "next/server";
// import Anthropic from '@anthropic-ai/sdk';
// const anthropic = new Anthropic({
//   apiKey: process.env.CLAUD_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
// });
// export async function GET(req: NextRequest){
//   const msg = await anthropic.messages.create({
//     model: "claude-3-haiku-20240307",
//     max_tokens: 150,
//     messages: [{ role: "user", content: "Hello, Claude, Give concise note that I am using free tier" }],
//   });
//   console.log(msg);
//   return msg;
// }