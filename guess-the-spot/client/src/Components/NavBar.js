import React, { useEffect, useRef, useState } from 'react';
import { Button, FormControl, Form, Nav, Navbar, Badge } from 'react-bootstrap'
require('dotenv').config()


const selectorStyle = {
    width: '70px',
}

function NavBar({ setPrefernces }) {

    const [level, setLevel] = useState('easy')
    const [distance, setDistance] = useState('absolute')
    const [units, setUnits] = useState('km')

    const handleChange = (e, prefernce) => {
        switch(prefernce){
            case 'level':
                setLevel(e.target.value);
                break;
            case 'distance':
                setDistance(e.target.value)
                break;
            case 'units':
                setUnits(e.target.value)
                break;
        }
    }

    useEffect(() => {

        const prefernces = {level, distance, units};
        setPrefernces(prefernces);
        console.log(prefernces);
    },[level, distance, units])

    return (
        <div className="nav-bar">
            <Navbar variant="dark" className="nav-bar">
                        <div className='selector'>
                            <h6>Level</h6>
                            <FormControl 
                                onChange={(e) => {handleChange(e, 'level')}}
                                style={selectorStyle}
                                as='select'
                                size='sm'
                            >
                                <option value='easy'>easy</option>
                                <option value='med'>med</option>
                                <option value='hard'>hard</option>
                            </FormControl>
                        </div>
                        <div className='selector'>
                            <h6>Distance</h6>
                            <FormControl 
                                onChange={(e) => {handleChange(e, 'distance')}}
                                style={selectorStyle}
                                as='select'
                                size='sm'
                            >
                                <option value='absolute'>absolute</option>
                                <option value='walking'>walking</option>
                            </FormControl>
                        </div>
                        <div className='selector'>
                            <h6>Units</h6>
                            <FormControl
                                onChange={(e) => {handleChange(e, 'units')}} 
                                style={selectorStyle} 
                                as='select' 
                                size='sm'
                            >
                                <option value='km'>km</option>
                                <option value='miles'>miles</option>
                            </FormControl>
                        </div>
            </Navbar>
        </div>
  );
}

export default NavBar;
