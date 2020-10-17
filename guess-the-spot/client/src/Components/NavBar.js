import React, { useEffect, useRef, useState } from 'react';
import { Button, FormControl, Form, Nav, Navbar, Badge } from 'react-bootstrap'
import { InfoCircle, Trophy } from 'react-bootstrap-icons';
require('dotenv').config()


const selectorStyle = {
    width: '70px',
    backgroundColor: '#282c34',
    color: 'white',
    marginTop: '-8px',
    height: '30px',
    width: '75px'
}

const infoButtonStyle = {
    position: 'absolute',
    top: 5,
    right: -30,
    cursor: 'pointer',
}

const trophyButtonStyle = {
    position: 'absolute',
    top: 5,
    right: -10,
    cursor: 'pointer',
}

function NavBar({ showRecordsModal, setShowRecordsModal ,setPrefernces, setShowStartModal }) {

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
    },[level, distance, units])

    return (
        <div className="nav-bar">
            <Navbar variant="dark">
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
                    <InfoCircle variant="light" onClick={()=>{setShowStartModal(true)}} style={infoButtonStyle}/>
                    <Trophy variant="light" onClick={()=>{setShowRecordsModal(true)}} style={trophyButtonStyle}/>
                    {/* <div className='selector'>
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
                    </div> */}
                </div>
            </Navbar>
        </div>
  );
}

export default NavBar;
