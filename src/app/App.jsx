import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../pages/Home";
import Registrasi from "../pages/Registrasi";
import Login from "../pages/Login";
import ProtectedRoute from "../components/shared/ProtectedRoute";
import Layout from "../components/shared/Layout";
import TopUp from "../pages/TopUp";
import Transaction from "../pages/Transaction";
import History from "../pages/History";
import Profile from "../pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <Layout /> {/* Shared layout for authenticated users */}
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/topup" element={<TopUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transaction/:itemName" element={<Transaction />} />
          <Route path="/transaction/history" element={<History />} />
        </Route>
        <Route path="/registrasi" element={<Registrasi />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
