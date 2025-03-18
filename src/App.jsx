import { Route, Routes, BrowserRouter as Router, useLocation } from "react-router-dom";
import NavBar from "./componants/NavBar";
import Login from "./pages/Login";
import Roles from "./pages/Roles";
import EditSpecies from "./pages/EditSpecies";
import CreateSpecies from "./pages/CreateSpecies";
import Unauthorized from "./pages/Unauthorized";
import "./App.css"; // Ensure this file contains the required styles
import ProtectedRoute from "./componants/AuthWrapper";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const showNavBar = location.pathname !== "/"; // Hide on login page

  return (
    <div className="app-container">
      {showNavBar && <NavBar />}

      {/* If no navbar, apply 'full-width' to take up full space */}
      <div className={`content ${showNavBar ? "" : "full-width"}`}>
        <Routes>
          <Route path="/" element={<Login />}/>
        
          <Route path="/Users" element={
            <ProtectedRoute requiredRoles={["administrator"]}>
              <Roles />
            </ProtectedRoute>} />
          
          <Route path="/EditSpecies" element={
            <ProtectedRoute requiredRoles={["administrator"]}>
              <EditSpecies />
              </ProtectedRoute>} />
          
          <Route path="/CreateSpecies" element={
            <ProtectedRoute requiredRoles={["administrator"]}>
              <CreateSpecies />
            </ProtectedRoute>} />

          <Route path="/Unauthorized" element={Unauthorized}></Route>
        </Routes>
      </div>
    </div>
  );
}


export default App;
