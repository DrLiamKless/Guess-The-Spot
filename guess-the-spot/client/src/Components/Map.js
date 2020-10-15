import React, { useState, useCallback } from 'react';
import '../App.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
require('dotenv').config()

const mapStyle = {
    width: '100vw',
    height: '100vh'
    };
    
const defaultCenter = { lat: 31.45, lng: 35 };

const options = {
    // gestureHandling: "none",
    // zoomControl: false,
} 



function Map({ spotToGuess, spotGuessed, HandleGuess }) {

  return (
    <div className="map-container">
        <LoadScript googleMapsApiKey={process.env.KEY}>
            <GoogleMap
              options={options}
              mapContainerStyle={mapStyle}
              center={defaultCenter}
              zoom={7.3}
              onClick={(e)=> {HandleGuess(e.latLng.lat(), e.latLng.lng());}}
            >
            {/* {spotToGuess &&
            <Marker position={{lat: spotToGuess["lat"], lng: spotToGuess["lng"]}}></Marker>
            } */}
            {spotGuessed &&
            <Marker position={{lat: spotGuessed["lat"], lng: spotGuessed["lng"]}}></Marker>
            }
            </GoogleMap>
        </LoadScript>
    </div>
  );
}

export default Map;
