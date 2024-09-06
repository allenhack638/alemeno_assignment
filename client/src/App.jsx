import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./components/Home.jsx";
import CourseDetails from "./components/CourseDetails.jsx";
import UserDashboard from "./components/UserDashboard.jsx";
import { fetchCourses } from "./redux/actions/courseActions";

import { useDispatch } from "react-redux";
import useSocket from "./hooks/useSocket.js";
import PageNotFound from "./components/ErrorCards/PageNotFound.jsx";

function App() {
  const dispatch = useDispatch();
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home socket={socket} isConnected={isConnected} />}
        />
        <Route
          path="/course/:id"
          element={<CourseDetails socket={socket} isConnected={isConnected} />}
        />
        <Route
          path="/dashboard"
          element={<UserDashboard socket={socket} isConnected={isConnected} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
