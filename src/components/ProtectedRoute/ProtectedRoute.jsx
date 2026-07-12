import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, loggedIn = false }) {
  const location = useLocation();

  if (loggedIn) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
}

export default ProtectedRoute;
