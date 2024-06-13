import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Player, useCreateAsset } from '@livepeer/react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const DropZoneContainer = styled(motion.div)`
  width: 80%;
  max-width: 500px;
  height: ${({ isPreview }) => (isPreview ? '25px' : '200px')};
  margin-bottom: 10px;
  border: 3px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  font-size: ${({ isPreview }) => (isPreview ? '0.8' : '1')}rem;
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
  box-sizing: border-box;

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

const VideoInputContainer = styled(motion.div)`
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

const Tooltip = styled.div`
  background-color: black !important;
  color: white !important;
  font-size: 14px !important;
  max-width: 200px;
  padding: 10px !important;
  border-radius: 5px !important;
`;

const AssetDataContainer = styled(motion.div)`
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

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
  overflow-x: auto;

  @media (max-width: 767px) {
    justify-content: flex-start;
  }
`;

const TabButton = styled.button`
  margin-right: 10px;
  background-color: ${props => props.active ? '#2A93D5' : '#e1e1e1'};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #007bff;
  }
`;

const ImagePreview = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const TextInput = styled(VideoInputField)`
  max-width: 500px;
  margin-top: 20px;
`;

const VideoUpload = ({ APP }) => {
  const [activeTab, setActiveTab] = useState('video');
  const [videos, setVideos] = useState(null);
  const [landImages, setLandImages] = useState([]);
  const [waterImages, setWaterImages] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [uploadName, setUploadName] = useState('untitled');
  const [uploadDescription, setUploadDescription] = useState('');
  const [previewURL, setPreviewURL] = useState(null);
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [viewAssetData, setViewAssetData] = useState(false);

  // Using refs to keep track of the previous state values
  const prevVideos = useRef(videos);
  const prevLandImages = useRef(landImages);
  const prevWaterImages = useRef(waterImages);

  const tabs = ['video', 'land', 'water'];

  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  useEffect(() => {
    let _activeFile;

    // Compare the previous and current values to determine the most recently changed state
    if (prevVideos.current !== videos) _activeFile = videos?.[0];
    else if (prevLandImages.current !== landImages) _activeFile = landImages?.[0];
    else if (prevWaterImages.current !== waterImages) _activeFile = waterImages?.[0];

    setActiveFile(_activeFile);

    // Update the refs with the current state values for the next render cycle
    prevVideos.current = videos;
    prevLandImages.current = landImages;
    prevWaterImages.current = waterImages;
  }, [videos, landImages, waterImages]);

  const {
    mutate: createAsset,
    data: asset,
    status,
    progress,
    error,
  } = useCreateAsset(
    activeFile
      ? {
        sources: [
          {
            name: activeFile.name,
            file: activeFile,
            storage: {
              ipfs: true,
              metadata: {
                name: uploadName,
                description: uploadDescription,
              },
            },
          },
        ],
      }
      : null,
  );

  const onDrop = useCallback((acceptedFiles) => {
    // Validate file types
    const validFiles = acceptedFiles.filter(file => file.type === 'video/mp4' || file.type === 'application/pdf');

    if (validFiles.length === 0) {
      alert('Invalid file type. Only MP4 videos and PDF files are allowed.');
      return;
    }

    setPreviewURL(URL.createObjectURL(validFiles[0]));

    switch (activeTab) {
      case 'video':
        setVideos(validFiles);
        break;
      case 'land':
        setLandImages(validFiles);
        break;
      case 'water':
        setWaterImages(validFiles);
        break;
      default:
        break;
    }
  }, [activeTab]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'video/mp4': ['.mp4'],
      'application/pdf': ['.pdf'],
    },
  });

  const handleUpload = async () => {
    setIsAppLoading(true);

    if (!activeFile) {
      alert('No file selected for upload.');
      setIsAppLoading(false);
      return;
    }

    try {
      await createAsset?.();
    } catch (error) {
      console.error('Error uploading the asset:', error);
      alert('Error uploading the asset. Please try again.');
    }

    setIsAppLoading(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setActiveFile(null);
    setPreviewURL(null);
  };

  const handleViewAssetData = async () => {
    const res = await MediaAPI.get_all_media();
    setViewAssetData(res.data);
  };

  return (
    <AssetContainer>
      {isAppLoading && (
        <LoaderContainer>
          <Spinner
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </LoaderContainer>
      )}

      <TabContainer>
        {tabs.map((tab) => (
          <TabButton
            key={tab}
            active={activeTab === tab}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </TabButton>
        ))}
      </TabContainer>

      <DropZoneContainer {...getRootProps()} isPreview={previewURL}>
        <input {...getInputProps()} />
        {previewURL ? (
          activeTab === 'video' ? (
            <PreviewPlayer
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Player title={uploadName} playbackId={asset?.[0]?.playbackId} />
            </PreviewPlayer>
          ) : (
            <ImagePreview src={previewURL} />
          )
        ) : (
          <p>Drag & drop a {activeTab} file here, or click to select one</p>
        )}
      </DropZoneContainer>

      <AnimatePresence>
        {activeFile && (
          <VideoInputContainer
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TextInput
              type="text"
              placeholder="Enter file name"
              value={uploadName}
              onChange={(e) => setUploadName(e.target.value)}
            />
            <TextInput
              type="text"
              placeholder="Enter file description"
              value={uploadDescription}
              onChange={(e) => setUploadDescription(e.target.value)}
            />
            <UploadButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUpload}
              disabled={!activeFile}
            >
              Upload
            </UploadButton>
          </VideoInputContainer>
        )}
      </AnimatePresence>

      {asset && (
        <AnimatePresence>
          <AssetDataContainer
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Asset Data:</h3>
            <p>ID: {asset[0]?.id}</p>
            <p>Name: {asset[0]?.name}</p>
            <p>Status: {asset[0]?.status?.phase}</p>
            <a
              className="video-link"
              href={asset[0]?.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
            <button className="btn-more-data" onClick={handleViewAssetData}>
              View More Data
            </button>
            {metrics && <ObjectViewer data={metrics} />}
          </AssetDataContainer>
        </AnimatePresence>
      )}

      <Tooltip id="tooltip" />
    </AssetContainer>
  );
};

export default VideoUpload;
