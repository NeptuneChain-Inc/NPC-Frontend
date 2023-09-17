import React from 'react'
import { OverviewDash } from '../components'
import { overviewDash, environmentalDash, financialDash, tradingActivityDash, operationalMetricsDash, notificationDash, verificationDash } from './dashData'

const renderDash = (route) => {
  let dashData;
  switch (route) {
    case 'financial-metrics':
      dashData = financialDash
      break;
    case 'trading-activity':
      dashData = tradingActivityDash
      break;
    case 'environmental-metrics':
      dashData = environmentalDash
      break;
    case 'operational-metrics':
      dashData = operationalMetricsDash
      break;
    case 'notifications':
      dashData = notificationDash
      break;
    case 'verifications':
      dashData = verificationDash
      break;
      // case 'search':
      //   dashData = handleSearch(route)
      //   break;
    default:
      dashData = overviewDash
      break;
  }

  return (
    <OverviewDash dashData={dashData} />
  )
}

export default renderDash