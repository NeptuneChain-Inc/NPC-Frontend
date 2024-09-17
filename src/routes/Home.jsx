import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RenderDash from '../dashboards/RenderDash'
import {useAppContext} from '../context/AppContext';

const Home = () => {
  const { STATES } = useAppContext();
  const navigate = useNavigate();
  const { dashID } = useParams();

  const { user } = STATES || {};

  if (user === null) {
    navigate('/');
    return;
  }

  return <RenderDash route={dashID} />
}

export default Home;






