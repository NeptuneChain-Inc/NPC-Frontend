import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Player, useAssetMetrics, useCreateAsset } from '@livepeer/react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ObjectViewer from '../display/DisplayObject';
import { saveVideo } from '../../../apis/database';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Papa from 'papaparse';
import * as XLSX from 'xlsx/xlsx.mjs';

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

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  // border: 1px solid black;
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

const DataFileUpload = () => {

  const onProcessDataDrop = (files) => {
    const file = files[0];

    if (file) {
      const fileType = file.name.split('.').pop();

      switch (fileType) {
        case 'csv':
          Papa.parse(file, {
            complete: result => {
              console.log('Parsed CSV Result:', result.data);

            },
            header: true
          });
          break;
        case 'xlsx':
          const reader = new FileReader();
          reader.onload = (event) => {
            const data = event.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            console.log('Parsed Excel Data:', jsonData);
          };
          reader.readAsBinaryString(file);
          break;
        default:
          console.log('Unsupported file type:', fileType);
          break;
      }
    }
  }

  const processDataDropzone = useDropzone({
    accept: '.csv, .xlsx',
    onDrop: onProcessDataDrop
  });

  return (
    <DropZoneContainer
      {...processDataDropzone.getRootProps()}
      data-tooltip-id="tooltip"
      data-tooltip-content="Drag and drop a csv or excel data file here or click to browse"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <input {...processDataDropzone.getInputProps()} />
      <p>Drag & drop a CSV or Excel file here, or click to select one</p>
    </DropZoneContainer>
  );
}


export const VideoUpload = ({ APP }) => {
  const [activeTab, setActiveTab] = useState('video');
  const [videos, setVideos] = useState(null);
  const [landImages, setLandImages] = useState([]);
  const [waterImages, setWaterImages] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [pointSourceData, setPointSourceData] = useState('');
  const [sensorData, setSensorData] = useState('');
  const [uploadName, setUploadName] = useState('untitled');
  const [uploadDescription, setUploadDescription] = useState('');
  const [previewURL, setPreviewURL] = useState(null);
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [viewAssetData, setViewAssetData] = useState(false);

  // Using refs to keep track of the previous state values
  const prevVideos = useRef(videos);
  const prevLandImages = useRef(landImages);
  const prevWaterImages = useRef(waterImages);
  const prevPointSourceData = useRef(pointSourceData);

  const tabs = ['video', 'land', 'water', 'source', 'sensor'];

  const { user } = APP ? APP.STATES : {};

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
    else if (prevPointSourceData.current !== pointSourceData) _activeFile = pointSourceData;

    console.log({ activeFile });
    setActiveFile(_activeFile)

    // Update the refs with the current state values for the next render cycle
    prevVideos.current = videos;
    prevLandImages.current = landImages;
    prevWaterImages.current = waterImages;
    prevPointSourceData.current = pointSourceData;
  }, [videos, landImages, waterImages, pointSourceData]);


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
      console.log(asset, uploadName);
      _saveVideo();
    }
  }, [asset])


  useEffect(() => {
    if (activeFile?.name) {
      setUploadName(activeFile.name);
    }
  }, [activeFile])

  const _saveVideo = async () => {
    if (!user?.uid) {
      return false;
    }
    const isSaved = await saveVideo(asset?.[0], user?.uid);
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
    if (acceptedFiles?.[0]) {
      setVideos(acceptedFiles);
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

  const onImageDrop = useCallback((acceptedFiles, type) => {
    if (acceptedFiles?.[0]) {
      if (type === 'land') setLandImages([...landImages, ...acceptedFiles]);
      else if (type === 'water') setWaterImages([...waterImages, ...acceptedFiles]);
      const objectURL = URL.createObjectURL(acceptedFiles[0]);
      setPreviewURL(objectURL);
    }
  }, [landImages, waterImages]);

  const landDropzone = useDropzone({
    accept: 'image/*',
    onDrop: files => onImageDrop(files, 'land')
  });

  const waterDropzone = useDropzone({
    accept: 'image/*',
    onDrop: files => onImageDrop(files, 'water')
  });

  const Dropzone = useDropzone({
    accept: 'image/*',
    onDrop: files => onImageDrop(files, 'water')
  });

  const handleUpload = () => {
    setIsAppLoading(true);
    //Create Livepeer Asset
    createAsset?.();
  };

  return (
    <AssetContainer>
      <Tooltip id='tooltip' place='bottom' />
      {/* Tab Navigation */}
      <TabContainer>
        {tabs?.map(tab => (
          <TabButton
            key={tab}
            active={tab === activeTab}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </TabButton>
        ))}
      </TabContainer>

      {/* Loading Spinner */}
      <AnimatePresence>
        {isAppLoading && (
          <LoaderContainer>
            <Spinner />
          </LoaderContainer>
        )}
      </AnimatePresence>


      {/* Video Upload Section */}
      {activeTab === 'video' && (
        <>
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
              <p>Drag and drop or browse video files</p>
            </DropZoneContainer>
          )}
        </>
      )}

      {/* Land Images Upload Section */}
      {activeTab === 'land' && (
        <>
          <DropZoneContainer
            {...landDropzone.getRootProps()}
            data-tooltip-id="tooltip"
            data-tooltip-content="Drag and drop image files here or click to browse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <input {...landDropzone.getInputProps()} />
            <p>Drag & drop or browse land images</p>
          </DropZoneContainer>
          <div>
            {landImages.map((img, index) => (
              <ImagePreview key={index} src={URL.createObjectURL(img)} />
            ))}
          </div>
        </>
      )}

      {/* Water Images Upload Section */}
      {activeTab === 'water' && (
        <>
          <DropZoneContainer
            {...waterDropzone.getRootProps()}
            data-tooltip-id="tooltip"
            data-tooltip-content="Drag and drop image files here or click to browse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <input {...waterDropzone.getInputProps()} />
            <p>Drag & drop or browse water images</p>
          </DropZoneContainer>
          <div>
            {waterImages.map((img, index) => (
              <ImagePreview key={index} src={URL.createObjectURL(img)} />
            ))}
          </div>
        </>
      )}

      {/* Point Source Data Upload Section */}
      {activeTab === 'source' && <DataFileUpload />}

      {/* Sensor Data Upload Section */}
      {activeTab === 'sensor' && <DataFileUpload />}

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
              <img src={previewURL} alt='Uploaded Image' />
              Your browser does not support the video tag.
            </video>
          </PreviewPlayer>

        )}

        {!asset?.id && <p>{activeFile?.name || 'Select a file to upload.'}</p>}

        {(activeFile && !asset && !progressFormatted) && (
          <VideoInputContainer>
            <VideoInputField
              type="text"
              placeholder="Enter a title"
              value={uploadName}
              onChange={(e) => setUploadName(e.target.value)}
            />
            <VideoInputField
              type="text"
              placeholder="Enter a description"
              value={uploadDescription}
              onChange={(e) => setUploadDescription(e.target.value)}
            />
          </VideoInputContainer>
        )}

        {progressFormatted && <p>{progressFormatted}</p>}

        {(activeFile?.name && !asset?.id && !progressFormatted && !asset?.[0]?.playbackId) && (
          <UploadButton
            onClick={handleUpload}
            //disabled={isLoading || !video}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-tooltip-id="tooltip"
            data-tooltip-content={`Click to upload files`}

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