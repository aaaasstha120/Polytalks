import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) return new Response("Unauthorized", { status: 401 });

  const res = await req.json();
  await db.user.update({
    where: { id: session.user.id },
    data: {
      languagesLearn: res.languagesLearn,
      languagesProficient: res.languagesProficient,
    },
  });
  return new Response("success", { status: 203 });
}
