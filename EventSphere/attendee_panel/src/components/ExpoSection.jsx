

import { useEffect, useState } from "react";
import axios from "axios";

function ExpoSection({ limit = null }) {
  const [expos, setExpos] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("upcoming");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const imageUrl = "http://localhost:1308/uploads/";

  const baseStatuses = ["upcoming", "ongoing", "past"];
  const statuses = token ? [...baseStatuses, "my-registered"] : baseStatuses;

  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const res = await axios.get("http://localhost:1308/expo");
        setExpos(res.data.expos || []);
      } catch (err) {
        console.error("❌ Error fetching expos:", err);
      }
    };

    const fetchRegistrations = async () => {
      try {
        const res = await axios.get("http://localhost:1308/attendeeexporeg", {
          headers: { Authorization: token },
        });
        setRegistrations(res.data.registrations || []);
      } catch (err) {
        console.error("❌ Error fetching registrations:", err);
      }
    };

    fetchExpos();
    if (token) fetchRegistrations();
  }, [token]);

  const getStatusForExpo = (expoId) => {
    const reg = registrations.find((r) => r.expo && r.expo._id === expoId);
    return reg ? reg.status : null;
  };

  const handleRegister = async (expoId) => {
    if (!token) {
      alert("⚠️ Please login to register.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:1308/attendeeexporeg",
        { expo: expoId, user: userId },
        { headers: { Authorization: token } }
      );
      alert("✅ Registration submitted (pending)");

      const res = await axios.get("http://localhost:1308/attendeeexporeg", {
        headers: { Authorization: token },
      });
      setRegistrations(res.data.registrations || []);
    } catch (err) {
      if (err.response?.status === 409) {
        alert("⚠️ Already registered.");
      } else {
        alert("❌ Failed to register.");
        console.error(err);
      }
    }
  };

  const filteredExpos =
    selectedStatus === "my-registered"
      ? expos.filter((expo) =>
          registrations.some(
            (r) => r.expo && r.expo._id === expo._id && r.status === "approved"
          )
        )
      : expos
          .filter((expo) => expo.status === selectedStatus)
          .slice(0, limit ? limit : expos.length);

  return (
    <section className="schedule-section spad">
      <div className="container">
        {/* Title */}
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center mb-5">
              <h2>Our Expo's</h2>
              <p>Explore the latest updates and events from our exhibitions</p>
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="row mb-4">
          <div className="col-lg-12">
            <div className="schedule-tab">
              <ul className="nav nav-tabs justify-content-center" role="tablist">
                {statuses.map((status) => (
                  <li className="nav-item" key={status}>
                    <a
                      className={`nav-link ${selectedStatus === status ? "active" : ""}`}
                      data-toggle="tab"
                      role="tab"
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedStatus(status)}
                    >
                      <h5 style={{ textTransform: "capitalize" }}>
                        {status === "my-registered"
                          ? "My Registered"
                          : status.charAt(0).toUpperCase() + status.slice(1)}
                      </h5>
                      <p>Expo</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Expo Cards */}
        <div className="row">
          {filteredExpos.map((expo, index) => {
            const status = getStatusForExpo(expo._id);

            return (
              <div className="col-lg-4 col-md-6 mb-4" key={index}>
                <div
                  className="card h-100"
                  style={{
                    border: "2px solid grey",
                    borderRadius: "16px",
                    boxShadow: "0 10px 25px rgba(255, 111, 61, 0.15)",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={imageUrl + expo.expoimage}
                    className="card-img-top"
                    alt={expo.title}
                    style={{
                      display: "block",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                      objectFit: "cover",
                      height: "220px",
                      lineHeight: 0,
                    }}
                  />

                  <div className="card-body">
                    <h5 className="card-title mb-3">{expo.title}</h5>
                    <ul className="list-unstyled mb-3">
                      <li className="d-flex align-items-center mb-2">
                        <i className="fa fa-tags me-2 text-muted" style={{ width: "20px" }} />
                        <span><strong>Theme:</strong> {expo.theme}</span>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <i className="fa fa-calendar me-2 text-muted" style={{ width: "20px" }} />
                        <span><strong>Date:</strong> {new Date(expo.date).toLocaleDateString()}</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="fa fa-flag me-2 text-muted" style={{ width: "20px" }} />
                        <span><strong>Status:</strong> {expo.status}</span>
                      </li>
                    </ul>

                    <button
                      onClick={() => handleRegister(expo._id)}
                      className="primary-btn"
                      style={{
                        border: "none",
                        backgroundColor:
                          status === "approved"
                            ? "#ccc"
                            : status === "pending"
                            ? "#ffc107"
                            : status === "rejected"
                            ? "#dc3545"
                            : "#d82a4e",
                        cursor: status ? "not-allowed" : "pointer",
                      }}
                      disabled={!!status}
                    >
                      {status === "approved"
                        ? "Registered"
                        : status === "pending"
                        ? "Pending"
                        : status === "rejected"
                        ? "Rejected by Admin"
                        : "Register"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredExpos.length === 0 && (
            <div className="col-12 text-center py-4">
              <p>No expos available for this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ExpoSection;
