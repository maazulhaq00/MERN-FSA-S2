import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Preloader from './components/preloader';
import Home from './pages/Home';
import About from './pages/About';
import Schedule from './pages/Schedule';
import Expos from './pages/Expos';
import Booths from './pages/Booths';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Profile from './pages/Profile';
import EditProfile from './components/EditProfile';
import ChangePassword from './components/ChangePassword';
import PrivateRoute from './auth/PrivateRoutes';
import PublicRoute from './auth/PublicRoutes';
import NotFound from './components/404';
import ForgotPassword from './components/forgotpassword';




function App() {
  return (
    <Router>
      <Preloader />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shedules" element={<Schedule />} />
        <Route path="/expos" element={<Expos />} />
        <Route path="/booths" element={<Booths />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/forgotpassword" element={<ForgotPassword />}/>
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/editprofile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
        <Route path="/changepassword" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
        <Route path="/*" element={<NotFound />} />




      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
