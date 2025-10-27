import { useEffect, useState } from "react";

function Bmicalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const bgElements = document.querySelectorAll("[data-setbg]");
    bgElements.forEach((el) => {
      const bg = el.getAttribute("data-setbg");
      el.style.backgroundImage = `url(${bg})`;
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!height || !weight || isNaN(height) || isNaN(weight)) {
      alert("Please enter valid numeric values for height and weight.");
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const calculatedBmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);

    setBmi(calculatedBmi);

    let bmiStatus = "";
    if (calculatedBmi < 18.5) {
      bmiStatus = "Underweight";
    } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
      bmiStatus = "Healthy";
    } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
      bmiStatus = "Overweight";
    } else {
      bmiStatus = "Obese";
    }

    setStatus(bmiStatus);
  };

  const isActive = (rowStatus) => rowStatus === status;

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
                <h2>BMI calculator</h2>
                <div className="bt-option">
                  <a href="./index.html">Home</a>
                  <a href="#">Pages</a>
                  <span>BMI calculator</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bmi-calculator-section spad">
        <div className="container">
          <div className="row">
            {/* BMI Chart Table */}
            <div className="col-lg-6">
              <div className="section-title chart-title">
                <span>check your body</span>
                <h2>BMI CALCULATOR CHART</h2>
              </div>
              <div className="chart-table">
                <table>
                  <thead>
                    <tr>
                      <th>BMI Range</th>
                      <th>WEIGHT STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={isActive("Underweight") ? "highlight" : ""}>
                      <td className="point">Below 18.5</td>
                      <td>
                        Underweight
                        {isActive("Underweight") && bmi && (
                          <> — Your BMI: <strong>{bmi}</strong></>
                        )}
                      </td>
                    </tr>
                    <tr className={isActive("Healthy") ? "highlight" : ""}>
                      <td className="point">18.5 - 24.9</td>
                      <td>
                        Healthy
                        {isActive("Healthy") && bmi && (
                          <> — Your BMI: <strong>{bmi}</strong></>
                        )}
                      </td>
                    </tr>
                    <tr className={isActive("Overweight") ? "highlight" : ""}>
                      <td className="point">25.0 - 29.9</td>
                      <td>
                        Overweight
                        {isActive("Overweight") && bmi && (
                          <> — Your BMI: <strong>{bmi}</strong></>
                        )}
                      </td>
                    </tr>
                    <tr className={isActive("Obese") ? "highlight" : ""}>
                      <td className="point">30.0 and Above</td>
                      <td>
                        Obese
                        {isActive("Obese") && bmi && (
                          <> — Your BMI: <strong>{bmi}</strong></>
                        )}
                      </td>
                    </tr>

                    {/* 🟢 User Result Row */}
                    {bmi && (
                      <tr className="user-result-row">
                        <td colSpan="2">
                          <strong>Your Input:</strong><br />
                          Height: {height} cm | Weight: {weight} kg<br />
                          BMI: <strong>{bmi}</strong> — Status: <strong>{status}</strong>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* BMI Form */}
            <div className="col-lg-6">
              <div className="section-title chart-calculate-title">
                <span>check your body</span>
                <h2>CALCULATE YOUR BMI</h2>
              </div>
              <div className="chart-calculate-form">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-sm-6">
                      <input
                        type="text"
                        placeholder="Height / cm"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        placeholder="Weight / kg"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-6">
                      <input type="text" placeholder="Age" />
                    </div>
                    <div className="col-sm-6">
                      <input type="text" placeholder="Sex" />
                    </div>
                    <div className="col-lg-12">
                      <button type="submit">Calculate</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
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

      {/* Highlight Style */}
      <style jsx>{`
        .highlight {
          background-color: #ffeaa7;
          font-weight: bold;
        }
        .user-result-row {
          background-color: #dff9fb;
          text-align: center;
        }
      `}</style>
    </>
  );
}

export default Bmicalculator;
