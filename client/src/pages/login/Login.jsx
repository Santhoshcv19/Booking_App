import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { useNavigate } from "react-router-dom";
import background from "./background.jpg";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: null,
    password: null,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate('/');
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login" style={{ backgroundImage: `url(${background})`, backgroundSize: '100% 100%', width: '100vw', height: '100vh' }}>
      <div className="lContainer">
      <h1 style={{ textAlign: 'center', fontSize: '2em', marginBottom: '0.5px', color: 'white' }}>Trip Planner</h1>
      <h4 style={{ textAlign: 'center', marginBottom: '5px', color: 'white' }}>Client</h4>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
