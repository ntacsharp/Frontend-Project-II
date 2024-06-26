import React, { useState, useEffect } from "react";
import styles from "./Coach.module.css";
import { Link, useNavigate } from "react-router-dom";
import TripForm from "./TripForm";
import zIndex from "@mui/material/styles/zIndex";
import axios from "axios";

const Trip = (props) => {
  const { trip } = props;

  // const tripID = "{TripIDPlaceholder}";
  // const seatType = "{45}";
  // const remainingSeat = "{12}";

  // const startTime = "5:15";
  // const endTime = "6:45";
  // const startPlace = "Hà Lội";
  // const endPlace = "Nha Chang";

  // const tripTime = calculateTripTime(tripStartTime, tripEndDate);

  // function calculateTripTime(time1, time2){

  //     return
  // }

  function hourDifference(date1, date2) {
    const parsedDate1 = new Date(date1);
    const parsedDate2 = new Date(date2);
    const differenceInMilliseconds = Math.abs(parsedDate2 - parsedDate1);
    const differenceInHours = differenceInMilliseconds / (1000 * 60);
    return Math.round(differenceInHours * 100) / 100;
  }

  const tripTime = hourDifference(trip.stopPoints[0].time, trip.stopPoints[1].time) + "m";

  const tripStartTime = trip.stopPoints[0].time.slice(11, 16);
  const tripEndTime = trip.stopPoints[1].time.slice(11, 16);
  const tripStartDate =
    "Ngày " +
    trip.stopPoints[0].time.slice(8, 10) +
    "/" +
    trip.stopPoints[0].time.slice(5, 7) +
    "/" +
    trip.stopPoints[0].time.slice(0, 4);
  const tripEndDate =
    "Ngày " +
    trip.stopPoints[1].time.slice(8, 10) +
    "/" +
    trip.stopPoints[1].time.slice(5, 7) +
    "/" +
    trip.stopPoints[1].time.slice(0, 4);

  const [buttonPopup, setButtonPopup] = useState(false);

  function convertToStandardDateFormat(datetimeLocal) {
    var standardDate = `${datetimeLocal}:00`;
    console.log(standardDate);
    return standardDate;
  }

  // const [tripInfo, setTripInfo] = useState({
  //   tripid: trip.trip.tripid,
  //   starttime: trip.trip.starttime,
  //   endtime: trip.trip.endtime,
  //   startprovince: {
  //     pid: trip.trip.startprovince.pid,
  //     pname: trip.trip.startprovince.pname,
  //   },
  //   endprovince: {
  //     pid: trip.trip.endprovince.pid,
  //     pname: trip.trip.endprovince.pname,
  //   },
  //   coach: {
  //     licenseplate: trip.trip.coach.licenseplate,
  //   },
  // });

  // const handleChange = (e) => {
  //   setTripInfo({ ...tripInfo, [e.target.name]: e.target.value });
  //   if (e.target.name == "starttime") {
  //     setTripInfo({
  //       ...tripInfo,
  //       starttime: convertToStandardDateFormat(e.target.value),
  //     });
  //     console.log(convertToStandardDateFormat(e.target.value));
  //   }
  //   if (e.target.name == "endtime")
  //     setTripInfo({
  //       ...tripInfo,
  //       endtime: convertToStandardDateFormat(e.target.value),
  //     });
  //   console.log(tripInfo);
  // };


  // const addTrip = async () => {
  //   console.log(tripInfo);
  //   axios
  //     .put("http://localhost:8080/identity/api/admin/edit/trip", tripInfo)
  //     .then((res) => {
  //       alert("thanh cong ");
  //     });

  //   console.log(tripInfo);
  //   setButtonPopup(false);
  // };

  // const tripid = trip.trip.tripid;

  // const deleteTrip = async () => {
  //   console.log(tripid);
  //   axios
  //     .delete(`http://localhost:8080/identity/api/admin/trip/delete/${tripid}`)
  //     .then((res) => {
  //       alert("thanh cong ");
  //     });

  //   setButtonPopup(false);
  // };

  return (
    <div className={styles.infoBox}>
      <TripForm trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div style={{ width: "100%" }}>
          <div className={styles.infoBoxWrapper}>
            <div className={styles.infoBoxTitle}>Chỉnh sửa chuyến xe</div>
            <form className={styles.infoBoxForm}>
              <div className={styles.places}>
                <div className={styles.inputContainer}>
                  <label className={styles.title}>Nơi xuất phát*</label>
                  <input className={styles.input} value={trip.stopPoints[0].name}></input>
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.title}>Nơi đến*</label>
                  <input className={styles.input} value={trip.stopPoints[1].name}></input>
                </div>
              </div>

              {/* <div className={styles.times}>
                <div className={styles.inputContainer}>
                  <label className={styles.title}>Ngày đi*</label>
                  <input className={styles.input} placeholder={tripStartDate}></input>
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.title}>Ngày về*</label>
                  <input className={styles.input} placeholder={tripEndDate}></input>
                </div>
              </div> */}

              <div className={styles.types}>
                <div className={styles.types} style={{ width: "100%" }}>
                  <div className={styles.inputContainer}>
                    <label className={styles.title}>Giờ đi*</label>
                    <input className={styles.input} name="starttime" type="datetime-local" placeholder={trip.stopPoints[0].time} /*onChange={handleChange}*/></input>
                  </div>

                  <div className={styles.inputContainer}>
                    <label className={styles.title}>Giờ về*</label>
                    <input className={styles.input} name="endtime" type="datetime-local" placeholder={trip.stopPoints[1].time} /*onChange={handleChange}*/></input>
                  </div>
                </div>

                {/* <div className={styles.inputContainer}>
                  <label className={styles.title}>Loại xe*</label>
                  <input className={styles.input}></input>
                </div> */}
              </div>
            </form>

            <div style={{ display: "flex", gap: "20px" }}>
              <div className={styles.searchButton}>
                <button
                  className={styles.buttons}
                  id={styles.searchButton}
                  style={{ backgroundColor: "#3E8ACC", color: "white" }}
                  /*onClick={addTrip}*/
                >
                  Chỉnh sửa
                  <span></span>
                </button>
              </div>

              <div className={styles.searchButton}>
                <button
                  className={styles.buttons}
                  id={styles.searchButton}
                  style={{ backgroundColor: "#DB524B", color: "white" }}
                  /*onClick={deleteTrip}*/
                >
                  Xóa chuyến đi
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </TripForm>

      <div className={styles.tripInfoWrapper}>
        <div className={styles.editButtonWrapper}>
          <button
            className={styles.buttons}
            onClick={() => setButtonPopup(true)}
          >
            Chỉnh sửa
            <span></span>
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className={styles.tripTitle}>Chuyến đi {trip.id}</div>
          <div className={styles.tripTitle} style={{ color: "#2474E5" }}>
            Còn chỗ
          </div>
        </div>
        <div className={styles.tripInfo}>
          <div style={{ display: "flex" }}>
            {/* Chuyến xe mang biển số&nbsp;{" "} */}
            <div style={{ fontWeight: "bold" }}>
              {trip.busType}
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
                <circle cx="7" cy="7" r="7" stroke="none"></circle>
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
                  {tripStartTime}
                </div>
                <div class="place">• {tripStartDate}</div>
                <div class="place">• {trip.stopPoints[0].name}</div>
              </div>
              {trip.stopPoints.slice(1).map((stopPoint, index) => (
                <>
                  <div style={{ color: "#A1A1A1" }}>&nbsp;</div>
                  <div className={styles.contentTrip}>
                    <div
                      style={{
                        color: "#707070",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {stopPoint.time.slice(11, 16)}
                    </div>
                    <div class="place">• {"Ngày " +
                                            stopPoint.time.slice(8, 10) +
                                            "/" +
                                            stopPoint.time.slice(5, 7) +
                                            "/" +
                                            stopPoint.time.slice(0, 4)
                                          }</div>
                    <div class="place">• {stopPoint.name}</div>
                  </div>
                </>
              ))}
              {/* <div style={{ color: "#A1A1A1" }}>{tripTime}</div>
              <div className={styles.contentTrip}>
                <div
                  style={{
                    color: "#707070",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {tripEndTime}
                </div>
                <div class="place">• {tripEndDate}</div>
                <div class="place">• {trip.stopPoints[1].name}</div>
              </div> */}
              {/* <div style={{ color: "#A1A1A1" }}>{tripTime}</div>
              <div className={styles.contentTrip}>
                <div
                  style={{
                    color: "#707070",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {tripEndTime}
                </div>
                <div class="place">• {tripEndDate}</div>
                <div class="place">• {trip.stopPoints[1].name}</div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trip;
