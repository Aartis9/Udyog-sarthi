import './Navbar.css'

import React, { useState, useEffect } from 'react';


// import { BiUserCircle } from "react-icons/bi";
import logo from '../assets/logo.jpg'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiLogOut, FiSettings, FiBookmark, FiHelpCircle } from 'react-icons/fi';
import Swal from 'sweetalert2';





const Navbar = (props) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  // const isLoggedIn = props.isLoggedIn;
  const [image, setImage] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked((prev) => {
      return !prev;
    });
  }

  // /profile/getuserdetails

  useEffect(() => {
    fetchProfile();
    // Fetch use profile when token is available
  }, [token]);
  const fetchProfile = async () => {
    try {
      console.log(token);
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/profile/getuserdetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });
      const data = await response.json();
      console.log("res", data);
      const id = data.data._id;
      localStorage.setItem("id", id)
      // const image = data.data.image;
      // const fname = data.data.firstName;
      // const lname = data.data.lastName;
      const name = `${data.data.firstName} ${data.data.lastName}`;
      // const email = data.data.email;
      // const device = data.data.assistiveDevice;
      // const dob = data.data.dateOfBirth;
      // const dtype = data.data.disabilityType
      // const education = data.data.education;
      // const gender = data.data.gender
      // const mobileNumber = data.data.mobileNumber;
      // const institute = data.data.institute;
      // const udid = data.data.udid;
      // const skills = data.data.skills;

      const { firstName, lastName, image, email, assistiveDevice, dateOfBirth, disabilityType, education, gender, mobileNumber, institute, udid, skills } = data.data;

      // console.log(image);
      // console.log(firstName);
      // console.log(lastName);
      // console.log(name);
      // console.log(email);
      // console.log(assistiveDevice);
      // console.log(dateOfBirth);
      // console.log(disabilityType);
      // console.log(education);
      // console.log(gender);
      // console.log(mobileNumber);
      // console.log(institute);
      // console.log(udid);
      // console.log(skills);




      // console.log(image);
      setImage(image);
      setName(name); // Set the fetched data using setData
      setEmail(email); // Set the fetched data using setData
      // Set the fetched data using setData
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  };

  const logout = () => {
    // localStorage.removeItem("token");
    localStorage.clear();
    navigate('/');
    navigate(0);
    setImage()
    setName()// Set the fetched data using setData
    setEmail()


  }

  const handleSignout = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn69',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Logging Out',
          'You are being logged out...',
          'success',
        )
        logout();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'You are still logged in :)',
          'info'
        )
      }
    })
  }

  const handleEdit = () => {
    try {

    } catch (error) {

    }
  }

  return (
    <div className='navbar88'>

      <div className='nav-logo88'>
        <Link to='/'><img src="https://res.cloudinary.com/drtqzmu2n/image/upload/v1696852577/Add_a_heading__1_-removebg-preview_chi4xt.png" /></Link>
      </div>



      <div className='nav-links88'>
        <NavLink to='/' className='links88' >Home</NavLink>
        <NavLink to={(token) ? '/jobs' : '/login'} className='links88' >Jobs</NavLink>
        <NavLink to='/courses' className='links88' >Trainings & Courses</NavLink>
        {/* <NavLink to='/notifications' className='links88' >Notifications</NavLink>  */}
        <NavLink to='/about' className='links88' >About us</NavLink>
        <NavLink to='/contact' className='links88' >Contact</NavLink>

        {

          token &&
          <div className='profile88'>
            <img src={image} onClick={handleClick} />
          </div>
        }


        {
          clicked &&
          <div className='menu-wrap' onMouseLeave={handleClick}>

            <div className='image_sec'>
              <div className='image_sec_img88'>
                <img src={image} />
              </div>
              <h3>Hii, {name}</h3>
              <p>{email}</p>
              <Link to="/profile"><button className='edit-btn' onClick={handleEdit}>Edit Profile</button></Link>
            </div>

            <div className='menu_sec'>
              <Link className='menu-link' to="/jobs"><FiBookmark /> Bookmarks</Link>
              <Link className='menu-link' to="/jobs"><FiSettings /> Settings</Link>
              <Link className='menu-link' to="/jobs"><FiHelpCircle /> Help</Link>
            </div>

            <button className='sign-out' onClick={handleSignout}><FiLogOut size={15} /> Sign Out</button>

          </div>
        }



      </div>


    </div>
  );
}

export default Navbar;



/* <button className='profile88' onClick={handleClick}> <BiUserCircle size={40}/></button>  */

/* <button className='profile88' onClick={handleClick}> <BiUserCircle size={40}/></button>  */

