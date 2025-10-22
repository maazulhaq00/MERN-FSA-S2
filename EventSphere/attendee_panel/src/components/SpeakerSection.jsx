import { useEffect, useState } from "react";
import axios from "axios";

function SpeakerSection() {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await axios.get("http://localhost:1308/schedule");
        const allSchedules = response.data.schedules || [];

       
                  const uniqueSpeakers = [...new Set(allSchedules.map(item => item.speaker))].slice(0, 10);

   

        setSpeakers(uniqueSpeakers);
      } catch (error) {
        console.error("Error fetching speakers:", error);
      }
    };

    fetchSpeakers();
  }, []);

  return (
    <section className="team-member-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Who’s speaking</h2>
              <p>
                These are our communicators, you can see each person
                information
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Render dynamic speaker cards */}
      {speakers.map((speakerName, index) => (
        <div
          key={index}
          className="member-item"
          style={{
            backgroundImage: `url('/assets/img/team-member/member-${index + 1}.jpg')`,
          }}
        >
          <div className="mi-social">
            <div className="mi-social-inner bg-gradient">
              <a href="#"><i className="fa fa-facebook" /></a>
              <a href="#"><i className="fa fa-instagram" /></a>
              <a href="#"><i className="fa fa-twitter" /></a>
              <a href="#"><i className="fa fa-linkedin" /></a>
            </div>
          </div>
          <div className="mi-text">
            <h5>{speakerName}</h5>
            <span>Speaker</span>
          </div>
        </div>
      ))}
    </section>
  );
}

export default SpeakerSection;
