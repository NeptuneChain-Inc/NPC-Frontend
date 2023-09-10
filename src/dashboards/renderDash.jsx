import React from 'react'
import { OverviewDash } from '../components'
import { overviewDash,environmentalDash } from './dashData'

const renderDash = (route) => {
    switch (route) {
      case 'financial-metrics':
        return (
          <h1>Financial Metrics</h1>
        )
      case 'trading-activity':
        return (
          <h1>Trading Activity</h1>
        )
      case 'environmental-metrics':
        return (
          <OverviewDash dashData={environmentalDash}/>
        )
      case 'operational-metrics':
        return (
          <h1>Operational Metrics</h1>
        )
      case 'notifications':
        return (
          <h1>Notifications and Alerts</h1>
        )
      case 'verifications':
        return (
          <h1>Blockchain & Verification</h1>
        )
      default:
        return (
          <OverviewDash dashData={overviewDash}/>
        )
    }
  }

export default renderDash