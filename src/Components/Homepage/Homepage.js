import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import { Link, useNavigate } from "react-router-dom";
import Enddate from "./Enddate";
import axios from "axios";
import Account from "./Account";

const Homepage = () => {
  const navigate = useNavigate();

  const [startPointValue, setStartPointValue] = useState();
  const [endPointValue, setEndPointValue] = useState();
  const [provinceOption, setProvinceOption] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/province")
      .then((response) => {
        setProvinceOption(response.data.items);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, []);

  const [user, setUser] = useState({});
  async function getUserInfo() {
    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(
        `http://localhost:4000/api/user`,
        {
          headers: headers
        }
      );
      const data = response.data;
      setUser(data.item);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getUserInfo();
    };
    fetchData();
  }, []);

  const handleSwitch = () => {
    setEndPointValue(startPointValue);
    setStartPointValue(endPointValue);
  };

  const handlePost = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/trip",
        {
          arrivalProvinceId: endPointValue,
          departureProvinceId: startPointValue,
          departureTime: date,
        }
      );
      sessionStorage.setItem("date", date);
      // console.log(response.data);
      sessionStorage.setItem("filteredList", JSON.stringify(response.data.items));
      navigate("/booking");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const [date, setDate] = useState("");

  const handleDateChange = (event) => {
    console.log(event.target.value);
    const selectedDate = event.target.value;
    setDate(selectedDate);
  };

  return (
    <div style={{ overflow: "hidden", height: "100vh" }}>
      <div className={styles.navbar}>
        <div className={styles.headerLeft}></div>
        <ul className={styles.headerRight}>
          <Link to="/adminsignup" style={{ color: "white" }}>
            <li>Đăng ký mở bán vé</li>
          </Link>
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
      <div className={styles.banner}>
        <img
          className={styles.bannerBackground}
          src="https://229a2c9fe669f7b.cmccloud.com.vn/images/banner-main-vi.jpg"
        />
        <div className={styles.bannerMiddle}>
          <h2>Đặt vé xe đơn giản và an toàn</h2>
          <div className={styles.ticketWidget}>
            <div className={styles.infoRow}>
              <div
                className={styles.info}
                id={styles.startPoint}
                style={{ position: "relative" }}
              >
                <div className={styles.switchButton} onClick={handleSwitch}>
                  <div className={styles.switchIcon}>
                    <i className="material-icons-outlined">import_export</i>
                  </div>
                </div>

                <div className={styles.selectStartPoint}>
                  <div className={styles.iconPoint}>
                    <img
                      className={styles.itemImg}
                      src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/pickup_vex_blue_24dp.svg"
                    />
                  </div>
                  <div className={styles.inputPointContainer}>
                    <label className={styles.titlePoint}>Nơi xuất phát</label>
                    <select
                      className={styles.inputPoint}
                      value={startPointValue}
                      onChange={(e) => {
                        setStartPointValue(e.target.value);
                      }}
                    >
                      {provinceOption.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className={styles.info} id={styles.endPoint}>
                <div className={styles.selectEndPoint}>
                  <div className={styles.iconPoint}>
                    <img
                      className={styles.itemImg}
                      src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/dropoff_new_24dp.svg"
                    />
                  </div>
                  <div className={styles.inputPointContainer}>
                    <label className={styles.titlePoint}>Nơi đến</label>
                    <select
                      className={styles.inputPoint}
                      value={endPointValue}
                      onChange={(e) => {
                        setEndPointValue(e.target.value);
                      }}
                    >
                      {provinceOption.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className={styles.info} id={styles.startDate}>
                <div className={styles.selectEndPoint}>
                  <div className={styles.iconPoint}>
                    <img
                      className={styles.itemImg}
                      src="https://storage.googleapis.com/fe-production/svgIcon/event_vex_blue_24dp.svg"
                    />
                  </div>
                  <div className={styles.inputPointContainer}>
                    <label className={styles.titlePoint}>Ngày đi</label>
                    <input
                      className={styles.inputPoint}
                      type="date"
                      onChange={handleDateChange}
                    ></input>
                  </div>
                </div>
              </div>
              <div className={styles.info} id={styles.endDate}>
                <Enddate></Enddate>
              </div>
            </div>
            <div className={styles.searchButton}>
              <button
                className={styles.buttons}
                id={styles.searchButton}
                onClick={handlePost}
              >
                Tìm kiếm chuyến xe ngay
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.end}>
        <div className={styles.background}></div>
        <div className={styles.endItems}>
          <div className={styles.items}>
            <img
              className={styles.itemImg}
              src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/verified_yellow.svg"
              alt="Verified"
            />
            <p className={styles.title}>Chắc chắn có chỗ</p>
          </div>
          <div className={styles.items}>
            <img
              className={styles.itemImg}
              src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/headset_mic_yellow.svg"
              alt="Headset"
            />
            <p className={styles.title}>Hỗ trợ 24/7</p>
          </div>
          <div className={styles.items}>
            <img
              className={styles.itemImg}
              src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/discount_yellow.svg"
              alt="Discount"
            />
            <p className={styles.title}>Nhiều ưu đãi</p>
          </div>
          <div className={styles.items}>
            <img
              className={styles.itemImg}
              src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/monetization_on_yellow.svg"
              alt="Payment"
            />
            <p className={styles.title}>Thanh toán đa dạng</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
