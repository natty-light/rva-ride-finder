import useFetchers from "@/hooks/useFetchers";
import Ride from "@/modules/Ride";
import { ApiRoutes } from "@/routes";
import { useAuthStore } from "@/stores/auth";
import type { Nullable } from "@/types/utility";
import { Ride as RideType } from "@prisma/client";
import { type FC, useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "react-query";

type GetRidesResponse = {
  rides: RideType[];
  afterId: number;
}

const Feed: FC = () => {
  const [rides, setRides] = useState<RideType[]>([]);
  const [afterId, setAfterId] = useState<Nullable<number>>(null);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<Nullable<HTMLDivElement>>(null);

  const isSignedIn = useAuthStore((state) => state.isSignedIn);

  const { get } = useFetchers();

  const query = useQuery({
    queryKey: ['afterId', { afterId, }],
    queryFn: async ({ queryKey }) => {
      const [_key, { afterId }] = queryKey as [string, { afterId: number }];
      const response = await get<GetRidesResponse>(ApiRoutes.GetRides, {
        afterId
      });

      if (!response) {
        return;
      }

      const { rides: newRides, afterId: newAfterId } = response.data;

      setRides((previousRides) => [...previousRides, ...newRides]);
      if (afterId) {
        setAfterId(newAfterId);
      }
      setLoading(false);
    }
  });

  useEffect(() => {
    // Scroll listener for infinite scrolling
    const handleScroll = () => {
      if (
        containerRef.current &&
        containerRef.current.scrollHeight -
        containerRef.current.scrollTop ===
        containerRef.current.clientHeight
      ) {
        loadMoreRides();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const loadMoreRides = useCallback(() => {
    if (loading && !isSignedIn) {
      return;
    }
    setLoading(true);


    query.refetch({
      queryKey: ['afterId', { afterId }]
    });
  }, [query, afterId, loading, isSignedIn]);

  useEffect(() => {
    if (isSignedIn && !rides.length) {
      loadMoreRides();
    }
  }, [isSignedIn, rides]);

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div
        ref={containerRef}
        className="w-full h-full flex flex-col items-start p-6 overflow-auto"
      >
        {rides.map((ride, index) => (
          <div key={`ride-${ride.id}-${index}`} className="w-full mb-4">
            <Ride ride={ride} />
          </div>
        ))}
        {loading && <div className="text-center mt-4">Loading...</div>}
      </div>
    </div>
  );
};

export default Feed;