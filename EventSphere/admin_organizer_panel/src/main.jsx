import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// ROOT APP COMPONENT
import App from "./app/App";
// THIRD PARTY CSS
import "perfect-scrollbar/css/perfect-scrollbar.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
  

function ProtectedRoutes({children}) {

  const [ token, setToken ] = useState(localStorage.getItem("token"));

  useEffect(() => {

    console.log(localStorage.getItem("token"))

    setToken(localStorage.getItem("token"))

  }, [])
  return (
    token ? children : <Navigate to="/login" />
  )
}
