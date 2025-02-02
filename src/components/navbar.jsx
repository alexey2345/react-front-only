import { Link, NavLink } from "react-router-dom";
import Logo from "./logo";
import { useAuth } from "../contexts/auth.context";

function NavBar({ setSearch, isNightMode, toggleNightMode }) {
  const { user, logout } = useAuth();

  return (
    <nav
      className={`navbar navbar-expand-sm ${
        isNightMode ? "bg-dark" : "bg-primary"
      } shadow-sm`}
      aria-label="Navbar example"
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
        <Logo isNightMode={isNightMode} inNavbar={true} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample05"
          aria-controls="navbarsExample05"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample05">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/about"
                className="nav-link text-white"
                style={{ fontSize: "1.5rem" }}
              >
                About
              </NavLink>
            </li>
          </ul>

          <input
            type="search"
            className={`form-control ${
              isNightMode ? "form-control-dark bg-secondary text-white" : "form-control-light text-b"
            }`}
            style={{ width: "200px" }}
            placeholder="Search..."
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/favorites"
                    className="nav-link text-white"
                    style={{ fontSize: "1.5rem" }}
                  >
                    Favorites
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    onClick={logout}
                    className="nav-link btn text-white"
                    style={{ fontSize: "1.5rem" }}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/sign-in"
                    className="nav-link text-white"
                    style={{ fontSize: "1.5rem" }}
                  >
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/sign-up"
                    className="nav-link text-white"
                    style={{ fontSize: "1.5rem" }}
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
            {user && user.isBusiness ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/new-card"
                    className="nav-link text-white"
                    style={{ fontSize: "1.5rem" }}
                  >
                    New Card
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    style={{ fontSize: "1.5rem" }}
                    to="/my-cards"
                  >
                    My Cards
                  </Link>
                </li>
              </>
            ) : null}
          </ul>

          {/* Night Mode Toggle */}
          <span
            onClick={toggleNightMode}
            className="ms-3 text-white"
            style={{
              cursor: "pointer",
              fontSize: "1.2rem",
              textDecoration: "underline",
            }}
          >
            {isNightMode ? "Light Mode" : "Night Mode"}
          </span>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
