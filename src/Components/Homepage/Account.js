import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import { Link, useNavigate } from "react-router-dom";
import Enddate from "./Enddate";
import axios from "axios";

const Account = (props) => {
  const { user } = props;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // console.log(open);
  }, [open]);

  return (
    <div>
      {/* <button className={styles.buttons} style={{paddingRight: "15px"}} onClick={() => {
                sessionStorage.removeItem('token');
                window.location.replace('/');
                }}>
                Đăng xuất
            </button>  */}
      <div>
        <label className={styles.switch}>
          <input
            type="checkbox"
            className={styles.sliderInput}
            onChange={() => setOpen(!open)}
          />
          <span
            className={`${styles.slider} ${styles.round}`}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className={styles.sliderName}>{user.name}</div>
          </span>
        </label>
      </div>

      <div
        className={`${styles.dropdownMenu} ${
          open ? styles.active : styles.inactive
        }`}
      >
        <div className={styles.userInfoContainer}>
          <div>Tên khách hàng</div>
          <div style={{ fontWeight: "700" }}>{user.name}</div>
        </div>
        <div className={styles.userInfoContainer}>
          <div>Số điện thoại</div>
          <div style={{ fontWeight: "700" }}>{user.phoneNumber}</div>
        </div>
        <div className={styles.userInfoContainer}>
          <div>Email</div>
          <div style={{ fontWeight: "700" }}>{user.email}</div>
        </div>
        <div className={styles.userInfoContainer}>
          <div>Số dư tài khoản</div>
          <div style={{ fontWeight: "700" }}>{user.balance + " VND"}</div>
        </div>

        <button
          className={styles.buttons}
          style={{
            backgroundColor: "rgb(255, 211, 51)",
            color: "black",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onClick={() => {
            sessionStorage.removeItem("token");
            window.location.replace("/");
          }}
        >
          Đăng xuất
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default Account;
