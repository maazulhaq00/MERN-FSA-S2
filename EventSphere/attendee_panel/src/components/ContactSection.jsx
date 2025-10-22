


import React, { useState, useEffect } from "react";
import axios from "axios";

function ContactSection() {
  const [formData, setFormData] = useState({
    senderId: "",
    senderName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");

    setFormData((prev) => ({
      ...prev,
      senderId: userId || "",
      senderName: name || "",
      email: email || "",
    }));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { senderId, senderName, email, subject, message } = formData;

    if (!senderName || !email ) {
      setAlert({ type: "error", message: "Please login for contact." });
      return;
    }

    if ( !subject || !message) {
      setAlert({ type: "error", message: "Please fill all required fields." });
      return;
    }

    try {
      const res = await axios.post("http://localhost:1308/api/admincontact/send", formData);
      setAlert({ type: "success", message: res.data.message });

      setFormData((prev) => ({
        ...prev,
        subject: "",
        message: "",
      }));
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to send message.",
      });
    }
  };

  return (
    <section className="contact-from-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <h2>Contact Us By Email!</h2>
              <p>
                Fill out the form below to receive a free and confidential initial consultation.
              </p>
              {alert && (
                <div
                  className={`alert ${
                    alert.type === "error" ? "alert-danger" : "alert-success"
                  } mt-3`}
                >
                  {alert.message}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-12">
            <form className="comment-form contact-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-4 mb-3">
                  <input
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleChange}
                    placeholder="Name"
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="col-lg-4 mb-3">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="col-lg-4 mb-3">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="form-control"
                  />
                </div>
                <div className="col-lg-12 text-center">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className="form-control mb-3"
                    rows="5"
                  />
                  <button type="submit" className="site-btn">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
