import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Ratings = () => {
  // const location = useLocation();
  // const { currentBooking } = location.state;
  const navigate = useNavigate();

  const currentBooking = JSON.parse(sessionStorage.getItem("booking"));
  console.log(currentBooking);

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const [star, setStar] = useState(0);
  const handleRatingChange = (event, newValue) => {
    setStar(newValue);
  };

  const token = sessionStorage.getItem("token");
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

  useEffect(() => {
    const fetchData = async () => {
      await getUserInfo();
    };
    fetchData();
  }, []);

  const now = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ");

  const handleSubmit = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        `http://localhost:8080/identity/users/binhluan`,
        {
          content: inputValue,
          user: user,
          admin: currentBooking.admin,
          createdAt: now,
          star: star,
        },
        { headers: headers }
      );
      console.log("Data submitted successfully:", response.data);
    } catch (error) {
      console.error("There was an error submitting the data!", error);
    }
  };

  const ticket = JSON.parse(sessionStorage.getItem("ticket"));

  const ticketID = parseInt(ticket[ticket.length - 1].ticketid);
  console.log(ticketID);

  const handleSetStatus = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/identity/api/admin/ticket/grant/${ticketID}`,
        {}
      );
      console.log("Data submitted successfully:", response.data);
      console.log(ticketID);
    } catch (error) {
      console.error("There was an error submitting the data!", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="background">
        <div className="container1">
          <div className="title">Đánh giá chuyến xe</div>

          <div>Bạn đánh giá trải nghiệm chuyến đi như thế nào?</div>

          <Stack spacing={1}>
            <Rating
              name="half-rating"
              defaultValue={2.5}
              precision={0.5}
              onChange={handleRatingChange}
              size="large"
            />
          </Stack>

          <div className="inputContainer" style={{ width: "100%" }}>
            <input
              className="input"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Để lại bình luận ở đây nhé"
            ></input>
          </div>
        </div>

        <button
          className="buttons"
          onClick={() => {
            handleSubmit();
            handleSetStatus();
            navigate("/homepage");
          }}
        >
          Gửi đánh giá
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default Ratings;
