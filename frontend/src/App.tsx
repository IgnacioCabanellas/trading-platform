import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import AssetPage from "./pages/AssetPage";
import { ProtectedRoute } from "./components/protectRoute";
import LimitPage from "./pages/LimitPage";
import TradingPairPage from "./pages/TradingPairPage";
import MovementsPage from "./pages/MovementPage";
import UserPage from "./pages/UserPage";
import AssetForm from "./pages/AssetForm";


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/asset" element={<ProtectedRoute><AssetPage /></ProtectedRoute>}/>
          <Route path="/asset-form" element={<ProtectedRoute><AssetForm /></ProtectedRoute>}/>
          <Route path="/limit" element={<ProtectedRoute><LimitPage /></ProtectedRoute>}/>
          <Route path="/user" element={<ProtectedRoute><UserPage /></ProtectedRoute>}/>
          <Route path="/tradingPairPage" element={<ProtectedRoute><TradingPairPage /></ProtectedRoute>}/>
          <Route path="/movements" element={<ProtectedRoute><MovementsPage /></ProtectedRoute>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
