import { Routes } from "@/routes";
import Link from "next/link";
import { type FC } from "react";

const CreateRideButton: FC = () => {
  return (
    <Link href={Routes.CreateRide} className="absolute bottom-16 right-16 p-3 bg-blue-500 text-white rounded-lg cursor-pointer text-center">
      Create A Ride
    </Link>
  );
};


export default CreateRideButton;