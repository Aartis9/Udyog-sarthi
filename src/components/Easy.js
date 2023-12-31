import React from 'react';
import './Easy.css'
import { FaHandshakeSimple } from "react-icons/fa6";
import { PiHandbagFill } from "react-icons/pi";
import { SiHelpdesk } from "react-icons/si";

const Easy = () => {
  return (
    <div className='easy88'>
        <h1 style={{fontSize:"3rem"}}>More easier to find jobs with our platform</h1>
        <p style={{fontSize:"2.3rem"}}className='easyp88'>The following features make our service easier to help you find suitable jobs from various companies </p>

      <div className='ft-section88'>
            <div className='feature88'>
                <FaHandshakeSimple size={60} />
                <h2>Easy Applying</h2>
                <p>The process of applying a job is easier and faster.</p>
            </div>
            <div className='feature88'>
                <PiHandbagFill size={60} />
                <h2>Many Vacancies</h2>
                <p>There are many job vacancies from various companies</p>
            </div>
            <div className='feature88'>
                <SiHelpdesk size={60} />
                <h2>Best Support</h2>
                <p>We provide full support to job seekers for better results</p>
            </div>
      </div>
    </div>
  );
}

export default Easy;
