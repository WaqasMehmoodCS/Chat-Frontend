import "./Register.scss";
import { api } from "../../lib/axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/auth/checkuser");
        if (res.status === 200) {
          navigate("/chat", { replace: true });
        }
      } catch (error) {
        // console.log(error);
      }
    };
    checkUser();
  }, [navigate]);

  const handleRegisterSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (confirmPassword !== password) {
      setPasswordNotMatch(true);
      setLoading(false);
      return false;
    }

    try {
      const res = await api.post(`/auth/register`, { name, email, password });
      if (res.status === 201) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      if (error.status === 403) {
        alert(`User Email Already Registered.`);
        // window.location.reload();
      } else {
        alert(`No Response from Server`);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="registerContainer">
      {loading && <Loading />}
      <h1>Register</h1>
      <hr />
      <section className="registerFormWrapper">
        <form className="registerForm" onSubmit={handleRegisterSubmit}>
          <div className="inputWrapper">
            <label htmlFor="name">Name:</label>
            <input
              name="name"
              id="name"
              type="text"
              required
              placeholder="Jhon Doe"
              autoComplete="name"
            />
          </div>
          <div className="inputWrapper">
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              required
              id="email"
              type="email"
              placeholder="abc@gmail.com"
              autoComplete="email"
            />
          </div>
          <div className="inputWrapper">
            <label htmlFor="password">Password:</label>
            <div className="passwordWrapper">
              <input
                name="password"
                required
                id="password"
                type={show ? "text" : "password"}
                placeholder="******"
              />
              <div onClick={() => setShow((prev) => !prev)}>
                {!show ? <IoIosEye size={18} /> : <IoIosEyeOff size={18} />}
              </div>
            </div>
          </div>
          <div className="inputWrapper">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="passwordWrapper">
              <input
                name="confirmPassword"
                required
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="******"
              />
              <div onClick={() => setShowConfirm((prev) => !prev)}>
                {!showConfirm ? (
                  <IoIosEye size={18} />
                ) : (
                  <IoIosEyeOff size={18} />
                )}
              </div>
            </div>
          </div>
          {passwordNotMatch && <p>Password must match</p>}
          {/* <div className="inputWrapper"> */}
          <button type="submit">Register</button>
          <button type="reset">Reset</button>
          {/* </div> */}
        </form>
      </section>
    </section>
  );
};

export default Register;
