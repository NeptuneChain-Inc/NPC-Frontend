import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RenderDash from '../dashboards/RenderDash'

const Home = ({ APP }) => {
  const navigate = useNavigate();
  const { dashID } = useParams();
  const { user, searchResults } = APP ? APP.STATES : {};
  console.log('USER',user);

  if (user === null) {
    navigate('/')
  }

  return <RenderDash route={dashID} uid={user?.uid} userDashes={user?.dashData} searchResults={searchResults} APP={APP}/>
}

export default Home;






