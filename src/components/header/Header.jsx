import "./Header.css";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <RocketLaunchOutlinedIcon />
        <p className="header-text-left">
          S T A R <br /> S E E K E R
        </p>
      </div>
      <div className="header-right">
        <div className="nav-item">
          <NavLink
            to="/"
            style={{ color: "white" }}
            className={({ isActive }) =>
              isActive ? "activeNavLink" : "inactiveNavLink"
            }
          >
            <Button variant="outlined" color="inherit">
              Homepage
            </Button>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink
            style={{ color: "white" }}
            to="plan-journey"
            className={({ isActive }) =>
              isActive ? "activeNavLink" : "inactiveNavLink"
            }
          >
            <Button variant="outlined" color="inherit">
              Plan Your Journey
            </Button>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink
            style={{ color: "white" }}
            to="departures-board"
            className={({ isActive }) =>
              isActive ? "activeNavLink" : "inactiveNavLink"
            }
          >
            <Button variant="outlined" color="inherit">
              Departures Board
            </Button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
