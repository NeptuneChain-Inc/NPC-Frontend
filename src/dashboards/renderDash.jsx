import React, { useEffect, useState, useCallback } from 'react';
import { Dash } from '../components';
import farmerDashData from './default/farmerDashData.json';
// import { mediaDash } from './dashData';

/**
 * Renders the appropriate dashboard based on various props.
 * 
 * @param {Object} props - The props for the component.
 * @param {string} props.route - The route to determine which data to display.
 * @param {string} props.uid - The User ID to fetch media data.
 * @param {Object} props.userDashes - The user-specific dashboards.
 * @param {Object} props.searchResults - The data to display if in search mode.
 *
 * @returns {JSX.Element} - Rendered dashboard.
 */
const RenderDash = ({ route, uid, userDashes, searchResults }) => {
  // State to hold the data to be displayed on the dashboard
  const [dashData, setDashData] = useState({});

  userDashes = farmerDashData;

  // || FOR DEBUGGING ||
  // console.log({ route, uid, userDashes, dashData, searchResults });

  // Function to load default data
  const loadDefaultData = useCallback(() => setDashData(userDashes?.main), [userDashes]);

  // Function to load media data
  // const getMediaData = useCallback(async () => {
  //   if (uid) {
  //     const mediaData = await mediaDash(uid);
  //     setDashData(mediaData);
  //   } else {
  //     loadDefaultData();
  //   }
  // }, [uid, loadDefaultData]);

  // Effect to handle dashboard data loading
  useEffect(() => {
    if (route && !searchResults) {
      switch (route) {
        case 'financial':
          setDashData(userDashes?.financial);
          break;
        case 'environmental':
          setDashData(userDashes?.environmental);
          break;
        case 'verification':
          setDashData(userDashes?.verification);
          break;
        // case 'my-media':
        //   getMediaData();
        //   break;
        default:
          loadDefaultData();
          break;
      }
    } else if (searchResults) {
      setDashData(searchResults);
    } else {
      loadDefaultData();
    }
  }, [route, userDashes, searchResults, loadDefaultData]);

  return (
    <Dash dashData={dashData} />
  );
};

export default RenderDash;
