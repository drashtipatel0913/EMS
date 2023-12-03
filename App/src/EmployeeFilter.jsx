import React, { Component } from "react";

export default class EmployeeFilter extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.props.filter(name, value);
  }

  render() {
    const { departments, titles, employeeTypes } = this.props;

    return (
      <div>
        <p className="container w-75">
          <a
            className="btn btn-primary fw-bold"
            data-bs-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Filter <span className="bi bi-filter"></span>
          </a>
        </p>
        <div className="collapse container" id="collapseExample">
          <div className="card card-body d-flex flex-row gap-5">
            <select
              name="Title"
              value="Select Title"
              className="form-select"
              aria-label="Default select example"
              onChange={this.onChange}
            >
              <option value="Select Title">Select Title</option>
              {titles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
            <select
            name="EmployeeType"
              value="Select Employee Type"
              className="form-select"
              aria-label="Default select example"
              onChange={this.onChange}
            >
              <option value="Select Employee Type">Select Employee Type</option>
              {employeeTypes.map((employeeType) => (
                <option key={employeeType} value={employeeType}>
                  {employeeType}
                </option>
              ))}
            </select>
            <select
            name="Department"
              value="Select Department"
              className="form-select"
              aria-label="Default select example"
              onChange={this.onChange}
            >
              <option value="Select Department">Select Department</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
            <select
            name="CurrentStatus"
              value="Select Status"
              className="form-select"
              aria-label="Default select example"
              onChange={this.onChange}
            >
              <option value="Select Status">Select Status</option>
              <option value="true">Working</option>
              <option value="false">Retired</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}
