import { useEffect } from "react";
import { api } from "../../lib/axios/axiosInstance";
import { useNavigate } from "react-router-dom";
const Chat = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/auth/checkuser");
        console.log(res.data.message);
      } catch (error) {
        if (error.status === 403) {
          navigate("/login", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      }
    };
    checkUser();
  }, [navigate]);


  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get("/auth/logout");
      if (res.status === 200) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div>
      <p>Chat Page</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Chat;
