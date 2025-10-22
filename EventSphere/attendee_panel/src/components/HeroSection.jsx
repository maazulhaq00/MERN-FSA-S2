import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
function HeroSection() {
  // Countdown logic
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-08-12T00:00:00"); // 🔄 Change to your event date
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="hero-section"
        style={{
          backgroundImage: "url('/assets/img/hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="hero-text">
                <span>Join Us at Our Next Big Event — Stay Tuned!</span>
                <h2>
                  Change Your Mind
                  <br /> To Become Success
                </h2>
                <Link to="/expos" className="primary-btn">
                  Exhibitions
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <img src="/assets/img/hero-right.png" alt="Hero Right" />
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN SECTION */}
      <section className="counter-section bg-gradient">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="counter-text">
                <span>Conference Date</span>
                <h3>
                  Count Every Second <br />
                  Until the Event
                </h3>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="cd-timer" id="countdown">
                <div className="cd-item">
                  <span>{timeLeft.days}</span>
                  <p>Days</p>
                </div>
                <div className="cd-item">
                  <span>{timeLeft.hours}</span>
                  <p>Hours</p>
                </div>
                <div className="cd-item">
                  <span>{timeLeft.minutes}</span>
                  <p>Minutes</p>
                </div>
                <div className="cd-item">
                  <span>{timeLeft.seconds}</span>
                  <p>Seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
