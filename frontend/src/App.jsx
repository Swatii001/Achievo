import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Task from "./pages/Task";
import TaskCard from "./components/TaskCard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./components/Welcome";
import { saveProfile } from "./redux/actions/authActions";
import NotFound from "./pages/NotFound";
import Completed from "./pages/Completed";
import Dashboard from "./pages/Dashboard";
import TasksSidebar from "./pages/TasksSidebar";
import InProgress from "./pages/InProgress";
import ToDo from "./pages/ToDo";
import Trash from "./pages/Trash";

function App() {
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    dispatch(saveProfile(token));
  }, [authState.isLoggedIn, dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={authState.isLoggedIn ? <Navigate to="/" /> : <Signup />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/welcome"
            element={
              authState.isLoggedIn ? <Welcome /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/tasks/add"
            element={
              authState.isLoggedIn ? (
                <Task />
              ) : (
                <Navigate to="/login" state={{ redirectUrl: "/tasks/add" }} />
              )
            }
          />
          <Route
            path="/tasks/:taskId"
            element={
              authState.isLoggedIn ? (
                <Task />
              ) : (
                <Navigate
                  to="/login"
                  state={{ redirectUrl: window.location.pathname }}
                />
              )
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stats" element={<TaskCard />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/tasks" element={<TasksSidebar />} />
          <Route path="/in-progress" element={<InProgress />} />
          <Route path="/todo" element={<ToDo />} />
          <Route path="/trash" element={<Trash />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
