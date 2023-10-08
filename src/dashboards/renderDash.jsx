import React, { useEffect, useState } from 'react'
import { Dash } from '../components'
//import { Dash, environmentalDash, financialDash, tradingActivityDash, operationalMetricsDash, notificationDash, verificationDash, mediaDash } from './dashData'
import { mediaDash } from './dashData'

const RenderDash = ({ route, uid, userDashes, searchResults }) => {
  const [dashData, setDashData] = useState({});
  console.log({ route, uid, userDashes, dashData, searchResults });

  useEffect(() => {
    if (route && !searchResults) {
      switch (route) {
        case 'financial':
          setDashData(userDashes?.financial)
          break;
        // case 'trading-activity':
        //   setDashData(tradingActivityDash)
        //   break;
        case 'environmental':
          setDashData(userDashes?.environmental)
          break;
        // case 'operational-metrics':
        //   setDashData(operationalMetricsDash)
        //   break;
        // case 'notifications':
        //   setDashData(notificationDash)
        //   break;
        case 'verification':
          setDashData(userDashes?.verification)
          break;
        // case 'search':
        //   dashData = handleSearch(route)
        //   break;
        case 'my-media':
          getMediaData()
          break;
        default:
          loadDefaultData()
          break;
      }
    } else if(searchResults){
      setDashData(searchResults);
    } else {
      loadDefaultData()
    }
  }, [route, userDashes, searchResults])

  const getMediaData = async () => {
    if (uid) {
      const mediaData = await mediaDash(uid);
      setDashData(mediaData);
    } else {
      loadDefaultData();
    }
  }

  const loadDefaultData = () => setDashData(userDashes?.main);

  return (
    <Dash dashData={dashData} />
  )
}

export default RenderDash