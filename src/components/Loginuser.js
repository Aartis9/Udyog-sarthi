import React, { useState } from 'react'
import './Loginuser.css';
import logo from '../assets/logo.png';
import login from '../assets/login.png'
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Loginuser() {
  const [val, setVal] = useState({ email: "", pass: "" });
  const navigate = useNavigate();

  function changeHandler(event) {
    const { name, value, checked, type } = event.target;
    setVal((prev) => ({
      ...prev, [name]: type === "checked" ? checked : value
    }))
  }
  async function saveHandler(e) {
    e.preventDefault();

    const { email, pass } = val;

    try {
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: pass,
        }),
      });

      const res = await data.json();

      if (data.status === 200 && res.success) {
        // Login successful
        toast.success("User Login Success");
        const token = res.token;
        // const id = res._id;
        // Store the token in local storage
        // console.log(id);
        localStorage.setItem('token', token);
        // localStorage.setItem('id', id);

        // localStorage.setItem('image', res.image)

        setTimeout(() => {
          navigate('/')
          navigate(0);
          window.scrollTo(0, 0);
          // navigate(0)

        }, 1000);
        // Redirect to the desired page or perform any other actions
      } else if (data.status === 400) {
        // Bad Request - Missing fields
        toast.error("Please fill in all the required fields");
      } else if (data.status === 401) {
        // Unauthorized - User not registered
        toast.info("User is not registered with us. Please sign up to continue.");
      } else if (data.status === 402) {
        // Internal Server Error
        toast.error("Invalid credentials. Please check your email or password.");
      } else {
        // Handle other status codes or error cases
        toast.error("Login failed. Server returned an unexpected status code.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Login failed. Please try again.");
    }
  }
  function forgotHandler() {

  }
  return (
    <div className='backlogin21'>
      <div className='login21'>
        <div className='maindivimage21'>
          <img src={login} alt="loginimage" />
        </div>
        <div className='loginform21'>
          <img src={logo} alt="logo" className='logo21' />
          <div className='detail21'>
            <h3>Hello, Welcome back!</h3>
            <div className="content21">
              <form>
                <div className='longdiv21'>
                  <div className="input-box21">
                    <label className="details21">Email</label>

                    <input type="email" placeholder="Enter your email address" required name="email" value={val.email} onChange={changeHandler} style={{ width: "320px", fontSize: "16px" }} />
                  </div>
                  <div className="input-box21">
                    <label className="details21">Password</label>
                    <input type="password" placeholder="***************" required name="pass" value={val.pass} onChange={changeHandler} style={{ width: "320px", fontSize: "16px" }} />
                  </div>
                  <p style={{ marginBottom: "10px", textAlign: "right", marginRight: "95px", color: "#F58840", fontSize: "16px", fontWeight: "500", cursor: "pointer" }} onClick={forgotHandler}>Forgot Password?</p>
                </div>

              </form>
              <button type='submit' className='loginbutton21' onClick={saveHandler}>Login</button>
              <p className='loginregister21'>Don't have an account? <Link to="/signup"><label style={{ color: "#F58840", fontWeight: "600", cursor: "pointer" }}>Create Account</label></Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
