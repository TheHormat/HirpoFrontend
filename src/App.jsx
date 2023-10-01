import "./App.css";
import "./Responsive.css"
import Login from "./pages/Auth/Login";
import Wizard from "./pages/Wizard/Wizard";
import Verify from "./pages/Auth/Verify";
import ConfirmReset from "./pages/Auth/ConfirmReset";
import PrivateRoute from "./components/PrivateRoute";
import DashBoard from "./pages/DashBoard/DashBoard";
import Signup from "./pages/Auth/Signup";
import SendResetCode from "./pages/Auth/SendResetCode";
import Chart from "./pages/Chart/Chart";
import Matrix from "./pages/Matrix";
import SelfChart from "./pages/SelfChart/SelfChart";
import SelfDepartmentEdit from "./pages/SelfDepartment/SelfDepartmentEdit";
import UserPerformance from "./pages/UserPerformance/UserPerformance";
import Loader from "./components/Loader/Loader";
import PerformEdit from "./pages/UserPerformance/PerformEdit";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import UserPerformanceEdit from "./pages/UserPerformance/UserPerformanceEdit";
import UserPerformancePanel from "./pages/UserPerformance/UserPerformancePanel";
import CompetencyFrameWork from "./pages/UserPerformance/CompetencyFrameWork";
import Competency from "./pages/UserPerformance/Competency";
import SelfTodo from "./pages/UserPerformance/SelfTodo";

import UserPanel from "./pages/Users.jsx/UserPanel";
import Projects from "./pages/Projects/Projects";
import User from "./pages/Users.jsx/User";
import UserProjects from "./pages/Users.jsx/UserProjects";
import Weights from "./pages/UserPerformance/Weights";
function App() {
  function LoadingIndicator() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      setIsLoading(true);

      const delay = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => {
        clearTimeout(delay);
      };
    }, [location]);

    if (isLoading) {
      return <Loader />;
    }
    return null;
  }
  const token = localStorage.getItem("access_token");

  return (
    <Router>
      <LoadingIndicator />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wizard" element={<Wizard />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/verify/:userId" element={<Verify />} />
        <Route path="/sendresetcode" element={<SendResetCode />} />
        <Route path="/confirmreset/:id" element={<ConfirmReset />} />
        <Route path="/matrix" element={<Matrix />} />

        <Route path="/selfdepartmentedit" element={<SelfDepartmentEdit />} />
        <Route path="/selfchart" element={<SelfChart />} />
        <Route path="/userperformance" element={<UserPerformance />} />
        <Route path="/userperformanceedit" element={<UserPerformanceEdit />} />
        <Route
          path="/userperformancepanel"
          element={<UserPerformancePanel />}
        />
        <Route
          path="/weights"
          element={<Weights />}
        />
        <Route path="/competencyframework" element={<CompetencyFrameWork />} />
        <Route path="/competency/:id" element={<Competency />} />
        <Route path="/selftodo" element={<SelfTodo />} />
        <Route path="/userpanel/:id" element={<UserPanel />} />
        <Route path="/userproject" element={<UserProjects />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/performedit/:id" element={<PerformEdit />} />
        <Route path="/user" element={<User />} />

      </Routes>
    </Router>
  );
}

export default App;
