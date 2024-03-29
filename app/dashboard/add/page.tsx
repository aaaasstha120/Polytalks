import AddFriendButton from "@/components/AddFriendButton";
import RecommendedFriends from "@/components/RecommendedFriends";
import { getRecommendedFriends } from "@/helpers/get-recommended-friends";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";

const page: FC = async () => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const recommendations = await getRecommendedFriends();

  return (
    <main className="pt-8 h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <h1 className="font-bold text-5xl mb-8">Add a friend</h1>
        <AddFriendButton />
      </div>
      <RecommendedFriends recommendations={recommendations} />
    </main>
  );
};

export default page;
