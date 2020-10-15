import React, { useState, useCallback } from 'react';
import '../App.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
require('dotenv').config()

const mapStyle = {
    width: '500px',
    height: '280px'
    };
    
const defaultCenter = { lat: 31.45, lng: 35 };



function Map() {

  return (
<div className="map-container">
    <LoadScript googleMapsApiKey={process.env.KEY}>
        <GoogleMap
        mapContainerStyle={mapStyle}
        center={defaultCenter}
        zoom={7}>
        </GoogleMap>
        <Marker
      position={{ lat: 31.45, lng: 35 }}
    />

    </LoadScript>
</div>
  );
}

export default Map;
