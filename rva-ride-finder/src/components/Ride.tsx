import type { RideType } from "@/types/ride";
import { format, parseISO } from "date-fns";
import type { FC } from "react";

type RideProps = {
  ride: RideType;
}

const Ride: FC<RideProps> = ({ ride }) => {

  const { distance, startDate, title, host } = ride;

  const getFormattedStartString = (start: string) => {
    const parsed = parseISO(start);
    return `Starts: ${format(parsed, 'MM-dd-yyyy')} @ ${format(parsed, 'hh:mm a')}`
  }

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
      <p>
        {`Distance: ${distance} mi`}
      </p>
    </div>
  )

}

export default Ride;