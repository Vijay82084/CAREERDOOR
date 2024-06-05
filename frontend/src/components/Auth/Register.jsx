import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

 
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  console.log(handleRegister)

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }


  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/Carrer.png" alt="logo" />
            <h3 style={{color:"#1791C8",fontFamily:"Tahoma"}}>Create a new account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label style={{fontFamily:"Tahoma"}}>Register As</label>
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
              <label style={{fontFamily:"Tahoma"}}>Name</label>
              <div>
                <input style={{fontFamily:"Tahoma"}}
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag" style={{fontFamily:"Tahoma"}}>
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
              <label style={{fontFamily:"Tahoma"}}>Phone Number</label>
              <div>
                <input style={{fontFamily:"Tahoma"}}
                  type="number"
                  placeholder="Enter Your password"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPhoneFlip />
              </div>
            </div>
            <div className="inputTag" style={{fontFamily:"Tahoma"}}>
              <label style={{fontFamily:"Tahoma"}}>Password</label>
              <div>
                <input style={{fontFamily:"Tahoma"}}
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" onClick={handleRegister} style={{fontFamily:"Tahoma"}}>
              Register
            </button>
            <Link to={"/login"} style={{fontFamily:"Tahoma"}}>Login Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/Registernew.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Register;
