import React from 'react';
import "./Courses.css"
import Course from './Course';
import Info from "./Courseinfo";

const Courses = () => {
  return (
    <div className='full-courses88'>
    
      <h1 style={{fontSize:"3.2rem"}}>Unlock your career, explore exciting courses awaited just for you!</h1>
      <p style={{fontSize:"2.2rem"}}>Training and courses offered by our various institutions</p>

      <div className='courses88'>

        {
        Info.map((item,index)=>
        
           (
              <Course 
              key={index}
              image={item.image}
              platform={item.platform}
              url={item.url}
            />
            ) 
        )
      }

      </div>
      <button className='courses-btn88'> See More</button>

    </div>
  );
}

export default Courses;

