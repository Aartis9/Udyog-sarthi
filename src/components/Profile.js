import React from 'react'
import { Link,NavLink} from "react-router-dom";
import "./Profile.css"
import { AiFillSetting,AiOutlineUser,AiOutlineLogout } from "react-icons/ai";
import {FaHandsHelping } from "react-icons/fa";
import {BsFillBookmarkStarFill } from "react-icons/bs";
import Change from './Change';

export default function Profile() {
  return (
    <div className='editprofile88'>

      <div className='side-bar88'>
        <div className='side-links88'>
          <Link to="/profile" className='side-link88'><AiOutlineUser size={20} />  User info</Link>
          <Link to="#" className='side-link88'><AiFillSetting size={20} />  Settings</Link>
          <Link to="#" className='side-link88'><BsFillBookmarkStarFill size={20} />  Bookmarks</Link>
          <Link to="#" className='side-link88'><FaHandsHelping size={20}/>  Help</Link>
          <Link to="/" className='side-link88'><AiOutlineLogout size={20} />  Sign Out</Link>
        </div>
      </div>


    <div className='rolling88'>
    <Change />
    </div>
      




      {/* components to render on condition  */}
      
    </div>
  )
}
