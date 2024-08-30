import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GoogleMaps_API_KEY } from '../../contracts/ref';

const MapContainer = styled.div`
height: 400px;
width: 100%;


  border-radius: 10px;
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
