import { useRef, useState } from "react";
import { Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupSection() {

  const navigate = useNavigate();


  const [alert, setAlert] = useState({
        message: "",
        type: "",
    });


  const [userData, setUserData] = useState({
    image: "",
    name: "",
    email: "",
    password: "",
    role: "attendee",
  });

  const fileInputRef = useRef(null);

  function OnhandleInputChange(e) {

    let { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value
    })

  }


  function OnhandleImageInputChange(e) {


    setUserData({
      ...userData,
      image: e.target.files[0]
    })

  }


  async function OnhandleAddUser(e) {
 e.preventDefault();

    if (!userData.image || !userData.name.trim() || !userData.email.trim() || !userData.password.trim() || !userData.role
    ) {
      setAlert({
        message: "Please fill in all fields before submitting",
        type: "error",
      });
      return;
    }


   

    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(userData.email)) {
      setAlert({ message: "Invalid email format", type: "error" });
      return;
    }


    if (userData.password.length < 8) {
  setAlert({ message: "Password must be at least 8 characters", type: "error" });
  return;
}


    try {

      const formData = new FormData();

      formData.append("image", userData.image);
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("role", userData.role);


      await axios.post('http://localhost:1308/regestration', formData)

      setUserData({
        image: '',
        name: '',
        email: '',
        password: '',
        role: 'attendee'

      })

      if (fileInputRef.current) fileInputRef.current.value = null;

      setAlert({
        message: "User registered successfully",
        type: "success"
      })
      console.log("successs")

      navigate('/login')

    }
    catch (err) {
      if (err.response && err.response.data && err.response.data.message) {

        setAlert({
          message: err.response.data.message,
          type: "error",
        });
      } else {

        setAlert({
          message: "Something went wrong!",
          type: "error",
        });
      }

      console.log(err);
    }



  }


  return (
    <section className="contact-from-section spad">
     
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Signup Now</h2>
              <p>Create your account to join the event platform</p>
              {alert && (
  <Alert severity={alert.type}>
    {alert.message}
  </Alert>
)}

            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <form className="comment-form contact-form">
              <div className="row">
                <div className="col-lg-12 mb-3">
                  <input
                    type="file"
                    name='image'
                    onChange={OnhandleImageInputChange}
                    ref={fileInputRef}
                    className="form-control"
                  />
                </div>
                <div className="col-lg-12 mb-3">
                  <input type="text" 
                  placeholder="Full Name"
                   className="form-control"
                   name="name"
                value={userData.name}
                onChange={OnhandleInputChange}
                    />
                </div>
                <div className="col-lg-12 mb-3">
                  <input type="email"
                   placeholder="Email Address"
                    className="form-control"
                    name="email"
                value={userData.email}
                onChange={OnhandleInputChange}
                     />
                </div>
                <div className="col-lg-12 mb-3">
                  <input type="password"
                   placeholder="Password (min 8 characters)"
                    className="form-control"
                     name="password"
                value={userData.password}
                onChange={OnhandleInputChange}
                     />
                </div>
            
                <div className="col-lg-12 text-center mt-3">
                  <button type="submit" onClick={OnhandleAddUser} className="site-btn">Sign Up</button>
                  <p className="mt-3">
                    Already have an account?{" "}
                    <a href="/login" style={{ color: "#ff6600", fontWeight: "bold" }}>
                      Sign in
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>


  );
}

export default SignupSection;