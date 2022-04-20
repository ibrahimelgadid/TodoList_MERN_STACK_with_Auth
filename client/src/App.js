import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/auth/Register";
import Landing from "./Components/Layouts/Landing";
import Login from "./Components/auth/Login";
import Tasks from "./Components/tasks/Tasks";
import NotFound from "./Components/Layouts/NotFound";
import Navbar from "./Components/Layouts/Navbar";
import { setAuthToken } from "./utitlis/authTokenToHeader";
import jwtDecode from "jwt-decode";
import store from "./ReduxCycle/store";
import { logOutFun, setCurrentUser } from "./ReduxCycle/actions/authActions";
import PrivateRoute from "./Components/Layouts/PrivateRoute";
import AddTask from "./Components/tasks/AddTask";
import Task from "./Components/tasks/Task";
import EditTask from "./Components/tasks/EditTask";

if (localStorage.userInfo) {
  const token = localStorage.getItem("userInfo");
  setAuthToken(token);
  const decoded = jwtDecode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logOutFun());
    window.location.replace("/login");
  }
}

function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-task"
          element={
            <PrivateRoute>
              <AddTask />
            </PrivateRoute>
          }
        />

        <Route
          path="/task/:taskId"
          element={
            <PrivateRoute>
              <Task />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-task/:taskId"
          element={
            <PrivateRoute>
              <EditTask />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
