import Ride from "@/modules/Ride";
import type { RideType } from "@/types/ride";
import type { Nullable } from "@/types/utility";
import { type FC, useState, useEffect, useRef } from "react";

const mockRides: RideType[] = [
  {
    id: 0,
    host: "Alice",
    title: "Morning Ride",
    description: "A scenic morning ride through the hills.",
    distance: 15.3,
    startDate: "2025-01-23T07:30:00Z",
  },
  {
    id: 1,
    host: "Bob",
    title: "City Tour",
    description: "Exploring the city on a leisurely ride.",
    distance: 10.2,
    startDate: "2025-01-23T09:00:00Z",
  },
  {
    id: 2,
    host: "Charlie",
    title: "Mountain Trail",
    description: "A challenging ride through rugged mountain paths.",
    distance: 25.8,
    startDate: "2025-01-23T12:00:00Z",
  },
  {
    id: 3,
    host: "Dana",
    title: "Park Loop",
    description: "A relaxing ride around the park on smooth trails.",
    distance: 8.1,
    startDate: "2025-01-23T15:30:00Z",
  },
  {
    id: 4,
    host: "Eve",
    title: "Sunset Cruise",
    description: "A peaceful ride along the lake during sunset.",
    distance: 12.7,
    startDate: "2025-01-23T18:00:00Z",
  },
];

const Feed: FC = () => {
  const [rides, setRides] = useState<RideType[]>(mockRides);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<Nullable<HTMLDivElement>>(null);

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

  const loadMoreRides = () => {
    if (loading) return;
    setLoading(true);

    // Simulate an API call for paginated data
    setTimeout(() => {
      setRides((prevRides) => [...prevRides, ...mockRides]);
      setLoading(false);
    }, 1000);
  };

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