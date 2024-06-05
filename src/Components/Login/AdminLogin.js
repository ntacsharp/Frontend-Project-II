import React, { useState } from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import {NavLink, useNavigate} from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [adminCredentials, setAdminCredentials] = useState({
    adminaccount: "",
    adminpassword: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(adminCredentials);
    setAdminCredentials({
      ...adminCredentials,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
        .post("http://localhost:8080/identity/api/admin/signin", adminCredentials)
        .then((response) => {
          alert("Admin login successful");
          console.log(response.data);
          sessionStorage.setItem("token", response.data);
          // Redirect to admin dashboard or other admin-specific page
          navigate("/coach");
        })
        .catch((error) => {
          console.error("Error:", error);
          setError("Invalid admin credentials");
        });
  };

  return (
      <div className={loginstyle.container}>
        <div className={loginstyle.login}>
          <form onSubmit={handleSubmit}>
            <h1>Admin Login</h1>

            <input
                type="text"
                name="adminaccount"
                id="adminaccount"
                placeholder="Admin Account"
                onChange={handleInputChange}
                value={adminCredentials.adminaccount}
            />

            <input
                type="password"
                name="adminpassword"
                id="adminpassword"
                placeholder="Password"
                onChange={handleInputChange}
                value={adminCredentials.adminpassword}
            />

            {error && <p className={basestyle.error}>{error}</p>}

            <button className={basestyle.button_common} type="submit" onClick={handleSubmit}>
              Login
            </button>
          </form>
          <NavLink to="/adminsignup">Not yet registered ? Register Now</NavLink>
        </div>
      </div>
  );
};

export default AdminLogin;
