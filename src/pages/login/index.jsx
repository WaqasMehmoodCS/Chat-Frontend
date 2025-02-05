import "./Login.scss";
import { api } from "../../lib/axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../../components/loading";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);

  const navigate = useNavigate();
  const handleLoginSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await api.post(
        `/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log(res);
      if (res.status === 200) {
        alert(`Login Successful`);
        navigate("/login", { replace: true });
      }
    } catch (error) {
      if (error.status === 403) {
        setErr(true);
      } else {
        alert(`No Response from Server`);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="loginContainer">
      {loading && <Loading />}
      <h1>Login</h1>
      <hr />
      <section className="loginFormWrapper">
        <form className="loginForm" onSubmit={handleLoginSubmit}>
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
          {err && <p>Invalid Credentials</p>}
          <button type="submit">Login</button>
          <button type="reset">Reset</button>
        </form>
      </section>
    </section>
  );
};

export default Login;
