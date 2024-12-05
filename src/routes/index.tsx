import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom"
import Layout from "../components/Layout";
import App from "../App";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import HistoryPage from "../pages/History";
import PrintPage from "../pages/Print";
import { SpecificationsProvider } from "../context/SpecificationsContext"
import { Navigate } from "react-router";
  function MyRouter() {
    return (
      <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="login" element={<Layout><LoginPage /></Layout>} />
            <Route path="homepage" element={<Layout><HomePage/></Layout>} />
            <Route path="history" element={<Layout><HistoryPage/></Layout>} />
            <Route path="print" element={<Layout><SpecificationsProvider><PrintPage/></SpecificationsProvider></Layout>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }
  
  export default MyRouter;