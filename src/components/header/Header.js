import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, userDetails, tabSelected } from "../../store";
import "../styles/header.css";

/**
 * application header code
 */

const Header = () => {
  const user = useSelector(userDetails);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(tabSelected("Default"));
  };
console.log("user >>>"+JSON.stringify(user))
  const handleRefresh = () => {
    dispatch(tabSelected("Default"));
  };

  return (
    <header className="app-header">
      <div>
        <Link to="/" onClick={handleRefresh}>
          <span className="app-title">Offboarding Associate</span>
        </Link>
      </div>
   
      {user ? (
        <>
          <div>
            <Grid container>
              <Grid item>
                <Typography variant="span" style={{ paddingRight: "10px" }}>
                  Hi, {user.firstName} {user.lastName}
                </Typography>
              </Grid>
              <Grid item>
                <Link to="/auth/login" onClick={handleLogout}>
                  <span className="logout">Logout</span>
                </Link>
              </Grid>
            </Grid>
          </div>
        </>
      ) : (
        <div>
          <Link to="/auth/login">
            <span className="logout">Login</span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
