// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Stack,
//   Alert,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const EditCompanyProfile = () => {
//   const [form, setForm] = useState({
//     companyName: "",
//     email: "",
//     contactNumber: "",
//     productsServices: "",
//     description: "",
//     logo: null,
//     existingLogo: "",
//     exhibitorId: "", // <-- Needed for PUT request
//   });

//   const [loading, setLoading] = useState(true);
//   const [alert, setAlert] = useState({ message: "", type: "" });
//   const navigate = useNavigate();

//   // Fetch current exhibitor profile
//   const fetchExhibitorProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const email = localStorage.getItem("email");
//       const userId = localStorage.getItem("userId");

//       const res = await axios.get(`http://localhost:1308/exhibitor/profile/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });

//       const data = res.data.exhibitor;

//       setForm((prev) => ({
//         ...prev,
//         companyName: data.companyName || "",
//         email: email || "",
//         contactNumber: data.contactNumber || "",
//         productsServices: data.productsServices || "",
//         description: data.description || "",
//         existingLogo: data.logo || "",
//         exhibitorId: userId || "",
//       }));
//     } catch (err) {
//       console.error("Error fetching exhibitor profile", err);
//       setAlert({ message: "Failed to load profile", type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchExhibitorProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setForm((prev) => ({ ...prev, logo: e.target.files[0] }));
//   };

//   const handleSubmit = async () => {
//     const {
//       companyName,
//       email,
//       contactNumber,
//       productsServices,
//       description,
//       logo,
//       exhibitorId,
//     } = form;

//     if (!exhibitorId) {
//       setAlert({ message: "Exhibitor ID not found", type: "error" });
//       return;
//     }

//     if (!companyName || !email || !contactNumber || !productsServices) {
//       setAlert({ message: "Please fill all required fields", type: "error" });
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const emaill = localStorage.getItem("email");

//       const formData = new FormData();
//       formData.append("companyName", companyName);
//       formData.append("email", emaill);
//       formData.append("contactNumber", contactNumber);
//       formData.append("productsServices", productsServices);
//       formData.append("description", description);
//       if (logo) formData.append("logo", logo);

//       await axios.put(`http://localhost:1308/exhibitor/${exhibitorId}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//         withCredentials: true,
//       });

//       setAlert({ message: "Profile updated successfully", type: "success" });
//       setTimeout(() => navigate("/dashboard/exhibitorprofileupdated"), 1500);
//     } catch (err) {
//       console.error("Update error", err);
//       setAlert({ message: "Update failed", type: "error" });
//     }
//   };

//   if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

//   return (
//     <Box sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
//       <Typography variant="h5" mb={2}>
//         Edit Company Profile
//       </Typography>

//       {alert.message && <Alert severity={alert.type}>{alert.message}</Alert>}

//       <Stack spacing={2}>
//         <TextField
//           label="Company Name"
//           name="companyName"
//           value={form.companyName}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           label="Contact Number"
//           name="contactNumber"
//           value={form.contactNumber}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           label="Products / Services"
//           name="productsServices"
//           value={form.productsServices}
//           onChange={handleChange}
//           fullWidth
//           multiline
//         />
//         <TextField
//           label="Description"
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           fullWidth
//           multiline
//         />
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         {form.existingLogo && (
//           <img
//             src={`http://localhost:1308/exhibitoruploads/${form.existingLogo}`}
//             alt="Current Logo"
//             width={100}
//             style={{ marginTop: "10px" }}
//           />
//         )}
//         <Button variant="contained" onClick={handleSubmit}>
//           Save Changes
//         </Button>
//       </Stack>
//     </Box>
//   );
// };

// export default EditCompanyProfile;

import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditCompanyProfile = () => {
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    contactNumber: "",
    productsServices: "",
    description: "",
    logo: null,
    existingLogo: "",
    exhibitorId: "",
  });

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const fetchExhibitorProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const email = localStorage.getItem("email");

      if (!userId) {
        setAlert({ message: "User ID missing. Please login again.", type: "error" });
        setLoading(false);
        return;
      }

      const res = await axios.get('http://localhost:1308/exhibitor/profile', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const data = res.data.exhibitor;

      setForm((prev) => ({
        ...prev,
        companyName: data.companyName || "",
        email: email || "",
        contactNumber: data.contactNumber || "",
        productsServices: data.productsServices || "",
        description: data.description || "",
        existingLogo: data.logo || "",
        exhibitorId: userId,
      }));
    } catch (err) {
      console.error("Error fetching exhibitor profile", err);
      setAlert({ message: "Failed to load profile", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExhibitorProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, logo: e.target.files[0] }));
  };

  const handleSubmit = async () => {
    const {
      companyName,
      email,
      contactNumber,
      productsServices,
      description,
      logo,
      exhibitorId,
    } = form;

    if (!exhibitorId) {
      setAlert({ message: "Exhibitor ID not found", type: "error" });
      return;
    }

    if (!companyName || !email || !contactNumber || !productsServices) {
      setAlert({ message: "Please fill all required fields", type: "error" });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("companyName", companyName);
      formData.append("email", email);
      formData.append("contactNumber", contactNumber);
      formData.append("productsServices", productsServices);
      formData.append("description", description);
      if (logo) formData.append("logo", logo);

      await axios.put(`http://localhost:1308/exhibitor/${exhibitorId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      setAlert({ message: "Profile updated successfully", type: "success" });
      setTimeout(() => navigate("/dashboard/exhibitorprofileupdated"), 1500);
    } catch (err) {
      console.error("Update error", err);
      setAlert({ message: "Update failed", type: "error" });
    }
  };

  if (loading) {
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
  }

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
      <Typography variant="h5" mb={2}>
        Edit Company Profile
      </Typography>

      {alert.message && <Alert severity={alert.type}>{alert.message}</Alert>}

      <Stack spacing={2}>
        <TextField
          label="Company Name"
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Contact Number"
          name="contactNumber"
          value={form.contactNumber}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Products / Services"
          name="productsServices"
          value={form.productsServices}
          onChange={handleChange}
          fullWidth
          multiline
        />
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          multiline
        />

        <input type="file" accept="image/*" onChange={handleFileChange} />

        {form.existingLogo && (
          <img
            src={`http://localhost:1308/exhibitoruploads/${form.existingLogo}`}
            alt="Current Logo"
            width={100}
            style={{ marginTop: "10px" }}
          />
        )}

        <Button variant="contained" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
};

export default EditCompanyProfile;


