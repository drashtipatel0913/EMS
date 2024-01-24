import React, { Component } from "react";
import { Button, Collapse, Form } from "react-bootstrap";

export default class EmployeeFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  onTitleChange = (e) => {
    const { value } = e.target;
    this.props.filterByTitle(value);
  };

  onDepartmentChange = (e) => {
    const { value } = e.target;
    this.props.filterByDepartment(value);
  };

  onEmployeeTypeChange = (e) => {
    const { value } = e.target;
    this.props.filterByEmployeeType(value);
  };

  onStatusChange = (e) => {
    const { value } = e.target;
    this.props.filterByStatus(value);
  };

  onRetirementChange = (e) => {
    const { value } = e.target;
    this.props.filterByUpcoming(value);
  };

  render() {
    const { departments, titles, employeeTypes } = this.props;

    return (
      <div>
        <Button
          variant="light"
          onClick={() => this.setState({ open: !this.state.open })}
          aria-controls="filter-collapse"
          aria-expanded={this.state.open}
          className="mb-3 w-25"
        >
          Filter
          <span className="bi bi-filter"></span>
        </Button>
        <Collapse in={this.state.open}>
          <div id="filter-collapse" className="mb-3">
            <Form className="d-flex gap-3">
              <Form.Select
                aria-label="Employee Title"
                onChange={this.onTitleChange}
              >
                <option>Select Title</option>
                {titles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                aria-label="Employee Type"
                onChange={this.onEmployeeTypeChange}
              >
                <option>Select Employee Type</option>
                {employeeTypes.map((employeeType) => (
                  <option key={employeeType} value={employeeType}>
                    {employeeType}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                aria-label="Employee Department"
                onChange={this.onDepartmentChange}
              >
                <option>Select Department</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                aria-label="Employee Status"
                onChange={this.onStatusChange}
              >
                <option>Select Status</option>
                <option value="Working">Working</option>
                <option value="Retired">Retired</option>
              </Form.Select>
              <Form.Select
                aria-label="Employee Retirement"
                onChange={this.onRetirementChange}
              >
                <option>Select Upcoming</option>
                <option value="All">All</option>
                <option value="Retirement">Retirement</option>
              </Form.Select>
            </Form>
          </div>
        </Collapse>
      </div>
    );
  }
}
