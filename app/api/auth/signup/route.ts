import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { SignupSchema } from "@/lib/schema";

export async function POST(request: Request) {
  const res = await request.json();
  const newUser = SignupSchema.parse(res);

  // Check if user exists
  const userExists = await db.user.findFirst({
    where: { email: newUser.email },
  });

  if (userExists) {
    return Response.json({
      success: false,
      message: "A user with the same email already exists!",
      userExists: true,
    });
  }

  // Hash Password
  //   newUser.password = await (newUser.password);

  // Store new user
  const storeUser = await db.user.create({
    data: {
      email: newUser.email,
      username: newUser.fullname,
      password: newUser.password,
    },
  });

  return Response.json({
    success: true,
    message: "User signed up successfuly",
    user: storeUser,
  });
}
