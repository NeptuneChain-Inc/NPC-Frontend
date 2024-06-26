import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GoogleMaps_API_KEY } from '../../contracts/ref';

const MapContainer = styled.div`
width: 100%;
  height: 250px;
  max-height: 300px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border: 2px solid black;
  border-bottom: none;

  /* Hide the links at the bottom of the map */
  .gm-style > div:nth-child(1) > a {
    display: none !important;
  }

  /* Hide the Google logo */
  .gm-style .gm-style-cc {
    display: none !important;
  }
`;

function MapBox() {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleMaps_API_KEY}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      setMap(new google.maps.Map(mapContainerRef.current, {
        center: { lat: 48.8036, lng: -95.0969 },
        zoom: 13,
        disableDefaultUI: true,
        gestureHandling: 'none',
        mapTypeId: 'satellite',
      }))
    };

    return () => {
      if (window.google && window.google.maps && map) {
        window.google.maps.event.clearInstanceListeners(map);
      }
    };
  }, []);

  return <MapContainer ref={mapContainerRef} />;
}

export default MapBox;
