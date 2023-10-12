import React from 'react';
import './Heading1.css';
import image from "../assets/asset15.png"


const Heading1 = () => {
  return (
    <div className='heading188'>
        <div className='tag88'>
            <h1 style={{fontSize:"4rem"}}>Find the best courses and upgrade your skills</h1>
            <p style={{fontSize:"2.7rem"}} >
     Elevate Your Skills and       
     Career with Our   
     Exceptional Training and 
     Courses, Setting You on a   
     Path to Success and    
     Growth.</p>

        </div>

        <div className='tagimg88'>
            <img src={image} />
        </div>
      
    </div>
  );
}

export default Heading1;

