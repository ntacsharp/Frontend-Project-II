import React, { useState } from "react";
import basestyle from "../Base.module.css";
import registerstyle from "./Register.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const navigate = useNavigate();

  const [adminCredentials, setAdminCredentials] = useState({
    adminname: "",
    adminaccount: "",
    adminphone: "",
    adminemail: "",
    adminpassword: "",
    adminconfirmPassword: "",
    adminaddress: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAdminCredentials({
      ...adminCredentials,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!adminCredentials.adminname.trim()) {
      errors.adminname = "Name is required";
    }

    if (!adminCredentials.adminaccount.trim()) {
      errors.adminaccount = "Account is required";
    }

    if (!adminCredentials.adminphone.trim()) {
      errors.adminphone = "Phone is required";
    }

    if (
      !adminCredentials.adminemail.trim() ||
      !regex.test(adminCredentials.adminemail)
    ) {
      errors.adminemail = "Valid email is required";
    }

    if (
      !adminCredentials.adminpassword.trim() ||
      adminCredentials.adminpassword.length < 6
    ) {
      errors.adminpassword = "Password must be at least 6 characters long";
    }

    if (
      adminCredentials.adminpassword !== adminCredentials.adminconfirmPassword
    ) {
      errors.adminconfirmPassword = "Password and Confirm Password must match";
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      axios
        .post(
          "http://localhost:8080/identity/api/admin/signup",
          adminCredentials
        )
        .then((response) => {
          alert("Admin registered successfully");
          navigate("/admin/login");
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error, for example, display error message
        });
    }
  };

  return (
    <div className={registerstyle.container}>
      <div className={registerstyle.register}>
        <form onSubmit={handleSubmit}>
          <h1>Register Admin</h1>
          <input
            type="text"
            name="adminname"
            placeholder="Name"
            onChange={handleInputChange}
            value={adminCredentials.adminname}
          />
          <p className={basestyle.error}>{formErrors.adminname}</p>
          <input
            type="text"
            name="adminaccount"
            placeholder="Account"
            onChange={handleInputChange}
            value={adminCredentials.adminaccount}
          />
          <p className={basestyle.error}>{formErrors.adminaccount}</p>
          <input
            type="text"
            name="adminphone"
            placeholder="Phone Number"
            onChange={handleInputChange}
            value={adminCredentials.adminphone}
          />
          <p className={basestyle.error}>{formErrors.adminphone}</p>
          <input
            type="email"
            name="adminemail"
            placeholder="Email"
            onChange={handleInputChange}
            value={adminCredentials.adminemail}
          />
          <p className={basestyle.error}>{formErrors.adminemail}</p>
          <input
            type="password"
            name="adminpassword"
            placeholder="Password"
            onChange={handleInputChange}
            value={adminCredentials.adminpassword}
          />
          <p className={basestyle.error}>{formErrors.adminpassword}</p>
          <input
            type="password"
            name="adminconfirmPassword"
            placeholder="Confirm Password"
            onChange={handleInputChange}
            value={adminCredentials.adminconfirmPassword}
          />
          <p className={basestyle.error}>{formErrors.adminconfirmPassword}</p>{" "}
          <input
            type="address"
            name="adminaddress"
            placeholder="Address"
            onChange={handleInputChange}
            value={adminCredentials.adminadress}
          />
          <p className={basestyle.error}>{formErrors.adminadress}</p>
          <button className={basestyle.button_common} type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
