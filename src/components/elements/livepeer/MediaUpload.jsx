import React, { useState, useCallback, useEffect } from "react";
import { Player, useCreateAsset } from "@livepeer/react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { colors, logoColors } from "../../../styles/colors";
import { MediaAPI } from "../../../scripts/back_door";
import { extractAndCleanUrls } from "../../../scripts/utils";
import { UploadButton } from "./elements/MediaGallery";

const DropZoneContainer = styled(motion.div)`
  width: 80%;
  max-width: 500px;
  margin: auto;
  height: ${({ isPreview }) => (isPreview ? "25px" : "200px")};
  margin-bottom: 10px;
  border: 3px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  font-size: ${({ isPreview }) => (isPreview ? "0.8" : "1")}rem;
  transition: all 0.5s ease-in-out;
  background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: #007bff;
    background: linear-gradient(135deg, #e0e0e0, #cfcfcf);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem;
    box-sizing: border-box;
  }
`;

// const UploadButton = styled(motion.button)`
//   padding: 12px 24px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-top: 20px;
//   transition: background-color 0.3s, transform 0.2s;
//   font-weight: bold;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

//   :disabled {
//     background-color: grey;
//     cursor: not-allowed;
//   }

//   &:hover:enabled {
//     background-color: #0056b3;
//     transform: scale(1.05);
//   }

//   &:active:enabled {
//     transform: scale(0.95);
//   }
// `;

const AssetContainer = styled.div`
  position: fixed;
  top: 10%;
  width: 70%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  font-size: 18px;
  padding: 2em;
  box-sizing: border-box;
  z-index: 1000;

  background: #ffffff90;
  backdrop-filter: blur(1rem);
  border-radius: 2rem;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;

    overflow-y: auto;
    

  .video-link {
    margin: 10px;
    padding: 5px 10px;
    border: 1px solid black;
    border-radius: 5px;
    text-decoration: none;
    color: white;
    background: ${colors.accentBlue};
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }

  .btn-more-data {
    margin: 5px;
    padding: 5px 10px;
    border: 1px solid black;
    border-radius: 5px;
    color: white;
    background: #134b5f;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
  width: 90%;
  height: 83vh;
  padding: 0.5em;
  justify-content: flex-start;
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
  background: rgba(0, 0, 0, 0.1);
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

const AssetDataContainer = styled(motion.div)`
  background-color: #f7f7f7;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const AssetPreviewPlayer = styled(motion.div)`
  height: 100%;
  border: 10px solid red;
  transition: all 0.5s ease-in-out;
`;

const InputPreviewContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .flex-col {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (max-width: 768px) {
      flex-direction: column;
      justify-content: flex-start;

    .flex-col {
      padding: 1rem;
      box-sizing: border-box;
    }
  }
`;

const VideoInputContainer = styled(motion.div)`
  width: 50%;
  display: flx;
  flex-direction: column;
  align-items: center;

  padding: 4rem;

  @media (max-width: 768px) {
  width: 80%;
padding: 1rem;
  }
`;

const TextInput = styled.input`
  width: 80%;
  max-width: 500px;
  padding: 10px;

  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;

const previewStyles = `
  width: 100%;
  height: 30rem;
  padding: 1rem;
  box-sizing: border-box;
  border: none;

  @media (max-width: 768px) {

    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }
`;

const VideoPreview = styled.video`
  ${previewStyles}
`;

const DocPreview = styled.iframe`
  ${previewStyles}
`;

const renderPreview = (previewURL, fileType) => {
  if (!(previewURL?.length > 0)) return null;

  if (fileType === "video/mp4") {
    return (
      <VideoPreview controls>
        <source src={previewURL} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoPreview>
    );
  } else if (fileType === "application/pdf") {
    return (
      <DocPreview src={previewURL} title="PDF Preview">
        This browser does not support PDFs. Please download the PDF to view it.
      </DocPreview>
    );
  } else {
    return null;
  }
};

const MediaUpload = ({ APP, togglePopup }) => {
  const [file, setFile] = useState(null);
  const [uploadName, setUploadName] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [isAppLoading, setIsAppLoading] = useState(false);

  const { activeFile, previewURL } = file || {};

  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  useEffect(() => {
    if(activeFile?.name && uploadName.length === 0) {
      setUploadName(activeFile.name);
    }
  }, [activeFile])

  //livepeer_docs: https://docs.livepeer.org/sdks/react/migration/3.x/asset/useCreateAsset
  

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
      : null
  );

  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles.filter(
      (file) => file.type === "video/mp4" || file.type === "application/pdf"
    );

    if (validFiles.length === 0) {
      alert("No valid files. Only MP4 videos and PDF files are allowed.");
      return;
    }

    setFile({
      activeFile: validFiles[0],
      previewURL: URL.createObjectURL(validFiles[0]),
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "video/mp4": [".mp4"],
      "application/pdf": [".pdf"],
    },
  });

  const handleUpload = async () => {
    setIsAppLoading(true);

    if (!activeFile) {
      alert("No file selected for upload.");
    } else {
      try {
        console.log("Create Assest", await createAsset?.());
      } catch (error) {
        console.error("Error uploading the asset:", error);
        alert("Error uploading the asset. Please try again.");
      }
    }

    setIsAppLoading(false);
  };

  return (
    <AssetContainer>
      <UploadButton onClick={togglePopup}>Exit</UploadButton>
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

      <InputPreviewContainer>
        <div className="flex-col">
          {previewURL?.length > 0 &&
            (activeFile?.type === "video/mp4" && asset?.[0]?.playbackId ? (
              <AssetPreviewPlayer
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Player title={uploadName} playbackId={asset[0].playbackId} />
              </AssetPreviewPlayer>
            ) : (
              <>{renderPreview(previewURL, activeFile.type)}</>
            ))}
          <DropZoneContainer {...getRootProps()} isPreview={previewURL}>
            <input {...getInputProps()} />
            <p>Drag & drop a MP4 or PDF file here, or click to select one</p>
          </DropZoneContainer>
        </div>

        {activeFile && (
          <AnimatePresence>
            <VideoInputContainer
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
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
          </AnimatePresence>
        )}
      </InputPreviewContainer>

      {asset && (
        <AnimatePresence>
          <AssetDataContainer
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
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
    </AssetContainer>
  );
};

export default MediaUpload;
