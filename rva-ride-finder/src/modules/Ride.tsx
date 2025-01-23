import Checkbox from "@/components/Checkbox";
import DifficultyIndicator from "@/components/DifficultyIndicator";
import { Ride as RideType } from "@prisma/client";
import { format } from "date-fns";
import type { FC } from "react";

type RideProps = {
  ride: RideType;
}

const Ride: FC<RideProps> = ({ ride }) => {
  const { distance, startDate, title, host, category, description, difficulty, isDrop } = ride;

  const getFormattedStartString = (start: Date) => {
    const parsed = new Date(start);
    return `Starts: ${format(parsed, 'MM-dd-yyyy')} @ ${format(parsed, 'hh:mm a')}`;
  };

  return (
    <div className="flex flex-col gap-6 border-black border-2 rounded  p-8 w-1/2">
      <h5 className="font-bold">
        {title}
      </h5>
      <h6>
        {`Leader: ${host}`}
      </h6>
      <p>
        {getFormattedStartString(startDate)}
      </p>

      <div className="flex flex-row gap-8">
        <div className="flex flex-row gap-4">
          <p>
            Difficulty:
          </p>
          <DifficultyIndicator difficulty={difficulty} />
        </div>
        <p>
          {`Ride type: ${category}`}
        </p>
        <p>
          {`Distance: ${distance} mi`}
        </p>
        <div className="flex flex-row gap-2 items-center">
          <p>
            Drop ride?
          </p>
          <Checkbox checked={isDrop} />
        </div>
      </div>
      <p>
        {description}
      </p>
    </div>
  );

};

export default Ride;