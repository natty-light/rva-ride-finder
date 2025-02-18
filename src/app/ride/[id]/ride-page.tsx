'use client';

import Ride from "@/modules/Ride";
import { Ride as RideType } from "@prisma/client";
import { NextPage } from "next";

type RidePageProps = {
  ride: RideType;
}

const RidePage: NextPage<RidePageProps> = ({ ride }) => {
  return <Ride ride={ride} />;
};

export default RidePage;