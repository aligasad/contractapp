import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader.jsx";
import { auth } from "../../firebase/FirebaseConfig.jsx";
import { useAuth } from "./AuthContext.jsx";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isChecking) return <Loader />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
