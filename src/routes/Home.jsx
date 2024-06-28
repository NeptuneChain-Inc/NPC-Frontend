import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RenderDash from '../dashboards/RenderDash'

const Home = ({ APP }) => {
  const navigate = useNavigate();
  const { dashID } = useParams();

  const { user } = APP?.STATES || {};

  if (user === null) {
    navigate('/');
    return;
  }

  return <RenderDash APP={APP} route={dashID} />
}

export default Home;






