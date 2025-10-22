import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword.trim() || !newPassword.trim()) {
      setAlert({ message: "Please fill in all fields", type: "error" });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:1308/changepassword",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setAlert({ message: "Password updated successfully", type: "success" });
      setTimeout(() => {
        navigate("/profile");
        window.location.reload();
      }, 1500);
    } catch (error) {
      setAlert({
        message:
          error.response?.data?.message || "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <section className="contact-from-section spad">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-6">
            <div className="section-title">
              <h2>Change Password</h2>
              <p>Secure your account with a new password</p>
              {alert.message && (
                <Alert severity={alert.type} className="mt-3">
                  {alert.message}
                </Alert>
              )}
            </div>

            <div
              className="profile-card"
              style={{
                padding: "20px",
                boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                backgroundColor: "#fff",
              }}
            >
              <form onSubmit={handleSubmit}>
                <input
                  type="password"
                  placeholder="Old Password"
                  className="form-control mb-3"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="form-control mb-3"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit" className="site-btn">
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChangePassword;
