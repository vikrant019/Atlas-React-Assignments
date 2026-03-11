import { Component, type ChangeEventHandler } from 'react';

type Emp = {
  fname: string;
  lname: string;
};

type DisplayRowProps = {
  variant: 'display';
  fname: string;
  lname: string;
};

type EditRowProps = {
  variant: 'edit';
  emp: Emp;
  OnTextChange: ChangeEventHandler<HTMLInputElement>;
};

type RowProps = DisplayRowProps | EditRowProps;

class Row extends Component<RowProps> {

  render() {
    if (this.props.variant === 'display') {
      return (
        <tr>
          <td>{this.props.fname}</td>
          <td>{this.props.lname}</td>
        </tr>
      );
    }

    const fnameHasNumber = /\d/.test(this.props.emp.fname);
    const lnameHasNumber = /\d/.test(this.props.emp.lname);

    return (
      <tr>
        <td>
          <input
            type="text"
            value={this.props.emp.fname}
            onChange={this.props.OnTextChange}
            name="fname"
            aria-label="First Name"
          />
          {fnameHasNumber && (
            <span className="validation-error">First name cannot contain numbers</span>
          )}
        </td>
        <td>
          <input
            type="text"
            value={this.props.emp.lname}
            onChange={this.props.OnTextChange}
            name="lname"
            aria-label="Last Name"
          />
          {lnameHasNumber && (
            <span className="validation-error">Last name cannot contain numbers</span>
          )}
        </td>
      </tr>
    );
  }
}

export default Row;