import React, { useEffect, useState } from "react";
import styles from "./Coach.module.css";
import { Link, useNavigate } from "react-router-dom";
import Trip from "./Trip";
import Car from "./Car";
import TripForm from "./TripForm";
import CarForm from "./CarForm";
import axios from "axios";
import AdminAccount from "./AdminAccount";

function convertToStandardDateFormat(datetimeLocal) {
  var standardDate = `${datetimeLocal}:00`;
  console.log(standardDate);
  return standardDate;
}

const Coach = () => {
  const [adminInfo, setAdminInfo] = useState({});

  const [buttonPopup, setButtonPopup] = useState(false);
  const [carButtonPopup, setCarButtonPopup] = useState(false);
  const [provinces, setProvinces] = useState([]);

  const [carInfo, setCarInfo] = useState({
    licenseplate: "",
    coachtype: "Xe 24 chỗ",
    number: 24,
  });
  const [car, setCar] = useState([]);

  const [tripInfo, setTripInfo] = useState({
    busTypeId: "",
    stopPoint: [
      {
        stopPointId: "",
        time: ""
      }
    ],
    utilities: [ 
    ]
  });

  const [trip, setTrip] = useState([]);

  const carTypeOptions = ["Xe 24 chỗ", "Xe 29 chỗ", "Xe 35 chỗ", "Xe 45 chỗ"];


  const [stopPoints, setStopPoints] = useState([
    {}
  ])

  const handleStopAdd = () =>{
    const newStopPoint = {
      stopPointId: "",
      time: ""
    };

    setTripInfo(preTripInfo => ({
      ...preTripInfo,
      stopPoint: [...preTripInfo.stopPoint, newStopPoint]
    }))

    setStopPoints([...stopPoints, {}])
  }


  const token = sessionStorage.getItem("token");

  async function getAdminInfo() {
    try {
      const response = await axios.get(
        `API Get Coach`
      );
      const data = response.data;
      console.log(data);
      setAdminInfo(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getAdminInfo();
    };
    fetchData();
  }, []);

  console.log(adminInfo);

  useEffect(() => {
    axios
      .get(`API Get Cars`)
      .then((response) => {
        console.log(">>>>>>>>data", response.data);
        setCar(response.data);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`API Get Trip`)
      .then((response) => {
        console.log(response.data);
        setTrip(response.data);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/province")
      .then((response) => {
        setProvinces(response.data.items);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, []);

  console.log(provinces);

  const handleProvinceChange = (e, index) => {
    const selectedOption = provinces.find(
      (option) => option._id === e.target.value
    );

    const currentStopPoint = tripInfo.stopPoint || [];

    const updatedStopPoint = currentStopPoint;

    updatedStopPoint[index].stopPointId = selectedOption._id;

    setTripInfo((prevTripInfo) => ({
      ...prevTripInfo,
      stopPoint: updatedStopPoint
    }));

    console.log(tripInfo);
  };

  // const handleEndProvinceChange = (e) => {
  //   const selectedOption = provinces.find(
  //     (option) => option._id === e.target.value
  //   );

  //   const currentStopPoint = tripInfo.stopPoint || [];

  //   const updatedStopPoint = [...currentStopPoint];

  //   updatedStopPoint[updatedStopPoint.length - 1] = {
  //     stopPointId: e.target.value,
  //   };

  //   setTripInfo((prevTripInfo) => ({
  //     ...prevTripInfo,
  //     stopPoint: updatedStopPoint
  //   }));
  // };

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
      .post("API Post Trip", tripInfo)
      .then((res) => {
        alert("thanh cong ");
      });

    console.log(tripInfo);
    setButtonPopup(false);
    setTripInfo({
      busTypeId: "",
      stopPoint: [
        {
          stopPointId: "",
          time: ""
        },
        {
          stopPointId: "",
          time: ""
        }
      ],
      utilities: [ 
      ]
    });
  };

  const handleCarChange = (e) => {
    setCarInfo({ ...carInfo, [e.target.name]: e.target.value });
    if (e.target.name === "licenseplate") {
      setCarInfo({
        ...carInfo,
        licenseplate: e.target.value,
      });
    }

    if (e.target.name === "coachtype") {
      setCarInfo({
        ...carInfo,
        coachtype: e.target.value,
        number: parseInt(e.target.value.slice(3, 5)),
      });
    }

    console.log(carInfo);
  };
  const id = adminInfo.adminid;
  const addCar = async () => {
    console.log(carInfo);
    axios
      .post(`API Post Cars`, carInfo)
      .then((res) => {
        alert("thanh cong ");
      });

    console.log(carInfo);
    setCarButtonPopup(false);
    setCarInfo({
      licenseplate: "",
      coachtype: "Xe 24 chỗ",
      number: 24,
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
              {/* <div className={styles.places}>
                <div className={styles.inputContainer}>
                  <label className={styles.title}>Tỉnh xuất phát*</label>
                  <select
                    value={tripInfo.stopPoint[0].stopPointId}
                    name="startprovince"
                    onChange={handleStartProvinceChange}
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {provinces.map((option) => (
                      <option key={option._id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.title}>Thời gian xuất phát*</label>
                  <input
                    type="datetime-local"
                    className={styles.input}
                    name="starttime"
                    onChange={handleChange}
                    value={tripInfo.stopPoint[0].time}
                  ></input>
                </div>

              </div> */}


              {stopPoints.map((singleStop, index) => (
                <>
                      <div key = {index} className={styles.times}>

                        <div className={styles.inputContainer}>
                          <label className={styles.title}>Điểm dừng*</label>
                          <select
                            value={tripInfo.stopPoint[index].stopPointId}
                            name="midprovince"
                            onChange={(e) => handleProvinceChange(e, index)}
                          >
                            <option value="">Chọn tỉnh/thành phố</option>
                            {provinces.map((option) => (
                              <option key={option._id} value={option._id}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className={styles.inputContainer}>
                          <label className={styles.title}>Thời gian đến điểm dừng*</label>
                          <input
                            type="datetime-local"
                            className={styles.input}
                            name="midtime"
                            onChange={handleChange}
                            value={"một cái gì đó"}
                          ></input>
                        </div>
                        
                        {(stopPoints.length > 1) &&
                          (<div>
                            <button>Remove</button>
                          </div>)
                        }
                      </div> 

                  {(stopPoints.length - 1 === index) &&
                    (<div>
                      <button onClick={handleStopAdd}>Add a new Stop</button>
                    </div>)
                  }
                </>

              ))}



              {/* <div className={styles.times}>

                <div className={styles.inputContainer}>
                  <label className={styles.title}>Tỉnh kết thúc*</label>
                  <select
                    value={tripInfo.stopPoint[1].stopPointId}
                    name="endprovince"
                    onChange={handleEndProvinceChange}
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {provinces.map((option) => (
                      <option key={option._id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.title}>Thời gian kết thúc*</label>
                  <input
                    type="datetime-local"
                    className={styles.input}
                    name="endtime"
                    onChange={handleChange}
                    value={tripInfo.stopPoint[1].time}
                  ></input>
                </div>
              </div> */}

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

      <CarForm trigger={carButtonPopup} setTrigger={setCarButtonPopup}>
        <div style={{ width: "100%" }}>
          <div className={styles.infoBoxWrapper}>
            <div className={styles.infoBoxTitle}>Thông tin xe</div>
            <form className={styles.infoBoxForm}>
              <div className={styles.places}>
                <div className={styles.inputContainer}>
                  <label className={styles.title}>Biển số xe*</label>
                  <input
                    className={styles.input}
                    name="licenseplate"
                    onChange={handleCarChange}
                  />
                </div>
              </div>

              <div className={styles.places}>
                <div className={styles.inputContainer}>
                  <label className={styles.title}>Loại xe*</label>
                  <select
                    className={styles.selectInput}
                    onChange={handleCarChange}
                    name="coachtype"
                  >
                    {carTypeOptions.map((option, index) => {
                      return <option key={index}>{option}</option>;
                    })}
                  </select>
                </div>
              </div>
            </form>

            <div className={styles.searchButton}>
              <button
                className={styles.buttons}
                id={styles.searchButton}
                onClick={addCar}
              >
                Tạo xe mới
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </CarForm>

      <div className={styles.navbar}>
        <div className={styles.headerLeft}></div>
        <ul className={styles.headerRight}>
          {/* <div style={{ display: "flex", flexDirection: "column" }}>
            <li>Bạn đang đăng nhập dưới tư cách</li>
            <li style={{ fontSize: "16px", color: "#FFD333" }}>
              NHÀ XE {coachName}
            </li>
          </div> */}
          <div className={styles.signInButton}>
            <button className={styles.buttons}>
              <i className="material-icons-round">phone</i>
              Hotline 24/7
              <span></span>
            </button>

            {/* <button className={styles.buttons} onClick={() => {
                sessionStorage.removeItem('token');
                window.location.replace('/');
                }}>
                Đăng xuất
                <span></span>
              </button> */}

            <div>
              <AdminAccount adminInfo={adminInfo}></AdminAccount>
            </div>
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
              {trip.map((t, i) => {
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
                    trip={t}
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
                      {trip.length} chuyến
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Số xe hiện có{" "}
                    <div style={{ fontWeight: "bold" }}>{car.length} xe</div>
                  </div>
                </div>
              </div>

              <div className={styles.money}>
                <div className={styles.moneyWrapper}>
                  <div className={styles.tripTitle}>Các xe khách hiện có</div>

                  <div>
                    {car.map((c, i) => {
                      return <Car key={i} c={c} />;
                    })}
                  </div>

                  <button
                    className={`${styles.addCoachButton} ${styles.buttons}`}
                    onClick={() => setCarButtonPopup(true)}
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
