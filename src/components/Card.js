import React from 'react';
import "./Card.css"
import { MdLocationOn } from "react-icons/md";
import { FaRupeeSign  } from 'react-icons/fa';

const Card = (props) => {
  return (
    <div className='card88'>

        <div className='comp88'>
        <h1>{props.role}</h1>
          
        </div>
 
        <div className='role88'>
          <h2>{props.company}</h2>
          <p><MdLocationOn /> {props.place}</p>
        </div>

        <div className='mode88'>
          <button className='modebtn88'>Full time</button>
          <button className='modebtn88'>Remote</button>
        </div>

        <div className='salary88'>
          <h2> ₹{props.salary}</h2>
          <button className='details88'>View Details</button>
        </div>
      
    </div>
  );
}

export default Card;
