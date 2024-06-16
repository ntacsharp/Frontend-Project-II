import "./App.css";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Booking from "./Components/Booking/Booking";
import Homepage from "./Components/Homepage/Homepage";
import Payment from "./Components/Payment/Payment";
import Coach from "./Components/Coach/Coach";
import LoginCoach from "./Components/Login/LoginCoach";
import RegisterCoach from "./Components/Register/RegisterCoach";
import AdminLogin from "./Components/Login/AdminLogin";
import AdminRegister from "./Components/Register/AdminRegister";
import Ticket from "./Components/Ticket/Ticket";

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

{
  /* Tớ thay đổi cái này chút để test Homepage, có gì cậu cứ sửa lại nhé! - TAnk */
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/adminsignup" element={<AdminRegister />}></Route>
          <Route path="/booking" element={<Booking />}></Route>
          <Route path="/homepage" element={<Homepage />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/coach" element={<Coach />}></Route>
          <Route path="/logincoach" element={<LoginCoach />}></Route>
          <Route path="/registercoach" element={<RegisterCoach />}></Route>
          <Route path="/" element={<Navigate replace to="/homepage" />}></Route>
          <Route path="/ticket" element={<Ticket />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
