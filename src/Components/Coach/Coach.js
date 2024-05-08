import React, { useEffect, useState } from "react";
import styles from "./Coach.module.css";
import { Link, useNavigate } from "react-router-dom";
import Trip from "./Trip";
import Car from "./Car";
import TripForm from "./TripForm";
import axios from "axios";

function convertToStandardDateFormat(datetimeLocal) {
  var standardDate = `${datetimeLocal}:00`;
  console.log(standardDate);
  return standardDate;
}

const Coach = () => {
  const coachName = "{Placeholder}";

  const [buttonPopup, setButtonPopup] = useState(false);
  const [addCarPopup, setAddCarPopup] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const [tripInfo, setTripInfo] = useState({
    starttime: "",
    endtime: "",
    startprovince: {
      pname: "",
    },
    endprovince: {
      pname: "",
    },
    coach: {
      licenseplate: "",
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/identity/api/admin/province")
      .then((response) => {
        console.log(response.data);
        setOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, []);
  const handleProvinceChange = (e) => {
    const selectedOption = options.find(
      (option) => option.pname === e.target.value
    );
    if (e.target.name === "startprovince") {
      setTripInfo({
        ...tripInfo,
        startprovince: {
          pname: e.target.value,
          pid: selectedOption ? selectedOption.pid : "",
        },
      });
    } else if (e.target.name === "endprovince") {
      setTripInfo({
        ...tripInfo,
        endprovince: {
          pname: e.target.value,
          pid: selectedOption ? selectedOption.pid : "",
        },
      });
    }
  };

  const handleChange = (e) => {
    setTripInfo({ ...tripInfo, [e.target.name]: e.target.value });
    if (e.target.name == "starttime") {
      setTripInfo({
        ...tripInfo,
        starttime: convertToStandardDateFormat(e.target.value),
      });
      console.log(convertToStandardDateFormat(e.target.value));
    }
    if (e.target.name == "endtime")
      setTripInfo({
        ...tripInfo,
        endtime: convertToStandardDateFormat(e.target.value),
      });
    if (e.target.name == "licenseplate")
      setTripInfo({
        ...tripInfo,
        coach: {
          licenseplate: e.target.value,
        },
      });
    // if (e.target.name == "startprovince-pid")
    //   setTripInfo({
    //     ...tripInfo,
    //     startprovince: {
    //       pid: e.target.value,
    //       pname: tripInfo.startprovince.pname,
    //     },
    //   });
    // if (e.target.name == "startprovince")
    //   setTripInfo({
    //     ...tripInfo,
    //     startprovince: {
    //       pname: e.target.value,
    //       pid: tripInfo.startprovince.pid,
    //     },
    //   });
    // if (e.target.name == "endprovince-pid")
    //   setTripInfo({
    //     ...tripInfo,
    //     endprovince: {
    //       pid: e.target.value,
    //       pname: tripInfo.endprovince.pname,
    //     },
    //   });
    // if (e.target.name == "endprovince")
    //   setTripInfo({
    //     ...tripInfo,
    //     endprovince: {
    //       pname: e.target.value,
    //       pid: tripInfo.endprovince.pid,
    //     },
    //   });
    console.log(tripInfo);
  };

  const addTrip = async () => {
    // var startdatetimeLocal = document.getElementsByName("starttime").value;
    // var startstandardDate = convertToStandardDateFormat(startdatetimeLocal);
    // var enddatetimeLocal = document.getElementsByName("endtime").value;
    // var endstandardDate = convertToStandardDateFormat(enddatetimeLocal);
    console.log(tripInfo);
    axios
      .post("http://localhost:8080/identity/api/admin/add/trip", tripInfo)
      .then((res) => {
        alert("thanh cong ");
      });

    console.log(tripInfo);
    setButtonPopup(false);
    setTripInfo({
      starttime: "",
      endtime: "",

      startprovince: {
        pid: "",
        pname: "",
      },
      endprovince: {
        pid: "",
        pname: "",
      },
      coach: {
        licenseplate: "",
      },
    });
  };

  // const AddTrip = (e) => {
  //     e.preventDefault();
  //
  // };
  //
  // useEffect(() => {
  //     {
  //
  //         axios.post("http://localhost:8080/api/admin/add/trip", tripInfo).then((res) => {
  //             alert(res.data.message);
  //
  //
  //         });
  //     }
  // }, []);

  const Trips = [
    {
      id: 1,
      licenseplate: "29-12345",
      remainingSeat: 12,
      startTime: "2024-05-07T05:15:00",
      endTime: "2024-05-07T06:45:00",
      startPlace: "Hà Lội",
      endPlace: "Nha Chang",
    },
    {
      id: 2,
      licenseplate: "47-12345",
      remainingSeat: 3,
      startTime: "2024-05-07T05:15:00",
      endTime: "2024-05-07T06:45:00",
      startPlace: "Hà Lội",
      endPlace: "Nha Chang",
    },
    {
      id: 3,
      licenseplate: "29-45678",
      remainingSeat: 5,
      startTime: "2024-05-07T05:15:00",
      endTime: "2024-05-07T06:45:00",
      startPlace: "Hà Lội",
      endPlace: "Xài Gòn",
    },
    {
      id: 4,
      licenseplate: "29-12345",
      remainingSeat: 14,
      startTime: "2024-05-07T05:15:00",
      endTime: "2024-05-07T06:45:00",
      startPlace: "Xài Gòn",
      endPlace: "Lam Định",
    },
  ];

  const Cars = [
    {
      licenseplate: "29-12345",
      type: "45",
    },
    {
      licenseplate: "47-45678",
      type: "15",
    },
    {
      licenseplate: "36-01234",
      type: "30",
    },
    {
      licenseplate: "29-34567",
      type: "45",
    },
  ];

  return (
    <div>
      <button
        className={`${styles.addTripButton} ${styles.buttons}`}
        onClick={() => setButtonPopup(true)}
      >
        Thêm chuyến xe
        <span></span>
      </button>

      <TripForm trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div style={{ width: "100%" }}>
          <div className={styles.infoBoxWrapper}>
            <div className={styles.infoBoxTitle}>Thông tin chuyến xe</div>
            <form className={styles.infoBoxForm}>
              <div className={styles.places}>
                <div className={styles.inputContainer}>
                  <label className={styles.title}>Tên tỉnh đi*</label>
                  <select
                    defaultValue={tripInfo.startprovince.pname}
                    name="startprovince"
                    onChange={handleProvinceChange}
                  >
                    {options.map((option) => (
                      <option key={option.pid} value={option.pname}>
                        {option.pname}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.title}>Tên tỉnh đến*</label>
                  <select
                    defaultValue={tripInfo.endprovince.pname}
                    name="endprovince"
                    onChange={handleProvinceChange}
                  >
                    {options.map((option) => (
                      <option key={option.pid} value={option.pname}>
                        {option.pname}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.times}>
                <div className={styles.inputContainer}>
                  <label className={styles.title}>Thời gian đi*</label>
                  <input
                    type="datetime-local"
                    className={styles.input}
                    name="starttime"
                    onChange={handleChange}
                    value={tripInfo.starttime}
                  ></input>
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.title}>Thời gian đến*</label>
                  <input
                    type="datetime-local"
                    className={styles.input}
                    name="endtime"
                    onChange={handleChange}
                    value={tripInfo.endtime}
                  ></input>
                </div>
              </div>

              <div className={styles.types}>
                <div className={styles.inputContainer}>
                  <label className={styles.title}>Biển số xe*</label>
                  <input
                    type="text"
                    className={styles.input}
                    name="licenseplate"
                    onChange={handleChange}
                    value={tripInfo.licenseplate}
                    style={{ width: "400px" }}
                  ></input>
                </div>
              </div>
            </form>

            <div className={styles.searchButton}>
              <button
                className={styles.buttons}
                id={styles.searchButton}
                onClick={addTrip}
              >
                Tạo chuyến xe
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </TripForm>

      <div className={styles.navbar}>
        <div className={styles.headerLeft}></div>
        <ul className={styles.headerRight}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <li>Bạn đang đăng nhập dưới tư cách</li>
            <li style={{ fontSize: "16px", color: "#FFD333" }}>
              NHÀ XE {coachName}
            </li>
          </div>
          <div className={styles.signInButton}>
            <button className={styles.buttons}>
              <i className="material-icons-round">phone</i>
              Hotline 24/7
              <span></span>
            </button>
            <Link to="/homepage">
              <button className={styles.buttons}>
                Đăng xuất
                <span></span>
              </button>
            </Link>
          </div>
        </ul>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "1000px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "40px",
            }}
          >
            <div
              style={{ display: "flex", gap: "40px", flexDirection: "column" }}
            >
              {Trips.map((trip, i) => {
                return (
                  <Trip
                    key={i}
                    // id={trip.id}
                    // seatType={trip.seatType}
                    // remainingSeat={trip.remainingSeat}
                    // startTime={trip.startTime}
                    // endTime={trip.endTime}
                    // startPlace={trip.startPlace}
                    // endPlace={trip.endPlace}
                    trip={trip}
                  />
                );
              })}
            </div>
            <div className={styles.rightWrapper}>
              <div className={styles.money}>
                <div className={styles.moneyWrapper}>
                  <div className={styles.tripTitle}>Thống kê nhà xe</div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Số chuyến đi hiện có{" "}
                    <div style={{ fontWeight: "bold" }}>
                      {Trips.length} chuyến
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Số xe hiện có{" "}
                    <div style={{ fontWeight: "bold" }}>{"placeholder"} xe</div>
                  </div>
                </div>
              </div>

              <div className={styles.money}>
                <div className={styles.moneyWrapper}>
                  <div className={styles.tripTitle}>Các xe khách hiện có</div>

                  <div>
                    {Cars.map((car, i) => {
                      return <Car key={i} car={car} />;
                    })}
                  </div>

                  <button
                    className={`${styles.addCoachButton} ${styles.buttons}`}
                    onClick={() => setAddCarPopup(true)}
                  >
                    Thêm xe khách
                    <span></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coach;
