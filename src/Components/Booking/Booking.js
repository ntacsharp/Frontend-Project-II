import React, { useEffect, useState } from "react";
import "./test.css";
import SortOptions from "./SortOptions";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import axios from "axios";

const Booking = () => {
  // const token = sessionStorage.getItem('token');
  // const headers = {
  //     Authorization: `Bearer ${token}`,
  // };
  // const province = axios.get("http://localhost:4000/api/province",{ headers: headers })
  // console.log(province);

  const [sortOption, setSortOption] = useState("default");
  const [filteredAndSortedBookings, setFilteredAndSortedBookings] = useState(
    []
  );
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
    toggleSlider1(); // Khi ảnh được click, toggle slider
    setCurrentImage1((prevImage) =>
      prevImage === "image1" ? "image2" : "image1"
    ); // Đổi ảnh
  };

  const handleClick2 = () => {
    toggleSlider2(); // Khi ảnh được click, toggle slider
    setCurrentImage2((prevImage) =>
      prevImage === "image1" ? "image2" : "image1"
    ); // Đổi ảnh
  };

  const handleClick3 = () => {
    toggleCheckbox();
    setCurrentImage3((prevImage) =>
      prevImage === "image1" ? "image2" : "image1"
    );
  };

  const [timeVal, setValue1] = React.useState([0, 24]);
  const [priceVal, setValue2] = React.useState([0, 100]);

  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
    //console.log(newValue)
    setTimeRange(newValue);
  };
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
    //console.log(newValue)
    setPriceRange(newValue);
  };

  useEffect(() => {
    filterBookings(timeRange, priceVal);
  }, [timeVal, priceVal, sortOption, selectedNhaXe]);

  const bookings = [
    {
      id: 1,
      departureTime: "9:45",
      arrivalTime: "12:20",
      price: 50,
      rating: 3,
      nhaXe: "peo1",
      totalSeat: 7,
    },
    {
      id: 2,
      departureTime: "12:15",
      arrivalTime: "14:30",
      price: 60,
      rating: 1,
      nhaXe: "peo2",
      totalSeat: 9,
    },
    {
      id: 3,
      departureTime: "15:00",
      arrivalTime: "17:45",
      price: 70,
      rating: 5,
      nhaXe: "peo3",
      totalSeat: 11,
    },
    {
      id: 4,
      departureTime: "16:30",
      arrivalTime: "19:40",
      price: 90,
      rating: 4,
      nhaXe: "peo4",
      totalSeat: 13,
    },
  ];

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
      return list.filter((booking) => selectedNhaXe.includes(booking.nhaXe));
    }
  };

  const sortBookings = (option, list) => {
    switch (option) {
      case "earliest":
        return list.slice().sort((a, b) => {
          const timeA = parseInt(a.departureTime.replace(":", ""));
          const timeB = parseInt(b.departureTime.replace(":", ""));
          return timeA - timeB;
        });
      case "latest":
        return list.slice().sort((a, b) => {
          const timeA = parseInt(a.departureTime.replace(":", ""));
          const timeB = parseInt(b.departureTime.replace(":", ""));
          return timeB - timeA;
        });
      case "highest":
        return list.slice().sort((a, b) => b.rating - a.rating);
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
      //return (priceRange[0] != priceRange[1]);

      // Kiểm tra nếu giờ đi của đặt phòng nằm trong khoảng thời gian và giá vé nằm trong khoảng giá trị
      if (
        priceRange[0] !== priceRange[1] &&
        timeRange[0] !== timeRange[1] &&
        booking.price >= priceRange[0] &&
        booking.price <= priceRange[1]
      ) {
        if (
          parseInt(booking.departureTime.split(":")[0]) >= timeRange[0] &&
          parseInt(booking.arrivalTime.split(":")[0]) <= timeRange[1]
        ) {
          if (parseInt(booking.arrivalTime.split(":")[0]) < timeRange[1]) {
            return true;
          } else if (parseInt(booking.arrivalTime.split(":")[1]) === 0)
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
  const [currentBookingPrice, setCurrentBookingPrice] = useState(null);

  const handleBookTicket = (event, booking, id) => {
    event.preventDefault();
    console.log("Booking được chọn:", booking);
    setShowPickSeat(id);
    setCurrentBookingPrice(booking.price);
  };

  const handleSeat = () => {
    console.log(currentBookingPrice);
  };

  const PickUp = [
    { id: 1, list1: ["point a", "point b", "point c"] },
    { id: 2, list1: ["point d", "point e", "point f"] },
    { id: 3, list1: ["point g", "point h", "point i"] },
    { id: 4, list1: ["point j", "point k", "point l"] },
  ];
  const Destination = [
    { id: 1, list2: ["Point A", "Point B", "Point C"] },
    { id: 2, list2: ["Point D", "Point E", "Point F"] },
    { id: 3, list2: ["Point G", "Point H", "Point I"] },
    { id: 4, list2: ["Point J", "Point K", "Point L"] },
  ];

  const [showLocation, setShowLocation] = useState(null); //State quản lý div điểm đón điểm trả
  const handlePick = (event, booking, id) => {
    event.preventDefault();
    setShowLocation(id);
  };

  return (
    <div>
      <div className="box left">
        <div>
          <SortOptions
            sortOption={sortOption}
            handleSortChange={handleSortChange}
          />
        </div>
        <div>
          <h1>Lọc</h1>
          <div>
            <div>
              <p>Giờ đi</p>
              <div>
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
                {/* Hiển thị slider nếu showSlider1 là true */}
                {showSlider1 && (
                  <Box sx={{ width: 300 }}>
                    <Slider
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
            <div>
              <p>Giá vé</p>
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
              {showSlider2 && (
                <Box sx={{ width: 300 }}>
                  <Slider
                    getAriaLabel={() => "Price range"}
                    value={priceVal}
                    min={0}
                    max={100}
                    step={10}
                    onChange={handleChange2}
                    valueLabelDisplay="auto"
                  />
                </Box>
              )}
            </div>
            <div>
              <p>Nhà xe</p>
              <img
                src={
                  currentImage3 === "image1"
                    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Ic_keyboard_arrow_down_48px.svg/768px-Ic_keyboard_arrow_down_48px.svg.png"
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Ic_keyboard_arrow_up_48px.svg/768px-Ic_keyboard_arrow_up_48px.svg.png"
                }
                alt="Toggle Image"
                onClick={handleClick3} // Sử dụng handleClick khi ảnh được click
                className="arrow"
                style={{ height: "25px", width: "25px" }}
              />
              {showCheckbox &&
                bookings.map((booking) => (
                  <div>
                    <label key={booking.id}>
                      <input
                        type="checkbox"
                        value={booking.nhaXe}
                        onChange={handleNhaXeChange}
                        checked={selectedNhaXe.includes(booking.nhaXe)}
                      />
                      {booking.nhaXe}
                    </label>
                    <br />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="box right">
        <h1>Danh sách chuyến đi</h1>
        <div id="booking">
          <ul>
            {filteredAndSortedBookings.map((booking) => (
              <li key={booking.id}>
                <strong>Giờ đi:</strong> {booking.departureTime} <br />
                <strong>Giờ đón:</strong> {booking.arrivalTime} <br />
                <strong>Giá vé:</strong> ${booking.price} <br />
                <strong>Đánh giá:</strong> {booking.rating} sao <br />
                <strong>Nhà xe:</strong> {booking.nhaXe} <br />
                <div key={booking.id}>
                  <button
                    onClick={(event) =>
                      handleBookTicket(event, booking, booking.id)
                    }
                  >
                    Chọn chuyến
                  </button>
                  {showPickSeat === booking.id && (
                    <div>
                      <div>
                        {[...Array(booking.totalSeat)].map((_, index) => (
                          <img
                            key={index}
                            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/car-seat-1616720-1372229.png"
                            className="seat"
                            onClick={handleSeat}
                          />
                        ))}
                      </div>
                      <div>
                        <button
                          onClick={(event) =>
                            handlePick(event, booking, booking.id)
                          }
                        >
                          Tiếp tục
                        </button>
                        {showLocation === booking.id && (
                          <div>
                            <div>
                              <p>Điểm đón</p>
                              <div
                                style={{
                                  overflowY: "scroll",
                                  height: "100px",
                                  width: "100px",
                                  border: "1px solid #ccc",
                                  padding: "10px",
                                }}
                              >
                                {PickUp.map(
                                  (pickup) =>
                                    pickup.id === booking.id &&
                                    pickup.list1.map((point, index) => (
                                      <div key={index}>
                                        <input
                                          type="radio"
                                          id={`radio-${index}`}
                                          name="pickup-point"
                                          value={point}
                                        />
                                        <label htmlFor={`radio-${index}`}>
                                          {point}
                                        </label>
                                      </div>
                                    ))
                                )}
                              </div>
                            </div>
                            <div>
                              <p>Điểm trả</p>
                              <div
                                style={{
                                  overflowY: "scroll",
                                  height: "100px",
                                  width: "100px",
                                  border: "1px solid #ccc",
                                  padding: "10px",
                                }}
                              >
                                {Destination.map(
                                  (des) =>
                                    des.id === booking.id &&
                                    des.list2.map((point, index) => (
                                      <div key={index}>
                                        <input
                                          type="radio"
                                          id={`radio-${index}`}
                                          name="des-point"
                                          value={point}
                                        />
                                        <label htmlFor={`radio-${index}`}>
                                          {point}
                                        </label>
                                      </div>
                                    ))
                                )}
                              </div>
                            </div>
                            <button>Tiếp tục</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Booking;
