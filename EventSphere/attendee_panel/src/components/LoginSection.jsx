import { useState } from "react";
import { Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginSection() {
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!credentials.email.trim() || !credentials.password.trim()) {
      setAlert({ message: "Please enter both email and password", type: "error" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:1308/login", credentials);
      const { token, name, email, role , image , userId} = response.data;

      // Save login data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
      localStorage.setItem("image", image);
      
      localStorage.setItem("userId", userId);


    

      // Redirect based on role
      // if (role === "attendee") {
      //   navigate("/");
      // } else if (role === "organizer") {
      //   navigate("/dashboard/default");
      // } else if (role === "exhibitor") {
      //   navigate("/exhibitor/panel");
      // }else {
      //   navigate("/"); // fallback
      // }

      window.location.reload();

    } catch (err) {
      setAlert({
        message: err.response?.data?.message || "Login failed",
        type: "error",
      });
    }
  };

  return (
    <section className="contact-from-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Login to Your Account</h2>
              <p>Access your dashboard and manage your event participation</p>
              {alert.message && <Alert severity={alert.type}>{alert.message}</Alert>}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <form className="comment-form contact-form" onSubmit={handleLogin}>
              <div className="row">
                <div className="col-lg-6 offset-lg-3 mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={credentials.email}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="col-lg-6 offset-lg-3 mb-3">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="col-lg-12 text-center mt-3">
                  <button type="submit" className="site-btn">Login</button>
                
                  <p className="mt-3">
  <a href="/forgotpassword" style={{ color: "#ee8425", fontWeight: "bold", textDecoration: "underline" }}>
    Forgot Password?
  </a>
</p>
<p>
  Don’t have an account?{" "}
  <a href="/signup" style={{ color: "#f9488b", fontWeight: "bold" }}>
    Sign up
  </a>
</p>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginSection;
