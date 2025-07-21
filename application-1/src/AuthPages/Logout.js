import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout();
    // Slight delay for UX (optional)
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 500);
  }, [onLogout, navigate]);

  return (
    <div className="addTask" style={{ textAlign: "center", paddingTop: "60px" }}>
      <h2>You have been logged out.</h2>
      <p>Redirecting to login page...</p>
    </div>
  );
};

export default Logout;
