import React, { useState, useEffect } from 'react';
import '../App.css';
import { GoogleMap, LoadScript, Marker, Circle, Polyline } from '@react-google-maps/api';

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

const mediumMapStyle = [
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  }
]

const hardMapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#1d2c4d'
      }
    ]
  },
  {
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8ec3b9'
      }
    ]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1a3646'
      }
    ]
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#4b6878'
      }
    ]
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#64779e'
      }
    ]
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#4b6878'
      }
    ]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#334e87'
      }
    ]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#023e58'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#283d6a'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6f9ba5'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d'
      }
    ]
  },
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#023e58'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3C7680'
      }
    ]
  },
  {
    featureType: 'road',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#304a7d'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#98a5be'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2c6675'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#255763'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#b0d5ce'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#023e58'
      }
    ]
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#98a5be'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1d2c4d'
      }
    ]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#283d6a'
      }
    ]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3a4762'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#0e1626'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#4e6d70'
      }
    ]
  }
]

function Map({ preferences ,guessDistance, spotToGuess, spotGuessed, HandleGuess }) {

  const [spotToGuessPlace, setSpotToGuessPlace] = useState();
  const [spotGuessedPlace, setSpotGuessedPlace] = useState();


  useEffect(() => {
    if (spotToGuess && spotGuessed)  {
      setSpotToGuessPlace({lat: spotToGuess["lat"], lng: spotToGuess["lng"]})
      setSpotGuessedPlace({lat: spotGuessed["lat"], lng: spotGuessed["lng"]})
    }
  }, [spotToGuess, spotGuessed])

  return (
    <div className="map-container">
        <LoadScript googleMapsApiKey={'AIzaSyD4jwMMAN975IMcUih-Avt68C4CYvYNlGE'}>
            <GoogleMap
              options={ 
                {styles:
                preferences.level === 'med' ? mediumMapStyle : 
                preferences.level === 'hard' && hardMapStyle,
                draggable: false,
                scrollwheel: false,
                zoomControl: false,
              }
              }
              mapContainerStyle={mapContainerStyle}
              center={defaultCenter}
              zoom={7.4}
              onClick={(e)=> {HandleGuess(e.latLng.lat(), e.latLng.lng());}}>
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
