import { ChangeEvent, FC } from "react";

export type RadioOptions = {
  label: string;
  value: string;
}

type RadioInputProps = {
  options: RadioOptions[];
  selectedValue: string
  setValue: (value: string) => void;
}

const RadioInput: FC<RadioInputProps> = ({ options, selectedValue, setValue }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };
  return (
    <form className="flex flex-row gap-4">
      {options.map(({ label, value }) => (
        <label key={label} className="flex flex-row gap-2">
          {label}
          <input
            type="radio"
            name={label}
            value={value}
            checked={value === selectedValue}
            onChange={handleChange}
          />
        </label>
      ))}
    </form>
  );
};

export default RadioInput;