export interface EmpShape {
  fname: string;
  lname: string;
}

export function validateEmp(emp: EmpShape) {
  const errors: { fname?: string; lname?: string } = {};
  if (!emp.fname || emp.fname.trim() === "") {
    errors.fname = "First name is required";
  } else if (emp.fname.trim().length < 3) {
    errors.fname = "First name must be at least 3 characters";
  }

  if (!emp.lname || emp.lname.trim() === "") {
    errors.lname = "Last name is required";
  } else if (emp.lname.trim().length < 2) {
    errors.lname = "Last name must be at least 2 characters";
  }

  return errors;
}
