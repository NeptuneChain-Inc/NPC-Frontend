import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Player, useAssetMetrics, useCreateAsset } from '@livepeer/react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ObjectViewer from '../elements/DisplayObject';
import { SaveVideo } from '../../apis/database';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const DropZoneContainer = styled(motion.div)`
  width: 80%;
  max-width: 500px;
  height: ${({ isPreview }) => isPreview ? '25px' : '200px'};
  margin-bottom: 10px;
  border: 3px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  font-size: ${({ isPreview }) => isPreview ? '0.8' : '1'}rem;
  transition: all 0.5s ease-in-out;
  &:hover {
    border-color: #007bff;
  }

  @media (max-width: 768px) {
      width: 100%;
  }
`;

const UploadButton = styled(motion.button)`
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
  font-weight: bold;

  :disabled {
    background-color: grey;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #0056b3;
  }
`;

const AssetContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
font-size: 18px;
padding: 2em;

@media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  .video-link {
    margin: 10px;
    padding: 5px 10px;
    border: 1px solid black;
    border-radius: 5px;
    text-decoration: none;
    color: white;
    background: #134b5f;
    transition: 0.3s ease-in-out;

    &:hover {
      scale: 1.1;
    }
  }

  .btn-more-data {
    margin: 5px;
    padding: 5px 10px;
    border: 1px solid black;
    border-radius: 5px;
    color: white;
    background: #134b5f;
    transition: 0.2s ease-in-out;

    &:hover {
      scale: 1.1;
    }
  }
`;

const VideoInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const VideoInputField = styled.input`
  padding: 10px;
  margin: 5px;
  width: 80%;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: calc(100% - 20px);

  &:focus {
    border-color: #007bff;
  }
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  background: #0000001a;
  z-index: 999;
`;

const Spinner = styled(motion.div)`
  border: 4px solid rgba(255, 255, 255, 0.3);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border-top: 4px solid #007bff;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Tooltip = styled(ReactTooltip)`
  background-color: black !important;
  color: white !important;
  font-size: 14px !important;
  max-width: 200px;
  padding: 10px !important;
  border-radius: 5px !important;
`;

const AssetDataContainer = styled.div`
  background-color: #f7f7f7;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const PreviewPlayer = styled(motion.div)`
width: 50%;
transition: all 0.5s ease-in-out;
`;

// Your main component
export const VideoUpload = ({ APP }) => {
  const [video, setVideo] = useState();
  const [videoName, setVideoName] = useState('untitled');
  const [videoDescription, setVideoDescription] = useState('');
  const [previewURL, setPreviewURL] = useState(null);
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [viewAssetData, setViewAssetData] = useState(false);

  const { user } = APP ? APP.STATES : {};

  const metadata = {
    videoName,
    videoDescription
  }

  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);


  const {
    mutate: createAsset,
    data: asset,
    status,
    progress,
    error,
  } = useCreateAsset(
    video
      ? {
        sources: [
          {
            name: video.name,
            file: video,
            storage: {
              ipfs: true,
              metadata: {
                name: metadata.videoName,
                description: metadata.videoDescription,
              }
            }
          }
        ],
      }
      : null,
  );

  useEffect(() => {
    if (asset?.[0]?.playbackId) {
      // Save/Handle Video Asset 
      console.log(asset, metadata);
      _SaveVideo();
    }
  }, [asset])


  useEffect(() => {
    if (video?.name) {
      setVideoName(video.name);
    }
  }, [video])

  const _SaveVideo = async () => {
    if (!user?.uid) {
      return false;
    }
    const isSaved = await SaveVideo(asset?.[0], user?.uid);
    if (isSaved) {
      APP?.ACTIONS?.logNotification('', "Video Now Live");
    } else if (isSaved?.error) {
      APP?.ACTIONS?.logNotification('error', isSaved.error.message);
    } else {
      APP?.ACTIONS?.logNotification('alert', "Could Not Process Video");
    }
  }

  const { data: metrics } = useAssetMetrics({
    assetId: asset?.[0].id,
    refetchInterval: 30000,
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      setVideo(acceptedFiles[0]);
      const objectURL = URL.createObjectURL(acceptedFiles[0]);
      setPreviewURL(objectURL);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'video/*': ['*.mp4'],
    },
    maxFiles: 1,
    onDrop,
  });

  const isLoading = useMemo(
    () =>
      status === 'loading' ||
      (asset?.[0] && asset[0].status?.phase !== 'ready'),
    [status, asset],
  );

  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === 'failed'
        ? 'Failed to process video.'
        : progress?.[0].phase === 'waiting'
          ? 'Waiting...'
          : progress?.[0].phase === 'uploading'
            ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
            : progress?.[0].phase === 'processing'
              ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
              : null,
    [progress],
  );

  useEffect(() => {
    if (progress === null) {
      setIsAppLoading(true);
    } else {
      setIsAppLoading(false);
    }
  }, [progress])


  const handleUpload = () => {
    setIsAppLoading(true);
    //Create Livepeer Asset
    createAsset?.();
  };

  return (
    <AssetContainer>
      <Tooltip id='tooltip' place='bottom' />

      {/* Loading Spinner */}
      <AnimatePresence>
        {isAppLoading && (
          <LoaderContainer>
            <Spinner />
          </LoaderContainer>
        )}
      </AnimatePresence>

      {/* Dropzone */}
      {!asset && (
        <DropZoneContainer
          {...getRootProps()}
          data-tooltip-id="tooltip"
          data-tooltip-content="Drag and drop video files here or click to browse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          isPreview={Boolean(previewURL)}
        >
          <input {...getInputProps()} />
          <p>Drag and drop or browse files</p>
        </DropZoneContainer>
      )}

      <div>

        {/* {metrics?.metrics?.[0] && (
          <p>Views: {metrics?.metrics?.[0]?.startViews}</p>
        )} */}

        {(!asset && previewURL) && (
          <PreviewPlayer
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <video controls width="400">
              <source src={previewURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </PreviewPlayer>

        )}

        {!asset?.id && <p>{video ? (metadata.videoName ? metadata.videoName : video.name) : 'Select a video file to upload.'}</p>}

        {(video && !asset && !progressFormatted) && (
          <VideoInputContainer>
            <VideoInputField
              type="text"
              placeholder="Enter video name"
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
            />
            <VideoInputField
              type="text"
              placeholder="Enter video description"
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
            />
          </VideoInputContainer>
        )}

        {progressFormatted && <p>{progressFormatted}</p>}

        {(video?.name && !asset?.id && !progressFormatted && !asset?.[0]?.playbackId) && (
          <UploadButton
            onClick={handleUpload}
            //disabled={isLoading || !video}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-tooltip-id="tooltip"
            data-tooltip-content="Click to upload video"

          >
            Upload
          </UploadButton>
        )}
      </div>

      {/* Player */}
      {asset?.[0]?.playbackId && (
        <AnimatePresence>
          <Player title={asset[0].name} playbackId={asset[0].playbackId} />
          <a className='video-link' href={`/media/${asset[0].playbackId}`} target='_blank'>Open Video</a>
          <span className='btn-more-data' onClick={() => setViewAssetData(!viewAssetData)}>{`${!viewAssetData ? 'View' : 'Hide'} Details`}</span>
          {viewAssetData && (
            <AssetDataContainer>
              <ObjectViewer data={asset?.[0]} />
            </AssetDataContainer>
          )}
        </AnimatePresence>
      )}
    </AssetContainer>
  );
};