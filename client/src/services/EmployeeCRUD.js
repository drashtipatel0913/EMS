const ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const getEmployees = async () => {
  try {
    const response = await fetch(ENDPOINT, {
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
    const response = await fetch(ENDPOINT, {
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

const fetchEmployeeData = (id) => {
  return fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query Employee($id: ID!) {
          employee(ID: $id) {
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
      variables: { id },
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`GraphQL request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      if (result.errors) {
        throw new Error(result.errors.map((error) => error.message).join("\n"));
      }

      const data = result.data.employee;
      const dateComponents = data.dateOfJoining.split(/[-T:.Z]/);
      const year = parseInt(dateComponents[0]);
      const month = parseInt(dateComponents[1]) - 1;
      const day = parseInt(dateComponents[2]);
      const databaseDate = new Date(year, month, day);
      const formattedDate = databaseDate.toISOString().split("T")[0];

      return {
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        dateOfJoining: formattedDate,
        title: data.title,
        department: data.department,
        employeeType: data.employeeType,
        currentStatus: data.currentStatus,
        id: data.id,
      };
    })
    .catch((error) => {
      console.error("Error fetching employee data:", error);
      throw error;
    });
};

const updateEmployee = (id, employeeInput) => {
  
  return fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation UpdateEmployee($ID: ID!, $employeeInput: employeeInput!) {
          updateEmployee(ID: $ID, employeeInput: $employeeInput)
        }`,
      variables: { ID: id, employeeInput },
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        throw new Error(data.errors.map((error) => error.message).join("\n"));
      }
      return data.data.updateEmployee;
    })
    .catch((error) => {
      console.error("Error updating employee:", error);
      throw error;
    });
};

const deleteEmployee = async (id) => {
  const variables = { id: id };
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation DeleteEmployee($id: ID!) {
            deleteEmployee(ID: $id)
          }
        `,
        variables: variables,
      }),
    });
    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors.map((error) => error.message).join("\n"));
    }

    return result.data.deleteEmployee;
  } catch (error) {
    throw new Error(`Error deleting employee: ${error.message}`);
  }
};

const isEmployeeActive = (employee) => {
  return employee.currentStatus;
};

const getUpcomingRetirements = async () => {
  const query = `
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
  `;

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const { data } = await response.json();

    if (!data || !data.getEmployees) {
      console.error("Invalid response structure:", data);
      throw new Error("Invalid response structure");
    }

    // Filter employees based on age (60 years or older)
    const upcomingRetirements = data.getEmployees.filter(
      (employee) => employee.age >= 60
    );

    return upcomingRetirements;
  } catch (error) {
    console.error("Error fetching upcoming retirements:", error);
    throw error;
  }
};

export { getEmployees, createEmployee, updateEmployee, fetchEmployeeData, deleteEmployee, isEmployeeActive, getUpcomingRetirements };