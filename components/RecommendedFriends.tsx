"use client";
import { User } from "@prisma/client";
import React from "react";
import { Button } from "./ui/button";
import { addFriendValidator } from "@/lib/validations/add-friend";
import axios from "axios";

type Props = {
  recommendations: User[];
};

const RecommendedFriends = ({ recommendations }: Props) => {
  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });

      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });
    } catch (error) {}
  };

  return (
    <div>
      <h4 className="font-bold text-2xl mb-8">Recommended Friends</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
        {recommendations.map((recommendation) => (
          <div className="flex flex-row bg-white shadow px-4 py-3 rounded-md">
            <div className="flex flex-col flex-1">
              <span aria-hidden="true" className="truncate max-w-[15ch]">
                {recommendation.username}
              </span>
              <span className="text-xs text-zinc-400" aria-hidden="true">
                {recommendation.email}
              </span>
            </div>
            <Button onClick={() => addFriend(recommendation.email)}>Add</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedFriends;
