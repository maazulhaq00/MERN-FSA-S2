import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const image = localStorage.getItem("image");

    if (name && email) {
      setUserData({ name, email, image: null });
      setPreviewImage("http://localhost:1308/uploads/" + image);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserData((prev) => ({ ...prev, image: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear any previous errors

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      if (userData.image) {
        formData.append("image", userData.image);
      }

      const res = await axios.put("http://localhost:1308/updateuser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      const { name, email, image, token: newToken, role } = res.data;

      // Update localStorage
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("image", image);
      localStorage.setItem("token", newToken);
      localStorage.setItem("role", role);

      navigate("/profile");
      window.location.reload();
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong while updating profile.");
      }
    }
  };

  return (
    <section className="contact-from-section spad">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-6">
            <div className="section-title">
              <h2>Edit Profile</h2>
              <p>Update your account details</p>
              {error && <p style={{ color: "red" }}>{error}</p>}
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
              <img
                src={previewImage}
                alt="Profile Preview"
                width={120}
                height={120}
                style={{ borderRadius: "50%", marginBottom: "10px" }}
              />

              <input
                type="file"
                className="form-control mb-3"
                onChange={handleFileChange}
                accept="image/*"
              />

              <br />

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="form-control mb-3"
                value={userData.name}
                onChange={handleChange}
              />

               <br />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="form-control mb-3"
                value={userData.email}
                onChange={handleChange}
              />

               <br />

              

              <button className="site-btn" onClick={handleSubmit}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditProfile;
