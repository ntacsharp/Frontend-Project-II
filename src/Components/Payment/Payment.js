import React, { useState, useEffect } from "react";
import styles from "./Payment.module.css";
import { Link, json, useNavigate } from "react-router-dom";
import axios from "axios";
import Account from "../Homepage/Account";

const Payment = () => {
  const [user, setUser] = useState({});

  async function getUserInfo() {
    try {
      const response = await axios.get(
        `http://localhost:8080/identity/users/tk/${token}`
      );
      const data = response.data;
      setUser(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      await getUserInfo();
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const ticket = JSON.parse(sessionStorage.getItem("ticket"));

  const ticketID = parseInt(ticket[ticket.length - 1].ticketid);

  const booking = JSON.parse(sessionStorage.getItem("booking"));

  // const ticketID = ticket[ticket.length-1].

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phonenumber: "",
    email: "",
  });
  const sendTicketID = async () => {
    const response = await axios
      .post(`http://localhost:8080/identity/users/thanhtoan/${token}`, {
        ticketid: ticketID,
      })
      .then((res) => {
        alert("thanh cong ");
        console.log(res);
      });
    console.log(ticketID);
    return response;
  };

  const paymentButtonOnClick = () => {
    sendTicketID();
    sendVNPAY();
  };

  const handleChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
    if (e.target.name == "name") {
      setCustomerInfo({
        ...customerInfo,
        name: e.target.value,
      });
    }
    if (e.target.name == "phonenumber")
      setCustomerInfo({
        ...customerInfo,
        phonenumber: e.target.value,
      });
    if (e.target.name == "email")
      setCustomerInfo({
        ...customerInfo,
        email: e.target.value,
      });
    console.log(customerInfo);
  };

  const token = sessionStorage.getItem("token");

  const price = booking.seat.price;

  const sendVNPAY = async () => {
    axios
      .post(`http://localhost:8080/identity/users/vnpay/${price}`)
      .then((res) => {
        alert("thanh cong ");
        const data = res.data;
        window.location.href = data;
        // navigate(data);
      });
    console.log(price);
  };

  return (
    <div style={{height: "100vh"}}>
      <div className={styles.navbar}>
        <div className={styles.headerLeft}></div>
        <ul className={styles.headerRight}>
          <li>Đăng ký mở bán vé</li>
          <div className={styles.signInButton}>
            <button className={styles.buttons}>
              <i className="material-icons-round">phone</i>
              Hotline 24/7
              <span></span>
            </button>
            {sessionStorage.getItem("token") ? (
              <div>
                <Account user={user}></Account>
              </div>
            ) : (
              <Link to="/login">
                <button className={styles.buttons}>
                  Đăng nhập
                  <span></span>
                </button>
              </Link>
            )}
          </div>
        </ul>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "1000px" }}>
          <div className={styles.turnBack}>
            <p className={styles.turnBackButton}>{"<"} Quay lại</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                gap: "40px",
              }}
            >
              <div className={styles.infoBox}>
                <div className={styles.infoBoxWrapper}>
                  <div className={styles.infoBoxTitle}>Thông tin liên hệ</div>
                  <form className={styles.infoBoxForm}>
                    <div className={styles.name}>
                      <div className={styles.inputContainer}>
                        <label className={styles.title}>Tên người đi*</label>
                        <input
                          className={styles.input}
                          name="name"
                          onChange={handleChange}
                        ></input>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <div
                        className={styles.inputContainer}
                        style={{ width: "92.25px" }}
                      >
                        <p className={styles.zone}>🇻🇳 +84</p>
                      </div>

                      <div
                        className={styles.inputContainer}
                        style={{ width: "100%" }}
                      >
                        <label className={styles.title}>Số điện thoại*</label>
                        <input
                          className={styles.input}
                          name="phonenumber"
                          onChange={handleChange}
                        ></input>
                      </div>
                    </div>
                    <div>
                      <div className={styles.inputContainer}>
                        <label className={styles.title}>
                          Email để nhận thông tin đặt chỗ*
                        </label>
                        <input
                          className={styles.input}
                          name="email"
                          onChange={handleChange}
                        ></input>
                      </div>
                    </div>
                  </form>

                  <div className={styles.trustWrapper}>
                    <div
                      class="material-icons-wrapper md-16 info-note-icon "
                      style={{ width: "16px", height: "16px" }}
                    >
                      <i
                        class="material-icons-round color--positive"
                        style={{ color: "rgb(39, 174, 96)", fontSize: "16px" }}
                      >
                        verified_user
                      </i>
                    </div>
                    <p className={styles.trustMessage}>
                      Số điện thoại và email được sử dụng để gửi thông tin đơn
                      hàng và liên hệ khi cần thiết.
                    </p>
                  </div>
                </div>
              </div>

              {/* Phương thức thanh toán */}


            </div>

            <div className={styles.money}>
              <div className={styles.moneyWrapper}>
                <div className={styles.moneyTitle}>Tạm tính</div>
                <div className={styles.moneyTitle}>{price}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.endbar}>
        <div>
          <button
            className={`${styles.confirmPaymentButton} ${styles.buttons}`}
            onClick={paymentButtonOnClick}
          >
            Tiếp tục đặt vé
            <span></span>
          </button>
        </div>
        <div>
          <p>
            Bằng việc tiếp tục, bạn đồng ý với Chính sách bảo mật thanh toán và
            Quy chế
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
