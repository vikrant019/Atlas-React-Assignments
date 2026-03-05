import React, { useEffect, useState } from "react";
import { Row } from "./Row";
import { validateEmp } from "./validation";
import "./style.css";


interface IEmp {
  fname: string;
  lname: string;
}

const InputValidation: React.FC = () => {
  const [emp, setEmp] = useState<IEmp>({ fname: "", lname: "" });
  const [emps, setEmps] = useState<IEmp[]>([]);
  const [errors, setErrors] = useState<{ fname?: string; lname?: string }>({});
  const [isEdit, setIsEdit] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(-1);

  useEffect(() => {
    const helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState === 4 && helper.status === 200) {
        const response = JSON.parse(helper.responseText);
        const userData: IEmp[] = response.users.map((u) => ({
          fname: u.firstName,
          lname: u.lastName,
        }));
        setEmps(userData);
      }
    };
    helper.open("GET", "https://dummyjson.com/users");
    helper.send();
  }, []);


  const OnTextChange = (args: React.ChangeEvent<HTMLInputElement>) => {
    const name = args.target.name as keyof IEmp;
    setEmp((prev) => ({ ...prev, [name]: args.target.value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  const Add = () => {
    const validationErrors = validateEmp(emp);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (!isEdit) {
      setEmps((prev) => [...prev, emp]);
    } else {
      setIsEdit(false);
      setEmps((prev) => {
        const copy = [...prev];
        copy[indexToEdit] = emp;
        return copy;
      });
    }
    setEmp({ fname: "", lname: "" });
    setErrors({});
    setIndexToEdit(-1);
  };

  const handleRemove = (index: number) => () => {
    setEmps((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };

  const handleEdit = (index: number) => () => {
    setIsEdit(true);
    setIndexToEdit(index);
    setEmp(emps[index]);
  };

  return (
    <>
      <div className="inputvalidation-main">
        <div className="inputvalidation-card">
          <h2>Employee Input Validation</h2>
          <div style={{ width: '100%' }}>
            <label className="inputvalidation-label">First Name</label>
            <input
              type="text"
              value={emp.fname}
              onChange={OnTextChange}
              name="fname"
              className={`inputvalidation-input${errors.fname ? ' error' : ''}`}
              placeholder="Enter first name"
            />
            {errors.fname && <div className="inputvalidation-error">{errors.fname}</div>}
          </div>
          <div style={{ width: '100%', marginTop: 10 }}>
            <label className="inputvalidation-label">Last Name</label>
            <input
              type="text"
              value={emp.lname}
              name="lname"
              onChange={OnTextChange}
              className={`inputvalidation-input${errors.lname ? ' error' : ''}`}
              placeholder="Enter last name"
            />
            {errors.lname && <div className="inputvalidation-error">{errors.lname}</div>}
          </div>
          <button
            onClick={Add}
            className="inputvalidation-btn"
          >
            {isEdit ? "Update" : "Add"} Employee
          </button>
        </div>
        <div className="inputvalidation-table-container">
          <h2>Employees</h2>
          <table className="inputvalidation-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Action</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {emps.map((e, index) => (
                <Row key={index} emp={e} handleRemove={handleRemove(index)} handleEdit={handleEdit(index)} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default InputValidation;
