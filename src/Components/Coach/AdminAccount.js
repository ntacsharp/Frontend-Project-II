import React, { useState, useEffect } from "react";
import styles from "../Homepage/Homepage.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminAccount = (props) => {
    const {adminInfo} = props

    const [open, setOpen] = useState(false)

    useEffect(() => {
        console.log(open);
    }, [open]);

    return(
        <div>
            {/* <button className={styles.buttons} style={{paddingRight: "15px"}} onClick={() => {
                sessionStorage.removeItem('token');
                window.location.replace('/');
                }}>
                Đăng xuất
            </button>  */}
            <div>
                <label className={styles.switch}>
                    <input type="checkbox" className={styles.sliderInput} onChange={() => setOpen(!open)}/>
                    <span className={`${styles.slider} ${styles.round} ${styles.adminSlider}`} style={{display: "flex", alignItems: "center"}}>
                        <div className={styles.sliderName}>{adminInfo.name}</div>
                    </span>
                </label>
            </div>

            <div className={`${styles.dropdownMenu} ${open? styles.active : styles.inactive}`}
                style={{width: "300px"}}>
                <div className={styles.userInfoContainer}>
                    <div>Tên nhà xe</div>
                    <div style={{fontWeight: "700"}}>{adminInfo.name}</div>
                </div>
                <div className={styles.userInfoContainer}>
                    <div>Số điện thoại</div>
                    <div style={{fontWeight: "700"}}>{adminInfo.phoneNumber}</div>
                </div>
                <div className={styles.userInfoContainer}>
                    <div>Email</div>
                    <div style={{fontWeight: "700"}}>{adminInfo.email}</div>
                </div>
                <div className={styles.userInfoContainer}>
                    <div>Địa chỉ</div>
                    <div style={{fontWeight: "700"}}>{adminInfo.address}</div>
                </div>
                
                <button className={styles.buttons} style={{backgroundColor: "rgb(255, 211, 51)", color: "black", width: "100%", display: "flex", justifyContent: "center"}} onClick={() => {
                    sessionStorage.removeItem('token');
                    window.location.replace('/');
                    }}>
                    Đăng xuất
                    <span></span>
                </button>

            </div>

        </div>
    )
}

export default AdminAccount;