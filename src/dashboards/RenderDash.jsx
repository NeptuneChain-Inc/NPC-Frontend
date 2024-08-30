import React, { useEffect, useState } from "react";
import { Dash } from "../components";
import { dashDataInit } from "../components/dash.data";

const RenderDash = ({ route }) => {
  const { STATES } = useAppContext();
  const [userDashes, setUserDashes] = useState(null);
  const [dashData, setDashData] = useState(null);
  const { user, searchResults } = STATES || {};
  const { uid } = user || {};

  useEffect(() => {
    if (uid) {
      init()
    }
  }, [uid]);

  useEffect(() => {
    if (route && !searchResults) {
      const userDash = userDashes?.[route];
      if (userDash) {
        setDashData(userDash);
      }
    } else if (searchResults) {
      setDashData(searchResults);
    }
  }, [route, userDashes, searchResults]);

  const init = async () => {
    setUserDashes(await dashDataInit(uid));
  }

  if (!dashData) {
    return <p>Dashboard Not Available</p>
  }

  return <Dash dashData={dashData} />;
};

export default RenderDash;
