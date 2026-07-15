import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged Out Successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">

        <Link className="navbar-brand fw-bold fs-3" to="/">
          🏠 HouseHunt
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <div className="navbar-nav ms-auto">

            <Link className="nav-link text-white" to="/">
              Home
            </Link>

            <Link className="nav-link text-white" to="/dashboard">
              Dashboard
            </Link>

            {token ? (
              <>
                <Link className="nav-link text-white" to="/profile">
                  Profile
                </Link>

                <Link className="nav-link text-white" to="/add-property">
                  Add Property
                </Link>

                <button
                  className="btn btn-danger ms-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="nav-link text-white" to="/login">
                  Login
                </Link>

                <Link className="nav-link text-white" to="/register">
                  Register
                </Link>
              </>
            )}

          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;