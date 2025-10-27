import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const bgElements = document.querySelectorAll("[data-setbg]");
    bgElements.forEach((el) => {
      const bg = el.getAttribute("data-setbg");
      el.style.backgroundImage = `url(${bg})`;
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = "center";
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    if (email == "admin@gmail.com" && password == "admin") {

      window.location.href = "http://localhost:3000/carpatin-dashboard-free"

    }
    else {
      try {
        const res = await axios.post("http://localhost:1001/login", {
          email,
          password,
        });

        // alert("Login successful!");
        console.log("Login Response:", res.data);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: res.data._id,
            name: res.data.name,
            email: res.data.email,
          })

          
        );
        navigate("/")
        window.location.reload();

        // Redirect if needed
        // window.location.href = "/dashboard";

      } catch (err) {
        console.error("Login error:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Login failed. Try again.");
      }
    }


  };

  return (
    <>

      <section
        className="breadcrumb-section set-bg"
        data-setbg="img/breadcrumb-bg.jpg"
        style={{ height: 220 }}
      >
        <div className="container">
          <div className="breadcrumb-text text-center">
            <div className="bt-option"></div>
          </div>
        </div>
      </section>


      <section className="login-section">
        <div className="container">
          <div className="form-wrapper">
            <h3 className="text-center mb-4">Login to Your Account</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="text-center mt-4">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </section>


      <style jsx>{`
        .breadcrumb-section {
          padding: 80px 0 40px;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          color: #fff;
        }

        .breadcrumb-text {
          background-color: rgba(0, 0, 0, 0.6);
          padding: 20px 30px;
          border-radius: 6px;
          display: inline-block;
        }

        .login-section {
          padding: 60px 0;
          background-color: #f8f8f8;
          margin-top: -30px;
        }

        .form-wrapper {
          background: #fff;
          padding: 40px 30px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          max-width: 500px;
          margin: 0 auto;
        }

        input {
          width: 100%;
          padding: 12px;
          margin-top: 15px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        button[type="submit"] {
          padding: 12px 40px;
          background-color: #ff5722;
          border: none;
          color: #fff;
          font-size: 16px;
          font-weight: bold;
          border-radius: 5px;
          transition: 0.3s;
        }

        button[type="submit"]:hover {
          background-color: #e64a19;
        }
      `}</style>
    </>
  );
}

export default Login;
