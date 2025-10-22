

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AttendeeProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const imageUrl = "http://localhost:1308/uploads/";

  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const image = localStorage.getItem("image");

    console.log("Image in localStorage:", image); // ✅ For Debugging

    if (!name || !email) {
      navigate("/login");
    } else {
      setUser({
        name: name || "",
        email: email || "",
        image: image || "",
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  if (!user) return null;

  return (
    <section className="contact-from-section spad">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-6">
            <div
              className="profile-card"
              style={{
                padding: "20px",
                boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={
                  user.image
                    ? `${imageUrl}${user.image}`
                    : "/default-avatar.png"
                }
                alt={user.name}
                width={120}
                height={120}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "15px",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-avatar.png";
                }}
              />

              <h4 style={{ fontWeight: "bold", marginBottom: "5px" }}>
                {user.name}
              </h4>
              <p style={{ color: "#666" }}>{user.email}</p>

              <div className="d-flex flex-column align-items-center gap-2 mt-3 w-100">
                <Link to="/editprofile" className="site-btn w-100 text-center">
                  Edit Profile
                </Link>
                <br />
                <Link to="/changepassword" className="site-btn w-100 text-center">
                  Change Password
                </Link>
                <br />
                <button
                  onClick={handleLogout}
                  className="site-btn w-100 text-center"
                  style={{ backgroundColor: "#f9488b" }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AttendeeProfile;
