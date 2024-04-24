import "./App.css";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useState } from "react";
import Booking from "./Components/Booking/Booking";
import Homepage from "./Components/Homepage/Homepage";

// function App() {
//   const [userState, setUserState] = useState({});
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               userState && userState._id ? (
//                 <Profile
//                   setUserState={setUserState}
//                   username={userState.fname}
//                 />
//               ) : (
//                 <Login setUserState={setUserState} />
//               )
//             }
//           ></Route>
//           <Route
//             path="/login"
//             element={<Login setUserState={setUserState} />}
//           ></Route>
//           <Route path="/signup" element={<Register />}></Route>
//           <Route path = "/booking" element={<Booking />}></Route>
//           <Route path = "/slider" element={<RangeSlider />}></Route>
//           <Route path = "/testslider" element={<ToggleableRangeSlider />}></Route>
//           <Route path="/homepage" element={<Homepage />}></Route>

          
//         </Routes>
//       </Router>
//     </div>
//   );
// }

{/* Tớ thay đổi cái này chút để test Homepage, có gì cậu cứ sửa lại nhé! - TAnk */}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/booking" element={<Booking />}></Route>
          <Route path="/homepage" element={<Homepage />}></Route>
          <Route path="/" element ={<Navigate replace to="/homepage"/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
