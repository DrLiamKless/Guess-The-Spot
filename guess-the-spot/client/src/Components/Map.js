import React, { useState, useCallback, useEffect } from 'react';
import '../App.css';
import { GoogleMap, LoadScript, Marker, Circle, Polyline, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
require('dotenv').config()

const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
    };
    
const defaultCenter = { lat: 31.45, lng: 35 };

const circleOptions = {
    strokeColor: "green",
    strokeWeight: 1,
    strokeOpacity: 0.4,
} 

const polylineOptions = {
  strokeColor: "#7DF700",
  strokeOpacity: 0.6,
} 

function Map({ preferences ,guessDistance, spotToGuess, spotGuessed, HandleGuess }) {

  const [spotToGuessPlace, setSpotToGuessPlace] = useState();
  const [spotGuessedPlace, setSpotGuessedPlace] = useState();
  const [directions, setDirections] = useState();


  useEffect(() => {
    if (spotToGuess && spotGuessed)  {
      setSpotToGuessPlace({lat: spotToGuess["lat"], lng: spotToGuess["lng"]})
      setSpotGuessedPlace({lat: spotGuessed["lat"], lng: spotGuessed["lng"]})
    }
  }, [spotToGuess, spotGuessed])

  const directionsCallback = (response) => {    
    if (response !== null) {
      if (response.status === 'OK') {
        return
      } else {
        console.log('response: ', response)
      }
    }
  }

  return (
    <div className="map-container">
        <LoadScript googleMapsApiKey={'AIzaSyD4jwMMAN975IMcUih-Avt68C4CYvYNlGE'}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={defaultCenter}
              zoom={7.3}
              onClick={(e)=> {HandleGuess(e.latLng.lat(), e.latLng.lng());}}
            >
            {/* {spotToGuess &&
            <Marker position={{lat: spotToGuess["lat"], lng: spotToGuess["lng"]}}></Marker>
            } */}
            {spotGuessed &&
            <div>
              <Marker position={spotGuessedPlace}></Marker>
              <Circle options={circleOptions} center={spotGuessedPlace} radius={guessDistance}></Circle>
              <Polyline options={polylineOptions} path={[spotGuessedPlace, spotToGuessPlace]}></Polyline>
            </div>
            }
            </GoogleMap>
        </LoadScript>
    </div>
  );
}

export default Map;
