import { type ChangeEvent, useState } from "react";
import ValidatedInput from "./ValidatedInput";

function InputValidation() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>User Form</h2>
      <ValidatedInput
        value={formData.firstName}
        onChange={handleChange}
        name="firstName"
        label="First Name"
      />
      <ValidatedInput
        value={formData.lastName}
        onChange={handleChange}
        name="lastName"
        label="Last Name"
      />
    </div>
  );
}

export default InputValidation;
