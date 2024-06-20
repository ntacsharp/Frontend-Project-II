import React, { useEffect, useState } from "react";
import "./test.css";
import SortOptions from "./SortOptions";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { number } from "prop-types";
import styles from "./Booking.module.css";
import Account from "../Homepage/Account";

const Booking = () => {
  // const token = sessionStorage.getItem('token');
  // const headers = {
  //     Authorization: `Bearer ${token}`,
  // };
  // const province = axios.get("http://localhost:4000/api/province",{ headers: headers })
  // console.log(province);

  const [sortOption, setSortOption] = useState("default");
  const [filteredAndSortedBookings, setFilteredAndSortedBookings] = useState([]);
  const [showSlider1, setshowSlider1] = useState(false);
  const [showSlider2, setshowSlider2] = useState(false);
  const [currentImage1, setCurrentImage1] = useState("image1"); // Thêm state để theo dõi ảnh hiện tại
  const [currentImage2, setCurrentImage2] = useState("image1");
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [currentImage3, setCurrentImage3] = useState("image1");

  // Thêm state để lưu trữ danh sách các nhà xe được chọn
  const [selectedNhaXe, setSelectedNhaXe] = useState([]);

  const toggleSlider1 = () => {
    setshowSlider1((prevState) => !prevState);
  };
  const toggleSlider2 = () => {
    setshowSlider2((prevState) => !prevState);
  };
  const toggleCheckbox = () => {
    setShowCheckbox((prevState) => !prevState);
  };

  const handleClick1 = () => {
    toggleSlider1();
    setCurrentImage1((prevImage) =>
      prevImage === "image1" ? "image2" : "image1"
    );
  };

  const handleClick2 = () => {
    toggleSlider2();
    setCurrentImage2((prevImage) =>
      prevImage === "image1" ? "image2" : "image1"
    );
  };

  const handleClick3 = () => {
    toggleCheckbox();
    setCurrentImage3((prevImage) =>
      prevImage === "image1" ? "image2" : "image1"
    );
  };

  const [timeVal, setValue1] = React.useState([0, 24]);
  const [priceVal, setValue2] = React.useState([0, 1000000]);

  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
    setTimeRange(newValue);
  };
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
    setPriceRange(newValue);
  };

  useEffect(() => {
    filterBookings(timeRange, priceVal);
  }, [timeVal, priceVal, sortOption, selectedNhaXe]);

  // const booking1 = axios.get(
  //   `http://localhost:8080/identity/api/admin/tripseat`
  // );
  const [array, setArray] = useState([]); // Mảng các chuyến xe sau khi get từ backend
  const [uniqueBookingNames, setUniqueBookings] = useState();
  function getUniqueAdminNames(data) {
    const seenAdmins = new Set();
    return data.filter((entry) => {
      const adminName = entry.provider;
      if (seenAdmins.has(adminName)) {
        return false;
      } else {
        seenAdmins.add(adminName);
        return true;
      }
    });
  }
  // console.log("test", x);

  useEffect(() => {
    async function fetchData() {
      try {
        // const response = await booking1;
        const response = JSON.parse(sessionStorage.getItem("filteredList"));
        const uniqueBooking = getUniqueAdminNames(response); //hàm xử lý data đầu vào lọc ra danh sách các nhà xe không trùng
        setUniqueBookings(uniqueBooking); // data hiển thị trong phần lọc
        setFilteredAndSortedBookings(response);
        setArray(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const bookings = array;

  // Hàm xử lý sự kiện khi có sự thay đổi trong ô đánh dấu nhà xe
  const handleNhaXeChange = (event) => {
    const nhaXe = event.target.value;
    // Kiểm tra xem nhà xe đã được chọn hay không
    if (event.target.checked) {
      // Nếu đã chọn, thêm nhà xe vào danh sách các nhà xe được chọn
      setSelectedNhaXe((prevSelected) => [...prevSelected, nhaXe]);
    } else {
      // Nếu bỏ chọn, loại bỏ nhà xe khỏi danh sách các nhà xe được chọn
      setSelectedNhaXe((prevSelected) =>
        prevSelected.filter((item) => item !== nhaXe)
      );
    }
  };

  const filterByNhaXe = (list, selectedNhaXe) => {
    // Nếu không có nhà xe nào được chọn, trả về toàn bộ danh sách chuyến đi
    if (selectedNhaXe.length === 0) {
      return list;
    } else {
      // Lọc danh sách chuyến đi sao cho nhà xe nằm trong danh sách nhà xe được chọn
      return list.filter((booking) =>
        selectedNhaXe.includes(booking.provider)
      );
    }
  };

  const getHourAndMinute = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    return { hour: hour, minute: minute };
  };

  const sortBookings = (option, list) => {
    switch (option) {
      case "earliest":
        return list.slice().sort((a, b) => {
          const timeA = getHourAndMinute(a.departurePoints[0].time);
          const timeB = getHourAndMinute(b.departurePoints[0].time);
          return (
            timeA.hour * 60 + timeA.minute - (timeB.hour * 60 + timeB.minute)
          );
        });
      case "latest":
        return list.slice().sort((a, b) => {
          const timeA = getHourAndMinute(a.departurePoints[0].time);
          const timeB = getHourAndMinute(b.departurePoints[0].time);
          return (
            timeB.hour * 60 + timeB.minute - (timeA.hour * 60 + timeA.minute)
          );
        });
      case "highest":
        return list
          .slice()
      // .sort((a, b) => ratings[b.admin.adminid] - ratings[a.admin.adminid]);
      case "ascending":
        return list.slice().sort((a, b) => a.price - b.price);
      case "descending":
        return list.slice().sort((a, b) => b.price - a.price);
      default:
        return list;
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const [priceRange, setPriceRange] = useState([0, 100]); // State lưu trữ khoảng giá vé
  const [timeRange, setTimeRange] = useState([0, 24]); // State lưu trữ khoảng thời gian đi

  // Hàm lọc danh sách đặt phòng dựa trên cả hai tiêu chí: giờ đi và giá vé
  const filterBookings = (timeRange, priceRange) => {
    const filtered1 = bookings.filter((booking) => {
      // Kiểm tra nếu giờ đi của đặt phòng nằm trong khoảng thời gian và giá vé nằm trong khoảng giá trị
      if (
        priceRange[0] !== priceRange[1] &&
        timeRange[0] !== timeRange[1] &&
        booking.price >= priceRange[0] &&
        booking.price <= priceRange[1]
      ) {
        if (
          getHourAndMinute(booking.departurePoints[0].time).hour >= timeRange[0] &&
          getHourAndMinute(booking.arrivalPoints[booking.arrivalPoints.length - 1].time).hour <= timeRange[1]
        ) {
          if (getHourAndMinute(booking.arrivalPoints[booking.arrivalPoints.length - 1].time).hour < timeRange[1]) {
            return true;
          } else if (getHourAndMinute(booking.arrivalPoints[booking.arrivalPoints.length - 1].time).minute === 0)
            return true;
          else return false;
        } else return false;
      } else {
        return false;
      }
    });
    const filtered2 = filterByNhaXe(filtered1, selectedNhaXe);
    const finallist = sortBookings(sortOption, filtered2);
    setFilteredAndSortedBookings(finallist);
  };

  const [showPickSeat, setShowPickSeat] = useState(null); // State quản lý div chọn chuyến
  const [currentBooking, setCurrentBooking] = useState(null);

  const handleBookTicket = (booking) => {
    setShowPickSeat(booking.id);
    setPickUp(null);
    setDrop(null);
    setSeatCount(1);
    setCMT("");
    setCurrentBookingPrice(0);
    setCurrentBooking(booking);
  };

  const [pickup, setPickUp] = useState(null);
  const handlePickupPointChange = (event) => {
    setPickUp(event.target.value);
    console.log(event.target.value)
  };

  const [drop, setDrop] = useState(null);
  const handleDropOffPointChange = (event) => {
    setDrop(event.target.value);
  };


  const navigate = useNavigate(); // Use useNavigate hook
  sessionStorage.setItem("booking", JSON.stringify(currentBooking));

  async function postData() {
    if (pickup && drop) {
      try {
        const token = sessionStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const dateStr = sessionStorage.getItem("date");
        const response = await axios.post(
          "http://localhost:4000/api/ticket/",
          {
            tripId: currentBooking.id,
            departureProvinceId: pickup,
            arrivalProvinceId: drop,
            seatCount: seatCount,
            date: dateStr
          },
          { headers: headers }
        );
        // navigate("/rating", { state: { currentBooking } }); // Navigate to Rating with currentBooking
        console.log(response);
        return response.data;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    }
  }


  const [showRating, setShowRating] = useState(null);
  const [ratings, setRatings] = useState([]);
  const handleShowRating = async (id) => {
    setShowRating(id);
    const response = await axios.get(
      "http://localhost:4000/api/review/" + id
    );
    setRatings(response.data.items);
  };

  const [seatCount, setSeatCount] = useState(0);
  const [currentBookingPrice, setCurrentBookingPrice] = useState(null);
  const handleSeatCountChange = (event) => {
    if (event.target.value > currentBooking.availableSeatCount) {
      document.getElementById('seatCountInput').value = currentBooking.availableSeatCount
    }
    setSeatCount(event.target.value < currentBooking.availableSeatCount ? event.target.value : currentBooking.availableSeatCount);
    setCurrentBookingPrice(currentBooking.price * seatCount);
  }

  const token = sessionStorage.getItem("token");
  const [user, setUser] = useState({});

  async function getUserInfo() {
    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `http://localhost:4000/api/user`, { headers: headers }
      );
      const data = response.data.item;
      setUser(data);
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

  function hourDifference(date1, date2) {
    const parsedDate1 = new Date(date1);
    const parsedDate2 = new Date(date2);
    const differenceInMilliseconds = Math.abs(parsedDate2 - parsedDate1);
    const differenceInHours = differenceInMilliseconds / (1000 * 60);
    return Math.round(differenceInHours * 100) / 100;
  }
  const [cmt, setCMT] = useState("");
  async function handleAddReview() {
    if (cmt.length > 0) {
      try {
        const token = sessionStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.post(
          "http://localhost:4000/api/review",
          {
            tripId: showRating,
            comment: cmt,
            star: 0
          },
          { headers: headers }
        );
        // navigate("/rating", { state: { currentBooking } }); // Navigate to Rating with currentBooking
        await handleShowRating(showRating);
        setCMT("");
        document.getElementById("CMTinput").value = "";
        return response.data;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    }
  }
  console.log(user)
  const handleCMTChange = (event) => {
    setCMT(event.target.value);
    console.log(event.target.value);
  }

  return (
    <div>
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

      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.sort}>
            <SortOptions
              sortOption={sortOption}
              handleSortChange={handleSortChange}
            />
          </div>
          <div className={styles.filter}>
            <div className={styles.title}>Lọc</div>
            <div>
              <div className={styles.sliderOption}>
                <div className={styles.sliderTag}>
                  <p className={styles.subtitle}>Giờ đi</p>
                  <img
                    src={
                      currentImage1 === "image1"
                        ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Ic_keyboard_arrow_down_48px.svg/768px-Ic_keyboard_arrow_down_48px.svg.png"
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Ic_keyboard_arrow_up_48px.svg/768px-Ic_keyboard_arrow_up_48px.svg.png"
                    }
                    alt="Toggle Image"
                    onClick={handleClick1} // Sử dụng handleClick khi ảnh được click
                    className="arrow"
                    style={{ height: "25px", width: "25px" }}
                  />
                </div>
                <div>
                  {/* Hiển thị slider nếu showSlider1 là true */}
                  {showSlider1 && (
                    <Box style={{ paddingBottom: "15px" }}>
                      <Slider
                        className="slider"
                        getAriaLabel={() => "Time range"}
                        value={timeVal}
                        min={0}
                        max={24}
                        onChange={handleChange1}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(timeVal) => `${timeVal}:00`}
                      />
                    </Box>
                  )}
                </div>
              </div>
              <div className={styles.sliderOption}>
                <div className={styles.sliderTag}>
                  <p className={styles.subtitle}>Giá vé</p>
                  <img
                    src={
                      currentImage2 === "image1"
                        ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Ic_keyboard_arrow_down_48px.svg/768px-Ic_keyboard_arrow_down_48px.svg.png"
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Ic_keyboard_arrow_up_48px.svg/768px-Ic_keyboard_arrow_up_48px.svg.png"
                    }
                    alt="Toggle Image"
                    onClick={handleClick2} // Sử dụng handleClick khi ảnh được click
                    className="arrow"
                    style={{ height: "25px", width: "25px" }}
                  />
                </div>
                {showSlider2 && (
                  <Box style={{ paddingBottom: "15px" }}>
                    <Slider
                      className="slider"
                      getAriaLabel={() => "Price range"}
                      value={priceVal}
                      min={0}
                      max={1000000}
                      step={10000}
                      onChange={handleChange2}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                )}
              </div>
              <div>
                <div className={styles.sliderTag}>
                  <p className={styles.subtitle}>Nhà xe</p>
                  <img
                    src={
                      currentImage3 === "image1"
                        ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Ic_keyboard_arrow_down_48px.svg/768px-Ic_keyboard_arrow_down_48px.svg.png"
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Ic_keyboard_arrow_up_48px.svg/768px-Ic_keyboard_arrow_up_48px.svg.png"
                    }
                    alt="Toggle Image"
                    onClick={handleClick3}
                    className="arrow"
                    style={{ height: "25px", width: "25px" }}
                  />
                </div>
                {showCheckbox &&
                  uniqueBookingNames.map((booking) => (
                    <div style={{ paddingBottom: "15px" }}>
                      <label key={booking.id}>
                        <input
                          type="checkbox"
                          value={booking.provider}
                          onChange={handleNhaXeChange}
                          checked={selectedNhaXe.includes(
                            booking.provider
                          )}
                        />
                        {booking.provider}
                      </label>
                      <br />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>Danh sách chuyến đi</div>
          <div>
            <ul className={styles.tripList}>
              {filteredAndSortedBookings.map((booking) => (
                <li key={booking.id} className={styles.tripWrapper}>
                  <div className={styles.tripContainer}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        // src={booking.admin.adminImage}
                        className={styles.bookingImg}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className={styles.tripTitle}>
                          {"Nhà xe "}
                          {booking.provider}
                        </div>
                        <div
                          className={styles.tripTitle}
                          style={{ color: "#2474E5" }}
                        >
                          {booking.price}
                          {"đ"}
                        </div>
                      </div>

                      <div className={styles.tripInfo}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <div style={{ fontWeight: "bold" }}>
                              {booking.busType}
                            </div>
                          </div>
                          <div>
                            {booking.avgStar}{" "}
                            ⭐
                          </div>
                        </div>
                        <div className={styles.tripRoute}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="74"
                            viewBox="0 0 14 74"
                          >
                            <path
                              fill="none"
                              stroke="#787878"
                              stroke-linecap="round"
                              stroke-width="2"
                              stroke-dasharray="0 7"
                              d="M7 13.5v46"
                            ></path>
                            <g fill="none" stroke="#484848" stroke-width="3">
                              <circle
                                cx="7"
                                cy="7"
                                r="7"
                                stroke="none"
                              ></circle>
                              <circle cx="7" cy="7" r="5.5"></circle>
                            </g>
                            <path
                              d="M7 58a5.953 5.953 0 0 0-6 5.891 5.657 5.657 0 0 0 .525 2.4 37.124 37.124 0 0 0 5.222 7.591.338.338 0 0 0 .506 0 37.142 37.142 0 0 0 5.222-7.582A5.655 5.655 0 0 0 13 63.9 5.953 5.953 0 0 0 7 58zm0 8.95a3.092 3.092 0 0 1-3.117-3.06 3.117 3.117 0 0 1 6.234 0A3.092 3.092 0 0 1 7 66.95z"
                              fill="#787878"
                            ></path>
                          </svg>
                          <div className={styles.tripRouteInfo}>
                            <div className={styles.contentTrip}>
                              <div
                                style={{
                                  color: "#484848",
                                  fontSize: "20px",
                                  fontWeight: "bold",
                                }}
                              >
                                {booking.departurePoints[0].time.slice(11, 16)}
                              </div>
                              <div class="place">
                                •{" "}
                                {"Ngày " +
                                  booking.departurePoints[0].time.slice(8, 10) +
                                  "/" +
                                  booking.departurePoints[0].time.slice(5, 7) +
                                  "/" +
                                  booking.departurePoints[0].time.slice(0, 4)
                                }
                              </div>
                              <div class="place">
                                • {booking.departureProvince}
                              </div>
                            </div>
                            <div style={{ color: "#A1A1A1" }}>
                              {hourDifference(
                                booking.departurePoints[0].time,
                                booking.arrivalPoints[booking.arrivalPoints.length - 1].time
                              ) + "m"}
                            </div>
                            <div className={styles.contentTrip}>
                              <div
                                style={{
                                  color: "#707070",
                                  fontSize: "20px",
                                  fontWeight: "bold",
                                }}
                              >
                                {booking.arrivalPoints[booking.arrivalPoints.length - 1].time.slice(11, 16)}
                              </div>
                              <div class="place">
                                •{" "}
                                {"Ngày " +
                                  booking.arrivalPoints[booking.arrivalPoints.length - 1].time.slice(8, 10) +
                                  "/" +
                                  booking.arrivalPoints[booking.arrivalPoints.length - 1].time.slice(5, 7) +
                                  "/" +
                                  booking.arrivalPoints[booking.arrivalPoints.length - 1].time.slice(0, 4)}
                              </div>
                              <div class="place">
                                • {booking.arrivalProvince}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            gap: "20px",
                          }}
                        >
                          <div style={{ fontWeight: "600", color: "#2474E5" }}
                            onClick={() => {
                              handleShowRating(booking.id);
                              // const fetchComment = async (id) => {
                              //   const comment1 = await getCommentById(id);
                              //   setComments(comment1);
                              // };
                              // fetchComment(booking.id);
                            }}>
                            Xem bình luận
                          </div>

                          <button
                            className={`${styles.buttons} ${styles.orderButton}`}
                            onClick={(event) => {
                              handleBookTicket(booking);
                            }}
                          >
                            Đặt vé
                            <span></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {showPickSeat === booking.id && (
                    <div>
                      <div className="show1">
                        <p>Còn {booking.availableSeatCount} chỗ</p>
                        <input id="seatCountInput" placeholder="Số chỗ muốn đặt" onChange={handleSeatCountChange} type="number" min={1} max={currentBooking ? currentBooking.availableSeatCount : 1}></input>
                        <p>Giá vé {currentBookingPrice} VND</p>
                      </div>
                      {(
                        <div className="show2">
                          <div>
                            <p>Điểm đón</p>
                            <div>
                              <Box sx={{ minWidth: 120 }}>
                                <FormControl style={{ width: "200px" }}>
                                  <InputLabel id="pick-up">Điểm đón</InputLabel>
                                  <Select
                                    labelId="pick-up"
                                    id="pick-up"
                                    label="Điểm đón"
                                    onChange={(event) => {
                                      handlePickupPointChange(event);
                                    }}
                                  >
                                    {booking.departurePoints.map((pick) => (
                                      <MenuItem value={pick.id}>
                                        {pick.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Box>
                            </div>
                          </div>
                          <div>
                            <p>Điểm trả</p>
                            <div>
                              <Box sx={{ minWidth: 120 }}>
                                <FormControl style={{ width: "200px" }}>
                                  <InputLabel id="drop-off">
                                    Điểm trả
                                  </InputLabel>
                                  <Select
                                    labelId="drop-off"
                                    id="drop-off"
                                    label="Điểm trả"
                                    onChange={(event) => {
                                      handleDropOffPointChange(event);
                                    }}
                                  >
                                    {booking.arrivalPoints.map((pick) => (
                                      <MenuItem value={pick.name}>
                                        {pick.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Box>
                            </div>
                          </div>
                          {/* <Link to={"/payment"}> */}
                          <button
                            className="button"
                            onClick={() => {
                              postData();
                            }}
                          >
                            Tiếp tục
                          </button>
                          {/* </Link> */}
                        </div>
                      )}
                    </div>
                  )}

                  {showRating === booking.id && (
                    <div className="showrating">
                      <div className="addRating">
                        <input id="CMTinput" className="comment" onChange={(event) => {
                          handleCMTChange(event);
                        }}></input>
                        <button className="addButton" onClick={() => { handleAddReview() }}>Thêm</button>
                      </div>
                      <div>
                        {ratings.map((review) => (
                          <div key={review.id}>
                            <li>Người dùng: {review.user}</li>
                            <li>Bình luận: {review.comment}</li>
                            {/* Add more comment details if needed */}
                          </div>
                        ))}
                      </div>

                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
