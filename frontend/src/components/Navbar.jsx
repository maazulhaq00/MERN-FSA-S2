import { Link } from "react-router-dom";

function Navbar() {
    return ( 
    <>
    <ul>
        <li>
            <Link to="/">Dashboard</Link>
        </li>
        <li>
            <Link to="/add-category">Create Category</Link>
        </li>
        <li>
            <Link to="/display-category">Categories</Link>
        </li>
    </ul>
    </> 
    );
}

export default Navbar;