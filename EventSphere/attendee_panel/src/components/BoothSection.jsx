import { useState   , useEffect} from "react";
import axios from "axios";

function BoothSection() {

  const [booths, setBooths] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:1308/booth");
      setBooths(response.data.booths);
    } catch (error) {
      console.error("Error fetching booths:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <section className="schedule-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Our Booths</h2>
              <p>Explore all booths with details and availability</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="schedule-tab">
              <div className="tab-content">
                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                  <div className="st-content">
                    <div className="container">
                      <div className="row justify-content-center">
                        <div className="col-lg-12">
                          <div className="table-responsive">
                            <table
                              className="table text-center"
                              style={{
                                borderCollapse: "collapse",
                                border: "none",
                              }}
                            >
                              <thead>
                               
                                <tr 
                                   style={{
      backgroundImage: "linear-gradient(330deg, #ee8425 0%, #f9488b 100%)",
      color: "#fff"
    }}
                                >
                                  <th>Booth Number</th>
                                  <th>Booth Size</th>
                                  <th>Booth Floor</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
  {booths.map((booth) => (
    <tr key={booth._id} style={{ border: "none" }}>
      <td>{booth.boothNumber}</td>
      <td>{booth.size}</td>
      <td>{booth.floor}</td>
      <td>
        <span
          style={{
            height : "40px",
            color: "white",
            backgroundColor:
              booth.status === "reserved" ? "#ee8425" : "#f9488b",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "14px",
          }}
        >
          {booth.status}
        </span>
      </td>
    </tr>
  ))}
</tbody>






                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> {/* tab-content */}
            </div> {/* schedule-tab */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BoothSection;
