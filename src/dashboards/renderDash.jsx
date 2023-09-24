import React, { useEffect, useState } from 'react'
import { OverviewDash } from '../components'
import { overviewDash, environmentalDash, financialDash, tradingActivityDash, operationalMetricsDash, notificationDash, verificationDash, mediaDash } from './dashData'

const RenderDash = ({ route, uid }) => {
  const [dashData, setDashData] = useState({});

  console.log({ route, uid });

  useEffect(() => {
    if (route) {
      switch (route) {
        case 'financial-metrics':
          setDashData(financialDash)
          break;
        case 'trading-activity':
          setDashData(tradingActivityDash)
          break;
        case 'environmental-metrics':
          setDashData(environmentalDash)
          break;
        case 'operational-metrics':
          setDashData(operationalMetricsDash)
          break;
        case 'notifications':
          setDashData(notificationDash)
          break;
        case 'verifications':
          setDashData(verificationDash)
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
    } else {
      loadDefaultData()
    }
  }, [route, uid])

  const getMediaData = async () => {
    if (uid) {
      const mediaData = await mediaDash(uid);
      setDashData(mediaData);
    } else {
      loadDefaultData();
    }
  }

  const loadDefaultData = () => setDashData(overviewDash);

  return (
    <OverviewDash dashData={dashData} />
  )
}

export default RenderDash