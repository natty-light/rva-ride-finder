import { RideDifficulties } from "@prisma/client";
import type { FC } from "react";

type DifficultyIndicatorProps = {
  difficulty: RideDifficulties;
}

const DifficultyIndicator: FC<DifficultyIndicatorProps> = ({ difficulty }) => {
  const getColor = () => {
    switch (difficulty) {
      case RideDifficulties.Green:
        return 'green';
      case RideDifficulties.Yellow:
        return 'yelllow';
      case RideDifficulties.Red:
        return 'red';
    }
  };
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill={getColor()} />
    </svg>
  );
};



export default DifficultyIndicator;
