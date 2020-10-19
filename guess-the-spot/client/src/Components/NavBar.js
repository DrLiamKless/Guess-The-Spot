import React, { useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap'
import { InfoCircle, Trophy, Alarm } from 'react-bootstrap-icons';
require('dotenv').config()


const selectorStyle = {
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

function NavBar({setShowRecordsModal ,setPrefernces, setShowStartModal, timer, timeStopped }) {

    const [level, setLevel] = useState('easy')
    const [distance, setDistance] = useState('absolute')
    const [units, setUnits] = useState('km')
    
    useEffect(() => {

        const prefernces = {level, distance, units};
        setPrefernces(prefernces);
    },[level, distance, units])

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
            default :
            console.log('something went wrong');
        }
    }
    
    return (
        <div className="nav-bar">
            <Navbar variant="dark">
                <div className='selector'>
                    <h6>Level</h6>
                    <select
                        className="form-control form-control-sm" 
                        onChange={(e) => {handleChange(e, 'level')}}
                        style={selectorStyle}
                        as='select'
                        size='sm'
                        disabled={ timer ? true : false}>
                        <option value='easy'>easy</option>
                        <option value='med'>med</option>
                        <option value='hard'>hard</option>
                    </select>
                </div>
                <div className='selector'>

                    <h6>Units</h6>
                    <select
                        className="form-control form-control-sm"
                        onChange={(e) => {handleChange(e, 'units')}} 
                        style={selectorStyle} 
                        as='select' 
                        size='sm'
                        disabled={ timer ? true : false}>
                        <option value='km'>km</option>
                        <option value='miles'>miles</option>
                    </select>
                    <InfoCircle variant="light" onClick={()=>{setShowStartModal(true)}} style={infoButtonStyle}/>
                    <Trophy variant="light" onClick={()=>{setShowRecordsModal(true)}} style={trophyButtonStyle}/>
                    <div>
                        <Alarm className={'alarm'}></Alarm>
                    <div className={'timer'}>
                        <h5>{!timer ? 0 : !timeStopped ? timer : timeStopped}</h5>
                    </div>
                    </div>
                </div>
            </Navbar>
        </div>
  );
}

export default NavBar;
