import { FC, ReactNode } from "react";

type LabelInputProps = {
  label: string;
  children: ReactNode;
}

const LabelInput: FC<LabelInputProps> = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="ml-2">
        {label}
      </label>
      {children}
    </div>
  );
};

export default LabelInput;