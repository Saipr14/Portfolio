import '../index.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/logout");
  };

  return(
    <div className="navbar-above" id="navbarabove">
      <div className="navbar-scroll">
        <nav className="navbar navbar-expand-lg bg-none">
          <div className="nav-main">
            <div id="navbarNavAltMarkup">
              <div className="custom-navbar">
                <Link className="nav-link ms-3" to="/addTask">
                  <button id="addTaskBtn"><i className="fa-solid fa-plus" style={{ fontSize: "1.2rem" }}></i> &nbsp;<div className='addText'>Add</div> </button>
                </Link>
                <Link className="nav-link active home" to="/">Tasks</Link>
                <Link className="nav-link home" to="/">Completed</Link>
                <hr />
                <Link className="nav-link home" to="/"><i className="fa-solid fa-plus" style={{ fontSize: "1.2rem" }}></i>Create New List</Link>
                <button type="button" className='logout-button' onClick={handleLogoutClick}>Logout</button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
