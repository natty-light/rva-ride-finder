import Ride from "@/modules/Ride";
import { ApiRoutes } from "@/routes";
import type { Nullable } from "@/types/utility";
import { Ride as RideType } from "@prisma/client";
import axios from "axios";
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
  const [doneFetching, setDoneFetching] = useState(false);
  const containerRef = useRef<Nullable<HTMLDivElement>>(null);

  const query = useQuery({
    queryKey: ['afterId', { afterId, }],
    queryFn: async ({ queryKey }) => {
      const [_key, { afterId }] = queryKey as [string, { afterId: number }];
      const response = await axios.get<GetRidesResponse>(ApiRoutes.GetRides, {
        params: {
          afterId
        }
      });

      if (!response) {
        return;
      }

      const { rides: newRides, afterId: newAfterId } = response.data;

      setRides((previousRides) => [...previousRides, ...newRides]);
      if (newAfterId) {
        setAfterId(newAfterId);
      }
      if (newRides.length === 0) {
        setDoneFetching(false);
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
    if (loading || doneFetching) {
      return;
    }
    setLoading(true);


    query.refetch({
      queryKey: ['afterId', { afterId }]
    });
  }, [query, afterId, loading, doneFetching]);

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