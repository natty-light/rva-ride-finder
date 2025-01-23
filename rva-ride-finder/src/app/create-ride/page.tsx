'use client';

import useFetchers from "@/hooks/useFetchers";
import { ApiRoutes } from "@/routes";
import { useAuthStore } from "@/stores/auth";
import { Ride, RideCategories, RideDifficulties } from "@prisma/client";
import type { NextPage } from "next";
import { useCallback } from "react";
import { useMutation } from "react-query";

const CreateRide: NextPage = () => {

  const user = useAuthStore((state) => state.user);

  const { post } = useFetchers();

  const mutation = useMutation({
    mutationFn: (ride: Omit<Ride, 'userId' | 'id' | 'routeId'>) => {
      return post(ApiRoutes.CreateRide, ride);
    }
  });

  const handleClick = useCallback(() => {
    const ride: Omit<Ride, 'userId' | 'id' | 'routeId'> = {
      description: 'test ride',
      distance: 20,
      host: user?.displayName ?? '',
      startDate: new Date(),
      title: 'test ride',
      category: RideCategories.Road,
      difficulty: RideDifficulties.Green,
      isDrop: false,
    };

    mutation.mutate(ride);

  }, [user]);

  return (
    <div>
      Create Ride
      <button onClick={handleClick}>TEST</button>
    </div>
  );
};

export default CreateRide;