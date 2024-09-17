import { useEffect, useState } from "react";
import axios from "axios";
import {NPCCreditsAPI} from "../scripts/back_door";

const useFetchNPCCreditEvents = (updateCache) => {
  const [eventsData, setEventsData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const cacheKey = "npcCreditsEventsCache";

  const fetchEvents = async () => {
    try {
      // Fetch events from the backend API
      const events = await NPCCreditsAPI.getNPCCreditEvents();;

      // Cache the fetched data
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          data: events,
          timestamp: Date.now(),
        })
      );

      // Update the state with the fetched events
      setEventsData(events);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setErrorMessage("Failed to fetch events");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch cached data if available
    const cachedData = JSON.parse(localStorage.getItem(cacheKey));

    if (cachedData && !updateCache) {
      setEventsData(cachedData.data);
      setLoading(false);
    } else {
      // If no cache or cache is stale, fetch new data from API
      fetchEvents();
    }
  }, [updateCache]);

  return { eventsData, errorMessage, loading };
};

export default useFetchNPCCreditEvents;
