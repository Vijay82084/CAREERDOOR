import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img  src="/Carrer.png" alt="logo" />
            <h3 style={{color:"#1791C8", fontFamily:"Tahoma"}}>Login to your account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="" style={{fontFamily:"Tahoma"}}>Select Role</option>
                  <option value="Employer" style={{fontFamily:"Tahoma"}}>Employer</option>
                  <option value="Job Seeker" style={{fontFamily:"Tahoma"}}>Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label style={{fontFamily:"Tahoma"}}>Email Address</label>
              <div>
                <input style={{fontFamily:"Tahoma"}}
                  type="email"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag" style={{fontFamily:"Tahoma"}}>
              <label>Password</label>
              <div>
                <input style={{fontFamily:"Tahoma"}}
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button style={{fontFamily:"Tahoma"}}type="submit" onClick={handleLogin}>
              Login
            </button>
            <Link to={"/register"}style={{fontFamily:"Tahoma"}}>Register Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/Loginnew.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Login;
