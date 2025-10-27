import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null, // image file
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
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, image } = formData;
    if (!name || !email || !password || !image) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("password", password);
      data.append("image", image);

      const res = await axios.post("http://localhost:1001/user/signup", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Signup successful:", res.data);
      alert("Signup successful!");

      setFormData({
        name: "",
        email: "",
        password: "",
        image: null,
      });
      navigate("/login")

    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <>

      <section className="breadcrumb-section set-bg" data-setbg="img/breadcrumb-bg.jpg" style={{ height: 220 }}>
        <div className="container">
          <div className="breadcrumb-text text-center"></div>
        </div>
      </section>

      <section className="signup-section">
        <div className="container">
          <div className="form-wrapper">
            <h3 className="text-center mb-4">Create Account</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
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
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
              <div className="text-center mt-4">
                <button type="submit">Sign Up</button>
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

        .signup-section {
          padding: 60px 0;
          background-color: #f8f8f8;
          margin-top: -30px;
        }

        .form-wrapper {
          background: #fff;
          padding: 40px 30px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        input {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
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

export default Signup;
