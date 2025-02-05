import { FaUserPlus } from "react-icons/fa6";
import "./Navbar.scss";
import { FaSignInAlt } from "react-icons/fa";
import { RiWechatLine } from "react-icons/ri";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="container">
      <Link to="/" className="logowrapper">
        <RiWechatLine size={45} />
        <p className="logoText">WeChat</p>
      </Link>
      <div className="actions">
        <Link to="/login" style={{display:'flex', alignItems:'center', gap:'15px'}}>
          <FaSignInAlt size={25} />
          <p className="actionText">Login</p>
        </Link>
        <Link to="/register" style={{display:'flex', alignItems:'center', gap:'15px'}}>
          <FaUserPlus size={25} />
          <p className="actionText">Register</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
