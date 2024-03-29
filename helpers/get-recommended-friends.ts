import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function getRecommendedFriends() {
  const session = await getServerSession(authOptions);

  const currentUser = await db.user.findFirst({
    where: { id: session!.user.id },
  });

  if (!currentUser) return [];

  const { languagesLearn } = currentUser;

  const recommendations = await db.user.findMany({
    where: {
      id: { not: currentUser.id },
      languagesProficient: { hasSome: languagesLearn },
    },
  });

  return recommendations;
}
