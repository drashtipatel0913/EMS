const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const filterByTitle = (title, getemployees, setState) => {
  if (title === "Select Title" || title === "") {
    getemployees();
  } else {
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetEmployeesByTitle($title: Title!) {
            getEmployeesByTitle(title: $title) {
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
          }`,
        variables: { title: title },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          console.error("GraphQL errors:", data.errors);
        } else {
          setState({ employees: data.data.getEmployeesByTitle });
        }
      })
      .catch((error) => {
        console.error("GraphQL error:", error);
      });
  }
};

export const filterByDepartment = (department, getemployees, setState) => {
  if (department === "Select Department" || department === "") {
    getemployees();
  } else {
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetEmployeesByDepartment($department: Department!) {
            getEmployeesByDepartment(department: $department) {
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
          }`,
        variables: { department: department },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          console.error("GraphQL errors:", data.errors);
        } else {
          setState({ employees: data.data.getEmployeesByDepartment });
        }
      })
      .catch((error) => {
        console.error("GraphQL error:", error);
      });
  }
};

export const filterByEmployeeType = ( employeeType, getemployees, setState) => {
  if (employeeType === "Select Employee Type" || employeeType === "") {
    getemployees();
  } else {
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetEmployeesByEmployeeType($employeeType: EmployeeType!) {
            getEmployeesByEmployeeType(employeeType: $employeeType) {
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
          }`,
        variables: { employeeType: employeeType },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          console.error("GraphQL errors:", data.errors);
        } else {
          setState({ employees: data.data.getEmployeesByEmployeeType });
        }
      })
      .catch((error) => {
        console.error("GraphQL error:", error);
      });
  }
};

export const filterByCurrentStatus = (currentStatus, getemployees, setState) => {

  const covertIntoBoolean = (currentStatus) => {
    if (currentStatus === "Working") {
      return true;
    } else {
      return false;
    }
  };

  if (currentStatus === "Select Current Status" || currentStatus === "") {
    getemployees();
  } else {
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetEmployeesByCurrentStatus($currentStatus: Boolean!) {
            getEmployeesByCurrentStatus(currentStatus: $currentStatus) {
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
          }`,
        variables: { currentStatus: covertIntoBoolean(currentStatus) },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          console.error("GraphQL errors:", data.errors);
        } else {
          setState({ employees: data.data.getEmployeesByCurrentStatus });
        }
      })
      .catch((error) => {
        console.error("GraphQL error:", error);
      });
  }
}

export const filterByUpcoming = (upcoming, getemployees, setState) => {
  if (upcoming === 'All' || upcoming === '') {
    getemployees();
  } else {
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetEmployeesByUpcoming($age: Int!) {
            getEmployeesByUpcoming(age: $age) {
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
          }`,
        variables: { age: 60 }, // You can adjust the age value as needed
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          console.error("GraphQL errors:", data.errors);
        } else {
          setState({ employees: data.data.getEmployeesByUpcoming });
        }
      })
      .catch((error) => {
        console.error("GraphQL error:", error);
      });
  }
};