import React from 'react'
import './Onejob.css';
import {Link} from 'react-router-dom';
export default function Onejob(props) {
    return (
        <>
            <div className='onejobabout21'>
                <div className='oneaboutthejob21'>
                    <h1 style={{whiteSpace:"nowrap",textOverflow:"ellipsis",fontFamily:" 'Merriweather', 'serif' "}} className='hehe21'>About The Job</h1>
                    <Link to = {`${props.jlink}`}>
                    <button style={{marginLeft:"570px",marginTop:"15px"}} className='oneviewbutton21'>Apply</button>
                    </Link>
                </div>
                <div className='oneaboutdesc21'>
                    <p>{props.desc.split(" ").slice(0, 110).join(" ") + "..."}</p>
                    <h3>Skills Required:</h3>
                    <p>Good problem solver, Self Starter, Detail oriented</p>
                    <h3>Job Publisher:</h3>
                    <p>{props.publish}</p>
                    <h3>Employment Type:</h3>
                    <p>{props.type}</p>
                </div>
            </div>
        </>

    )
}
