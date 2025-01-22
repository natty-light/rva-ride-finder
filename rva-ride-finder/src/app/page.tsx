'use client';

import CreateRideButton from "@/modules/CreateRideButton";
import Feed from "@/modules/Feed";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <Feed />
      <CreateRideButton />
    </div>
  )
}

export default Home;