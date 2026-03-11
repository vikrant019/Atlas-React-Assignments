import { type ChangeEvent, useState } from "react";

interface ValidatedInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}

function ValidatedInput({ value, onChange, name, label }: ValidatedInputProps) {
  const [touched, setTouched] = useState(false);
  const isEmpty = value === "";
  const hasNumbers = /\d/.test(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    onChange(e);
  };

  return (
    <div>
      <label>{label}</label>
      <input type="text" value={value} onChange={handleChange} name={name} />
      {touched && isEmpty && <p style={{ color: "red" }}>Cannot be empty</p>}
      {touched && hasNumbers && <p style={{ color: "red" }}>Cannot contain numbers</p>}
    </div>
  );
}

export default ValidatedInput;
