import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { authUser } = useContext(AuthContext);
  return (
    <div className="sm:p-4 h-screen flex items-center justify-center">
      <Router>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUp /> : <Navigate to={"/"} />}
          />
        </Routes>
      </Router>

      <Toaster />
    </div>
  );
}

export default App;
