import React, { useState, useCallback, useEffect } from 'react';
import '../App.css';
import { GoogleMap, LoadScript, Marker, Circle, Polyline, DirectionsService } from '@react-google-maps/api';
require('dotenv').config()

const mapStyle = {
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

  useEffect(() => {
    if (spotToGuess && spotGuessed)  {
      setSpotToGuessPlace({lat: spotToGuess["lat"], lng: spotToGuess["lng"]})
      setSpotGuessedPlace({lat: spotGuessed["lat"], lng: spotGuessed["lng"]})
    }
  }, [spotToGuess, spotGuessed])

  const directionsCallback = (response) => {    
    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(
          () => ({
            response
          })
        )
      } else {
        console.log('response: ', response)
      }
    }
  }

  return (
    <div className="map-container">
        <LoadScript googleMapsApiKey={process.env.KEY}>
            <GoogleMap
              mapContainerStyle={mapStyle}
              center={defaultCenter}
              zoom={7.3}
              onClick={(e)=> {HandleGuess(e.latLng.lat(), e.latLng.lng());}}
            >
            {spotGuessed &&
            <div>
              <Marker position={spotGuessedPlace}></Marker>
              <Circle options={circleOptions} center={spotGuessedPlace} radius={guessDistance}></Circle>
              <Polyline options={polylineOptions} path={[spotGuessedPlace, spotToGuessPlace]}></Polyline>
              {/* <DirectionsService options={{origin: spotGuessedPlace, destination: spotToGuess, travelMode:"WALKING"}} callback={(response)=>{directionsCallback(response)}}></DirectionsService> */}
            </div>
            }
            </GoogleMap>
        </LoadScript>
    </div>
  );
}

export default Map;
