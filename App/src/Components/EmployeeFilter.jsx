import React, { Component } from "react";

export default class EmployeeFilter extends Component {
  constructor(props) {
    super(props);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDepartmentChange = this.onDepartmentChange.bind(this);
    this.onEmployeeTypeChange = this.onEmployeeTypeChange.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  onTitleChange(e) {
    const { value } = e.target;
    this.props.filterByTitle(value);
  }

  onDepartmentChange(e) {
    const { value } = e.target;
    this.props.filterByDepartment(value);
  }

  onEmployeeTypeChange(e) {
    const { value } = e.target;
    this.props.filterByEmployeeType(value);
  }

  onStatusChange(e) {
    const { value } = e.target;
    this.props.filterByStatus(value);
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
              value="Select Title"
              className="form-select"
              aria-label="Default select example"
              onChange={this.onTitleChange}
            >
              <option value="Select Title">Select Title</option>
              {titles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
            <select
              value="Select Employee Type"
              className="form-select"
              aria-label="Default select example"
              onChange={this.onEmployeeTypeChange}
            >
              <option value="Select Employee Type">Select Employee Type</option>
              {employeeTypes.map((employeeType) => (
                <option key={employeeType} value={employeeType}>
                  {employeeType}
                </option>
              ))}
            </select>
            <select
              value="Select Department"
              className="form-select"
              aria-label="Default select example"
              onChange={this.onDepartmentChange}
            >
              <option value="Select Department">Select Department</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
            <select
              value="Select Status"
              className="form-select"
              aria-label="Default select example"
              onChange={this.onStatusChange}
            >
              <option value="Select Status">Select Status</option>
              <option value="Working">Working</option>
              <option value="Retired">Retired</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}
