


import { useEffect, useState, useRef } from "react";
import axios from "axios";

function ScheduleSection({ limit, showBookmarkButton = true }) {
  const [schedules, setSchedules] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const [showRegisteredModal, setShowRegisteredModal] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    image: null,
    userId: "",
  });

  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const image = localStorage.getItem("image");
    const userId = localStorage.getItem("userId");
    setUserData({ name, email, image, userId });
  }, []);

  useEffect(() => {
    fetchData();
    fetchBookmarks();
    fetchRegistrations();
  }, [limit]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:1308/schedule");
      let data = res.data.schedules || [];
      if (limit) {
        data = data.slice(0, limit);
      }
      setSchedules(data);
    } catch (error) {
      console.error("Schedule fetch error:", error.message);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const res = await axios.get("http://localhost:1308/schedulebookmark", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      setBookmarkedIds(res.data.bookmarkedScheduleIds || []);
    } catch (err) {
      console.error("Bookmark fetch error:", err.message);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get("http://localhost:1308/attendeeeschedulereg", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      setRegistrations(res.data.registrations || []);
    } catch (err) {
      console.error("Registration fetch error:", err.message);
    }
  };

  const Bookmark = async (scheduleId) => {
    if (!userData.userId) return alert("Please login first to bookmark.");

    try {
      await axios.post(
        "http://localhost:1308/schedulebookmark",
        { scheduleId, userId: userData.userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (bookmarkedIds.includes(scheduleId)) {
        setBookmarkedIds((prev) => prev.filter((id) => id !== scheduleId));
      } else {
        setBookmarkedIds((prev) => [...prev, scheduleId]);
      }
    } catch (error) {
      console.error("Error bookmarking:", error.response?.data || error.message);
    }
  };

  const getRegistrationStatus = (scheduleId) => {
    const reg = registrations.find((r) => r.schedule?._id === scheduleId);
    return reg ? reg.status : null;
  };

  const registeredSchedules = schedules.filter(
  (item) => getRegistrationStatus(item._id) === "approved"
);

  const registerSchedule = async (scheduleId) => {
    if (!userData.userId) {
      alert("Please login to register.");
      return;
    }

    const alreadyRegistered = registrations.find((r) => r.schedule?._id === scheduleId);
    if (alreadyRegistered) {
      alert("You have already registered.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:1308/attendeeeschedulereg",
        { schedule: scheduleId, user: userData.userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Registration submitted (Pending Approval)");
      fetchRegistrations();
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
    }
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const bookmarkedSchedules = schedules.filter((item) => bookmarkedIds.includes(item._id));

  const ScheduleCard = (item) => {
    const status = getRegistrationStatus(item._id);

    return (
      <div className="row justify-content-center mb-4" key={item._id}>
        <div className="col-lg-11 p-4 rounded shadow-sm" style={{ backgroundColor: "#f9f9f9" }}>
          <div className="row align-items-start">
            <div className="col-lg-8">
              <div className="sc-text">
                <h4 className="mb-3" style={{ fontWeight: 600 }}>{item.title}</h4>

                <div className="mb-2" style={{ display: "flex", alignItems: "center" }}>
                  <i className="fa fa-user text-secondary" style={{ marginRight: "8px" }} />
                  <strong style={{ marginRight: "6px" }}>Speaker:</strong>
                  <span>{item.speaker}</span>
                </div>

                <div className="mb-2" style={{ display: "flex", alignItems: "center" }}>
                  <i className="fa fa-book text-secondary" style={{ marginRight: "8px" }} />
                  <strong style={{ marginRight: "6px" }}>Topic:</strong>
                  <span>{item.topic}</span>
                </div>

                <div className="mb-2" style={{ display: "flex", alignItems: "center" }}>
                  <i className="fa fa-calendar text-secondary" style={{ marginRight: "8px" }} />
                  <strong style={{ marginRight: "6px" }}>Expo:</strong>
                  <span>{item.expo?.title || "No Expo"}</span>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mt-3 mt-lg-0">
              <ul className="sc-widget" style={{ listStyle: "none", paddingLeft: 0 }}>
                <li className="mb-2" style={{ display: "flex", alignItems: "center" }}>
                  <i className="fa fa-clock-o text-secondary" style={{ marginRight: "8px" }} />
                  <span>{formatTime(item.startTime)} - {formatTime(item.endTime)}</span>
                </li>
                <li style={{ display: "flex", alignItems: "center" }}>
                  <i className="fa fa-map-marker text-secondary" style={{ marginRight: "8px" }} />
                  <span>
                    {item.location?.name
                      ? item.location.name
                      : item.location?.boothNumber
                        ? `Booth ${item.location.boothNumber}`
                        : "N/A"}
                  </span>
                </li>
              </ul>
            </div>

            <div className="col-lg-12 mt-3">
              <p
                style={{
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                  color: "#333",
                  marginBottom: 0,
                }}
              >
                <strong>Description:</strong> {item.description || "No description"}
              </p>
            </div>

            <div className="col-lg-12 d-flex justify-content-between ml-1 mt-3 flex-wrap">
              <button
                onClick={() => Bookmark(item._id)}
                className="primary-btn"
                style={{
                  border: "none",
                  background: "transparent",
                  boxShadow: "none",
                  padding: 0,
                }}
              >
                <i
                  className={`fa ${bookmarkedIds.includes(item._id) ? "fa-bookmark" : "fa-bookmark-o"}`}
                  style={{
                    color: bookmarkedIds.includes(item._id) ? "#d82a4e" : "#999",
                    fontSize: "22px",
                  }}
                />
              </button>

              <button
                onClick={() => registerSchedule(item._id)}
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
      </div>
    );
  };

  return (
    <section className="schedule-section spad py-5" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center mb-5">
              <h2>Our Schedule</h2>
              <p>Do not miss anything topic about the event</p>
            </div>
          </div>
        </div>

      

{/* <div className="row gx-2 justify-content-center mb-4">
  {showBookmarkButton && (
    
    <div className="col-md-4 mb-2">
      <button
        onClick={() => setShowModal(true)}
        className="primary-btn "
        style={{
          padding: "10px 20px",
          fontWeight: 500,
          borderRadius: "6px",
          backgroundColor: "#d82a4e",
          color: "#fff",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px", // space between icon and text only
        }}
      >
        <i className="fa fa-bookmark" />
        Bookmarked Schedule({bookmarkedIds.length})
      </button>
    </div>
  )}

  {showBookmarkButton && (
    <div className="col-md-3 mb-2">
      <button
        onClick={() => setShowRegisteredModal(true)}
        className="primary-btn "
        style={{
          padding: "10px 20px",
          fontWeight: 500,
          borderRadius: "6px",
          backgroundColor: "#d82a4e",
          color: "#fff",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <i className="fa fa-calendar-check-o" />
        My Registered Schedule
      </button>
    </div>
  )}
</div> */}

<div className="row gx-2 justify-content-center mb-4">
  {showBookmarkButton && userData.userId && (
    <>
      <div className="col-md-4 mb-2">
        <button
          onClick={() => setShowModal(true)}
          className="primary-btn"
          style={{
            padding: "10px 20px",
            fontWeight: 500,
            borderRadius: "6px",
            backgroundColor: "#d82a4e",
            color: "#fff",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <i className="fa fa-bookmark" />
          Bookmarked Schedule ({bookmarkedIds.length})
        </button>
      </div>

      <div className="col-md-3 mb-2">
        <button
          onClick={() => setShowRegisteredModal(true)}
          className="primary-btn"
          style={{
            padding: "10px 20px",
            fontWeight: 500,
            borderRadius: "6px",
            backgroundColor: "#d82a4e",
            color: "#fff",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <i className="fa fa-calendar-check-o" />
          My Registered Schedule
        </button>
      </div>
    </>
  )}
</div>



      

        {schedules.map(ScheduleCard)}
      </div>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 9999 }}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            <div className="modal-content position-relative" ref={modalRef}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "15px",
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  color: "#333",
                  zIndex: 1000,
                }}
                aria-label="Close"
              >
                <i className="fa fa-times" />
              </button>

              <div className="modal-header border-0 pt-4 pb-0">
                <h5 className="modal-title">Bookmarked Schedules</h5>
              </div>

              <div className="modal-body pt-0" style={{ maxHeight: "65vh", overflowY: "auto" }}>
                {bookmarkedSchedules.length > 0 ? (
                  bookmarkedSchedules.map(ScheduleCard)
                ) : (
                  <p>No bookmarked schedules found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}


{showRegisteredModal && (
  <div
    className="modal fade show"
    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 9999 }}
  >
    <div
      className="modal-dialog modal-lg modal-dialog-centered"
      style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      <div className="modal-content position-relative" ref={modalRef}>
        <button
          type="button"
          onClick={() => setShowRegisteredModal(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            background: "none",
            border: "none",
            fontSize: "24px",
            color: "#333",
            zIndex: 1000,
          }}
          aria-label="Close"
        >
          <i className="fa fa-times" />
        </button>

        <div className="modal-header border-0 pt-4 pb-0">
          <h5 className="modal-title">Registered Schedules</h5>
        </div>

        <div className="modal-body pt-0" style={{ maxHeight: "65vh", overflowY: "auto" }}>
          {registeredSchedules.length > 0 ? (
            registeredSchedules.map(ScheduleCard)
          ) : (
            <p>No registered schedules found.</p>
          )}
        </div>
      </div>
    </div>
  </div>
)}



    </section>
  );
}

export default ScheduleSection;


