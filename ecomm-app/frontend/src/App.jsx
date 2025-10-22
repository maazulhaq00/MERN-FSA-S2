import Navbar from "./components/Navbar";
import AddCategory from "./views/AddCategory";
import Dashboard from "./views/Dashboard";
import DisplayCategory from "./views/DisplayCategory"

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return ( 
  <>
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={ <Dashboard /> } />
      <Route path="/add-category" element={ <AddCategory /> } />
      <Route path="/display-category" element={ <DisplayCategory /> } />
    </Routes>
  </Router>

  </>
   );
}

export default App;