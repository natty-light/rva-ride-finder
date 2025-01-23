import { FC } from "react";

type CheckboxProps = {
  checked: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ checked }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect width="16" height="16" rx="4" fill="#fff" stroke="#000" strokeWidth="2" />
      {checked && (
        <path
          d="M6 12l4 4 8-8"
          fill="none"
          stroke="#000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
};

export default Checkbox;