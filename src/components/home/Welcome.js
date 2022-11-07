// import { useSelector } from "react-redux";
// import { userDetails } from "../../store";
import welcome from './../../images/welcome.png';
import './../styles/welcome.css'

const Welcome = () => {
  // const user = useSelector(userDetails);
  return (
    <>
      <img className="welcome" src={welcome} alt="welcome" />
      {/* {user && (
        <div>
          {user.name} with role {user.role}
        </div>
      )} */}
    </>
  );
};

export default Welcome;
