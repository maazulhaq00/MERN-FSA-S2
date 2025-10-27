import { useEffect } from "react";

function ClassDetails() {
  useEffect(() => {
    const bgElements = document.querySelectorAll("[data-setbg]");
    bgElements.forEach((el) => {
      const bg = el.getAttribute("data-setbg");
      el.style.backgroundImage = `url(${bg})`;
    });
  }, []);
    return ( 
<>
  <section
    className="breadcrumb-section set-bg"
    data-setbg="img/breadcrumb-bg.jpg"
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <div className="breadcrumb-text">
            <h2>Classes detail</h2>
            <div className="bt-option">
              <a href="./index.html">Home</a>
              <a href="#">Classes</a>
              <span>Body building</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Breadcrumb Section End */}
  {/* Class Details Section Begin */}
  <section className="class-details-section spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div className="class-details-text">
            <div className="cd-pic">
              <img src="img/classes/class-details/class-detailsl.jpg" alt="" />
            </div>
            <div className="cd-text">
              <div className="cd-single-item">
                <h3>Body buiding</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua accusantium doloremque laudantium. Excepteur sint
                  occaecat cupidatat non proident sculpa.
                </p>
              </div>
              <div className="cd-single-item">
                <h3>Trainer</h3>
                <p>
                  Dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi
                  ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur officia deserunt mollit.
                </p>
              </div>
            </div>
            <div className="cd-trainer">
              <div className="row">
                <div className="col-md-6">
                  <div className="cd-trainer-pic">
                    <img
                      src="img/classes/class-details/trainer-profile.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="cd-trainer-text">
                    <div className="trainer-title">
                      <h4>Athart Rachel</h4>
                      <span>Gym Trainer</span>
                    </div>
                    <div className="trainer-social">
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fa fa-youtube-play" />
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram" />
                      </a>
                      <a href="#">
                        <i className="fa  fa-envelope-o" />
                      </a>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua viverra maecenas lacus vel facilisis.
                    </p>
                    <ul className="trainer-info">
                      <li>
                        <span>Age</span>35
                      </li>
                      <li>
                        <span>Weight</span>148lbs
                      </li>
                      <li>
                        <span>Height</span>10' 2``
                      </li>
                      <li>
                        <span>Occupation</span>no-founder
                      </li>
                    </ul>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua viverra maecenas lacus vel facilisis.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-8">
          <div className="sidebar-option">
            <div className="so-categories">
              <h5 className="title">Categories</h5>
              <ul>
                <li>
                  <a href="#">
                    Yoga <span>12</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    Runing <span>32</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    Weightloss <span>86</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    Cario <span>25</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    Body buiding <span>36</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    Nutrition <span>15</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="so-latest">
              <h5 className="title">Latest posts</h5>
              <div
                className="latest-large set-bg"
                data-setbg="img/letest-blog/latest-1.jpg"
              >
                <div className="ll-text">
                  <h5>
                    <a href="#">
                      This Japanese Way of Making Iced Coffee Is a Game...
                    </a>
                  </h5>
                  <ul>
                    <li>Aug 20, 2019</li>
                    <li>20 Comment</li>
                  </ul>
                </div>
              </div>
              <div className="latest-item">
                <div className="li-pic">
                  <img src="img/letest-blog/latest-2.jpg" alt="" />
                </div>
                <div className="li-text">
                  <h6>
                    <a href="#">Grilled Potato and Green Bean Salad</a>
                  </h6>
                  <span className="li-time">Aug 15, 2019</span>
                </div>
              </div>
              <div className="latest-item">
                <div className="li-pic">
                  <img src="img/letest-blog/latest-3.jpg" alt="" />
                </div>
                <div className="li-text">
                  <h6>
                    <a href="#">
                      The $8 French Rosé I Buy in Bulk Every Summer
                    </a>
                  </h6>
                  <span className="li-time">Aug 15, 2019</span>
                </div>
              </div>
              <div className="latest-item">
                <div className="li-pic">
                  <img src="img/letest-blog/latest-4.jpg" alt="" />
                </div>
                <div className="li-text">
                  <h6>
                    <a href="#">Ina Garten's Skillet-Roasted Lemon Chicken</a>
                  </h6>
                  <span className="li-time">Aug 15, 2019</span>
                </div>
              </div>
              <div className="latest-item">
                <div className="li-pic">
                  <img src="img/letest-blog/latest-5.jpg" alt="" />
                </div>
                <div className="li-text">
                  <h6>
                    <a href="#">
                      The Best Weeknight Baked Potatoes, 3 Creative Ways
                    </a>
                  </h6>
                  <span className="li-time">Aug 15, 2019</span>
                </div>
              </div>
            </div>
            <div
              className="so-banner set-bg"
              data-setbg="img/sidebar-banner.jpg"
            >
              <h5>Banner 300x300</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Class Details Section End */}
  {/* Class Timetable Section Begin */}
  <section className="class-timetable-section class-details-timetable spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="class-details-timetable_title">
            <h5>Classes timetable</h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="class-timetable details-timetable">
            <table>
              <thead>
                <tr>
                  <th />
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                  <th>Saturday</th>
                  <th>Sunday</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="class-time">6.00am - 8.00am</td>
                  <td
                    className="dark-bg hover-dp ts-meta"
                    data-tsmeta="workout"
                  >
                    <h5>WEIGHT LOOSE</h5>
                    <span>RLefew D. Loee</span>
                  </td>
                  <td className="hover-dp ts-meta" data-tsmeta="fitness">
                    <h5>Cardio</h5>
                    <span>RLefew D. Loee</span>
                  </td>
                  <td
                    className="dark-bg hover-dp ts-meta"
                    data-tsmeta="workout"
                  >
                    <h5>Yoga</h5>
                    <span>Keaf Shen</span>
                  </td>
                  <td className="hover-dp ts-meta" data-tsmeta="fitness">
                    <h5>Fitness</h5>
                    <span>Kimberly Stone</span>
                  </td>
                  <td className="dark-bg blank-td" />
                  <td className="hover-dp ts-meta" data-tsmeta="motivation">
                    <h5>Boxing</h5>
                    <span>Rachel Adam</span>
                  </td>
                  <td
                    className="dark-bg hover-dp ts-meta"
                    data-tsmeta="workout"
                  >
                    <h5>Body Building</h5>
                    <span>Robert Cage</span>
                  </td>
                </tr>
                <tr>
                  <td className="class-time">10.00am - 12.00am</td>
                  <td className="blank-td" />
                  <td
                    className="dark-bg hover-dp ts-meta"
                    data-tsmeta="fitness"
                  >
                    <h5>Fitness</h5>
                    <span>Kimberly Stone</span>
                  </td>
                  <td className="hover-dp ts-meta" data-tsmeta="workout">
                    <h5>WEIGHT LOOSE</h5>
                    <span>RLefew D. Loee</span>
                  </td>
                  <td
                    className="dark-bg hover-dp ts-meta"
                    data-tsmeta="motivation"
                  >
                    <h5>Cardio</h5>
                    <span>RLefew D. Loee</span>
                  </td>
                  <td className="hover-dp ts-meta" data-tsmeta="workout">
                    <h5>Body Building</h5>
                    <span>Robert Cage</span>
                  </td>
                  <td
                    className="dark-bg hover-dp ts-meta"
                    data-tsmeta="motivation"
                  >
                    <h5>Karate</h5>
                    <span>Donald Grey</span>
                  </td>
                  <td className="blank-td" />
                </tr>
                <tr>
                  <td className="class-time">5.00pm - 7.00pm</td>
                  <td
                    className="dark-bg hover-dp ts-meta"
                    data-tsmeta="fitness"
                  >
                    <h5>Boxing</h5>
                    <span>Rachel Adam</span>
                  </td>
                  <td className="hover-dp ts-meta" data-tsmeta="motivation">
                    <h5>Karate</h5>
                    <span>Donald Grey</span>
                  </td>
                  <td
                    className="dark-bg hover-dp ts-meta"
                    data-tsmeta="workout"
                  >
                    <h5>Body Building</h5>
                    <span>Robert Cage</span>
                  </td>
                  <td className="blank-td" />
                  <td
                    className="dark-bg hover-dp ts-meta"
                    data-tsmeta="workout"
                  >
                    <h5>Yoga</h5>
                    <span>Keaf Shen</span>
                  </td>
                  <td className="hover-dp ts-meta" data-tsmeta="motivation">
                    <h5>Cardio</h5>
                    <span>RLefew D. Loee</span>
                  </td>
                  <td
                    className="dark-bg hover-dp ts-meta"
                    data-tsmeta="fitness"
                  >
                    <h5>Fitness</h5>
                    <span>Kimberly Stone</span>
                  </td>
                </tr>
                <tr>
                  <td className="class-time">7.00pm - 9.00pm</td>
                  <td className="hover-dp ts-meta" data-tsmeta="motivation">
                    <h5>Cardio</h5>
                    <span>RLefew D. Loee</span>
                  </td>
                  <td className="dark-bg blank-td" />
                  <td className="hover-dp ts-meta" data-tsmeta="fitness">
                    <h5>Boxing</h5>
                    <span>Rachel Adam</span>
                  </td>
                  <td
                    className="dark-bg hover-dp ts-meta"
                    data-tsmeta="workout"
                  >
                    <h5>Yoga</h5>
                    <span>Keaf Shen</span>
                  </td>
                  <td className="hover-dp ts-meta" data-tsmeta="motivation">
                    <h5>Karate</h5>
                    <span>Donald Grey</span>
                  </td>
                  <td
                    className="dark-bg hover-dp ts-meta"
                    data-tsmeta="fitness"
                  >
                    <h5>Boxing</h5>
                    <span>Rachel Adam</span>
                  </td>
                  <td className="hover-dp ts-meta" data-tsmeta="workout">
                    <h5>WEIGHT LOOSE</h5>
                    <span>RLefew D. Loee</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Class Timetable Section End */}
  {/* Get In Touch Section Begin */}
  <div className="gettouch-section">
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="gt-text">
            <i className="fa fa-map-marker" />
            <p>
              333 Middle Winchendon Rd, Rindge,
              <br /> NH 03461
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="gt-text">
            <i className="fa fa-mobile" />
            <ul>
              <li>125-711-811</li>
              <li>125-668-886</li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="gt-text email">
            <i className="fa fa-envelope" />
            <p>Support.gymcenter@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</>



     );
}

export default ClassDetails;