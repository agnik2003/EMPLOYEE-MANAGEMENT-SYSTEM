import React from "react";

const Home = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4 text-primary">Welcome to Employee Management System</h1>
      <p className="lead mt-3">
        This system helps businesses efficiently manage their employees. You can:
      </p>
      <ul className="list-group list-group-flush text-start d-inline-block">
        <li className="list-group-item">✔ View a list of employees</li>
        <li className="list-group-item">✔ Add new employees</li>
        <li className="list-group-item">✔ Update employee details</li>
        <li className="list-group-item">✔ Delete employees if necessary</li>
      </ul>
      <p className="mt-4">
        Use the navigation bar to explore different features.
      </p>
    </div>
  );
};

export default Home;
