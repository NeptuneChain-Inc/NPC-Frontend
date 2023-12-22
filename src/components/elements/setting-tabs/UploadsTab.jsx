import React, { useState, useEffect } from 'react';
import { getUserVideos } from '../../../apis/database';

const UploadsTab = ({ userId }) => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, [userId]);

  const fetchVideos = async () => setUploads(getUserVideos(userId))

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
