// EmployeeService.js
const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT;

const getEmployees = async () => {
  try {
    const response = await fetch(UI_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetEmployees {
            getEmployees {
              id
              firstName
              lastName
              age
              dateOfJoining
              title
              department
              employeeType
              currentStatus
            }
          }
        `,
      }),
    });

    const data = await response.json();
    return data.data.getEmployees;
  } catch (error) {
    console.error("GraphQL error:", error);
    throw error;
  }
};

const createEmployee = async (employeeInput) => {
  try {
    const response = await fetch(UI_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation CreateEmployee($employeeInput: employeeInput) {
            createEmployee(employeeInput: $employeeInput) {
              id
              firstName
              lastName
              age
              dateOfJoining
              title
              department
              employeeType
              currentStatus
            }
          }
        `,
        variables: { employeeInput },
      }),
    });

    const data = await response.json();
    return data.data.createEmployee;
  } catch (error) {
    console.error("GraphQL error:", error);
    throw error;
  }
};

export { getEmployees, createEmployee };