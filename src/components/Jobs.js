import React from 'react';
import "./Jobs.css";
import Card from './Card';
import Info from "./Cardinfo";
import {Link} from "react-router-dom"

const Jobs = () => {
  return (
    <div className='jobs88'>
      
    <div className='featured88'>
        <h1 style={{fontSize:"3.5rem"}}>Most highlighted job oppurtunities </h1>
        <p style={{fontSize:"2.2rem"}}>Your path to success starts here: Discover diverse and rewarding job opportunities tailored to your ambitions and skills.</p>
    </div>

    <div className='cards88' style={{width:"80vw"}}>

      {
        Info.map((item,index)=>
        
           (
              <Card 
              key={index}
              company={item.company}
              role={item.role}
              salary={item.salary}
              place={item.place}
            />
            ) 
        )
      }

    </div>

    <Link to="/jobs"><button className='jobs-btn88'>View all jobs</button></Link>

    </div>
  );
}

export default Jobs;
