import React, { useState, useEffect } from "react";

//#BACK_END
import { UserAPI } from "../../../scripts/back_door";

const UploadsTab = ({ userId }) => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, [userId]);

  const fetchVideos = async () => {
    const { videos, error } = await UserAPI.get.videos(userId);

    if (error) {
      console.error(videos);
    }

    if (videos) {
      setUploads(videos);
    }
  };

  return (
    <div>
      {uploads.length > 0 ? (
        uploads.map((upload, index) => (
          <div key={index}>
            {/* Display your upload data here */}
            <p>{JSON.stringify(upload)}</p>
          </div>
        ))
      ) : (
        <p>No uploads found.</p>
      )}
    </div>
  );
};

export default UploadsTab;
