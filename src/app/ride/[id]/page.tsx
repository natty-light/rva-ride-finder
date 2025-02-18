import { ApiRoutes } from "@/routes";
import { Ride as RideType } from "@prisma/client";
import axios from "axios";
import { NextPage } from "next";
import RidePage from "./ride-page";

const getRide = async (rideId: number) => {
  const response = await axios.get<RideType>(`http://localhost:3000${ApiRoutes.GetRide}`, {
    params: {
      rideId,
    }
  });


  return response.data;
};

type RideProps = {
  params: Promise<{ id: string }>
}

const Ride: NextPage<RideProps> = async ({
  params,
}) => {

  const { id } = await params;
  const ride = await getRide(parseInt(id, 10));

  return <RidePage ride={ride} />;
};

export default Ride;