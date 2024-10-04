import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { MapsAPI } from "../../scripts/back_door";

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
  const [key, setKey] = useState(null);

  useEffect(() => {
    getKey();
  }, []);

  useEffect(() => {

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC84TiV0-W9JMWCHWGmnh-9M9CjQFPG6XY`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        setMap(
          new google.maps.Map(mapContainerRef.current, {
            center: { lat: 48.8036, lng: -95.0969 },
            zoom: 13,
            disableDefaultUI: true,
            gestureHandling: "none",
            mapTypeId: "satellite",
          })
        );
      };

      return () => {
        if (window.google && window.google.maps && map) {
          window.google.maps.event.clearInstanceListeners(map);
        }
      };
  }, []);

  const getKey = async () => setKey(await MapsAPI.getKey());

  return <MapContainer ref={mapContainerRef} />;
}

export default MapBox;
