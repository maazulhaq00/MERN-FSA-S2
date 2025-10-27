import { useEffect, useState } from "react";

function Header1() {
  const [user, setuser] = useState()

  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem("user")))
  }, [user]);
  return (
    <>
      {/* Hello world */}
      <style jsx>{`
.secondary-nav {
  padding: 10px 0;
  text-align: center;
}

.secondary-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.secondary-menu li a {
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 14px;
  transition: 0.3s;
}

.secondary-menu li a:hover {
  color: #f15a24; /* same orange as logo or your highlight color */
}

`}</style>
      <header className="header-section">
        <div className="container-fluid">
          {/* Top nav row */}
          <div className="row align-items-center">
            <div className="col-lg-3">
              <div className="logo">
                <a href="/"><img src="img/logo.png" alt="" /></a>
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="nav-menu">
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/About">About Us</a></li>
                  <li><a href="/ClassDetails">Classes</a></li>
                  {/* <li><a href="/Servicess">Services</a></li> */}
                  <li><a href="/Team">Our Team</a></li>
                  {user ? (
                    <li><a href="/Logout">Logout</a></li>
                  ) : (
                    <>
                      <li><a href="/Login">Login</a></li>
                      <li><a href="/signup">Sign up</a></li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="top-option">
                <div className="to-search search-switch"><i className="fa fa-search" /></div>
                <div className="to-social">
                  <a href="#"><i className="fa fa-facebook" /></a>
                  <a href="#"><i className="fa fa-twitter" /></a>
                  <a href="#"><i className="fa fa-youtube-play" /></a>
                  <a href="#"><i className="fa fa-instagram" /></a>
                </div>
              </div>
            </div>
          </div>

          {/* SECOND NAV BAR */}
          {user ? (
          <div className="row mt-2">
            <div className="col-12">
              <nav className="secondary-nav">
                <ul className="secondary-menu">
                  <li><a href="/Bmicalculator">Bmi Calculate</a></li>
                  {/* <li><a href="/Galary">Gallery</a></li> */}
                  {/* <li><a href="/Blogs">Our Blog</a></li> */}
                  {/* <li><a href="*">404</a></li> */}
                  {/* <li><a href="/Contactdetails">Contact</a></li> */}
                  <li><a href="/Exsercisetracker">Exercise Tracker</a></li>
                  <li><a href="/ClassTimetable">Class Timetable</a></li>
                  {/* <li><a href="/signup">Sign Up</a></li> */}
                  {/* <li><a href="/Login">Login</a></li> */}
                  <li><a href="/DisplayExercises">Display Exercises</a></li>
                  <li><a href="/ProgressTracker">Progress Tracker</a></li>
                  <li><a href="/ProgressList">Progress List</a></li>
                  <li><a href="/MealForm">Meal Form</a></li>
                  <li><a href="/Meallist">Meal List</a></li>


                  
                </ul>
              </nav>
            </div>
          </div>
          ) : (<></>) }

          {/* Hamburger icon for mobile */}
          <div className="canvas-open">
            <i className="fa fa-bars" />
          </div>
        </div>
      </header>

    </>

  );
}

export default Header1;