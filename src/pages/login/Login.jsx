import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";



const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

 //the user will be save in all the pages
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if(res.data.isAdmin){
         dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details});
       navigate("/");
      }else{
        dispatch({ 
          type: "LOGIN_FAILURE", 
          
          payload: {message:"you are not allowed!!"} });
      }
    } catch (err) {
      dispatch({ 
        type: "LOGIN_FAILURE", 
        payload: err.response.data });
    }
  };


  return (
    
    <div className="login">
     <header className="head">
      <h3 className="logodesc">booking Admin</h3>
      <img src="https://www.rosedesvents.net/wp-content/uploads/2019/02/Logo-Booking.png" 
      alt="img" 
      className="imglogo"
      />
     </header>
      <h1 className="loginTitle">Login</h1>
  <div className="cube"></div>
  <div className="cube"></div>
  <div className="cube"></div>
  <div className="cube"></div>
  <div className="cube"></div>
  <div className="cube"></div>
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="loginInput"
          
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="loginInput"
          
        />
        <button disabled={loading} onClick={handleClick} className="loginButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;