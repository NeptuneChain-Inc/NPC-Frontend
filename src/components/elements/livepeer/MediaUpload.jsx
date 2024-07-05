import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, isSupported } from "tus-js-client";
//import { colors } from "../../../styles/colors";
import { UploadButton } from "./elements/MediaGallery";
import { LivepeerAPI, MediaAPI } from "../../../scripts/back_door";
import { logDev, proxyLivepeerOriginEndpoint } from "../../../scripts/helpers";
import configs from "../../../../configs";
import UploadProgress from "./UploadProgress";
import AssetDisplay from "./AssetDisplay";
import { Player } from "@livepeer/react";

const colors = {
  primaryBlue: "#1B3B6F",
  accentBlue: "#62B6F1",
  white: "#FFFFFF",
  lightGrey: "#F0F0F0",
  darkGrey: "#333333",
};

const DropZoneContainer = styled(motion.div)`
  width: 80%;
  max-width: 500px;
  margin: auto;
  height: ${({ isPreview }) => (isPreview ? "25px" : "200px")};
  margin-bottom: 10px;
  border: 3px dashed ${colors.accentBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  font-size: ${({ isPreview }) => (isPreview ? "0.8" : "1")}rem;
  transition: all 0.5s ease-in-out;
  background: ${colors.lightGrey};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: ${colors.primaryBlue};
    background: ${colors.accentBlue};
    color: ${colors.white};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem;
    box-sizing: border-box;
  }
`;

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

  background: ${colors.white}90;
  backdrop-filter: blur(1rem);
  border-radius: 2rem;

  overflow: ${({ isLoading }) => (isLoading ? "hidden" : "auto")};

  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;

  .video-link {
    margin: 10px;
    padding: 5px 10px;
    border: 1px solid ${colors.darkGrey};
    border-radius: 5px;
    text-decoration: none;
    color: ${colors.white};
    background: ${colors.accentBlue};
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }

  .btn-more-data {
    margin: 5px;
    padding: 5px 10px;
    border: 1px solid ${colors.darkGrey};
    border-radius: 5px;
    color: ${colors.white};
    background: ${colors.primaryBlue};
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
  bottom: 0;
  width: 100%;
  height: 105%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const Spinner = styled(motion.div)`
  border: 4px solid rgba(255, 255, 255, 0.3);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border-top: 4px solid ${colors.primaryBlue};
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

  border: 1px solid ${colors.accentBlue};
  border-radius: 4px;

  &:focus {
    border-color: ${colors.primaryBlue};
    outline: none;
    box-shadow: 0 0 0 3px rgba(27, 59, 111, 0.25);
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

const AssetPlayer = styled(Player)`
  ${previewStyles}
`;

const DocPreview = styled.iframe`
  ${previewStyles}
`;

const ConcludeButton = styled(UploadButton)`
  background: #000;
  width: 60%;
  margin: auto;
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

const DEFAULT_THUMBNAIL = ["https://www.ncl.ac.uk/mediav8/newcastle-university-in-singapore/images/key-water.jpg"]

const MediaUpload = ({ APP, togglePopup }) => {
  const [file, setFile] = useState(null);
  const [uploadName, setUploadName] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPercentage, setuploadPercentage] = useState(0);
  const [asset, setAsset] = useState(null);

  const { user } = APP?.STATES || {};

  const { activeFile, previewURL } = file || {};

  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  useEffect(() => {
    if (activeFile?.name && uploadName.length === 0) {
      setUploadName(activeFile.name);
    }
  }, [activeFile]);

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
    if (!activeFile) {
      alert("No file selected for upload.");
      return;
    }

    setIsLoading(true);
    try {
      // Make an API call to get the tus endpoint
      const { result } =
        (await LivepeerAPI.assetOps.create(
          {
            name: uploadName,
            staticMp4: activeFile.type === "video/mp4",
            storage: {
              ipfs: true,
              metadata: {
                name: uploadName,
                description: uploadDescription,
              },
            },
          },
          user?.uid
        )) || {};
      const { tusEndpoint, asset } = result || {};

      logDev("Media Upload", { result, tusEndpoint });

      if (!isSupported) {
        alert(
          "This browser does not support uploads. Please use a modern browser instead."
        );
      }

      if (tusEndpoint) {
        const endpoint = `${configs.server_url}${proxyLivepeerOriginEndpoint(
          tusEndpoint
        )}`;
        console.log("proxy-endpoint", endpoint);

        //https://github.com/tus/tus-js-client/blob/main/docs/api.md
        const upload = new Upload(activeFile, {
          endpoint,
          retryDelays: [0, 3000, 5000, 10000, 20000],
          metadata: {
            filename: uploadName,
            filetype: activeFile.type,
          },
          uploadSize: activeFile.size,
          overridePatchMethod: true,
          onError(err) {
            console.error("Error uploading file:", err);
            setuploadPercentage(0);
          },
          onProgress(bytesUploaded, bytesTotal) {
            setuploadPercentage(Math.round((bytesUploaded / bytesTotal) * 100));
          },
          onSuccess() {
            console.log("Upload finished:", upload.url, asset);
            setTimeout(() => {
              handleUploadSuccess(asset);
            }, 5000);
          },
        });

        const previousUploads = await upload.findPreviousUploads();

        if (previousUploads.length > 0) {
          upload.resumeFromPreviousUpload(previousUploads[0]);
        }

        upload.start();
      } else {
        throw new Error("Could not get upload endpoint");
      }
    } catch (error) {
      console.error("Error uploading the asset:", error);
      alert("Error uploading the asset. Please try again.");
    } finally {
      setIsLoading(false);
    }

    async function getThumbnailUrls(playbackInfo) {

      if(!playbackInfo){
        return DEFAULT_THUMBNAIL;
      }
      const jpegSource = playbackInfo.meta.source.find(
        (source) =>
          source.type === "image/jpeg" ||
          (source.hrn === "Thumbnail (JPEG)" && source.type.includes("image"))
      );

      if (jpegSource) {
        // If JPEG thumbnail is found, return it as a single-item array
        return [jpegSource.url];
      } else {
        const vttSource = playbackInfo.meta.source.find(
          (source) => source.type === "text/vtt"
        );

        if (vttSource) {
          // If VTT file is found, parse it to get thumbnail URLs
          const vttUrl = vttSource.url;
          return await parseVttFile(vttUrl);
        } else {
          // If no thumbnail source is found
          console.warn("No thumbnail source found in playback info");
          return DEFAULT_THUMBNAIL;
        }
      }
    }

    async function parseVttFile(vttUrl) {
      const response = await fetch(vttUrl);
      const vttText = await response.text();

      // Parse VTT content
      const lines = vttText.split("\n");
      const thumbnailUrls = [];

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].endsWith(".jpg")) {
          thumbnailUrls.push(new URL(lines[i], vttUrl).toString());
        }
      }

      return thumbnailUrls;
    }

    const handleUploadSuccess = async (asset) => {
      if (asset?.id) {
        var _playbackInfo;
        try {
          // *TO-DO Listen When playback is ready
          const { playbackInfo } = await LivepeerAPI.playbackOps.get.playbackInfo(
            asset.playbackId
          );

          logDev("playbackInfo", { playbackInfo, playbackID: asset.playbackId });
          _playbackInfo = playbackInfo;
        } catch (error) {
          console.error(error)
        }

        
        const { result } = await MediaAPI.create.mediaMetadata(asset.id, {
          name: uploadName,
          description: uploadDescription,
          tags: ["NPC"],
          thumbnailUrl: _playbackInfo ? await getThumbnailUrls(_playbackInfo) : DEFAULT_THUMBNAIL,
        });

        setAsset(asset);
          setuploadPercentage(0);
      }
    };
  };

  const concludeUpload = () => {
    setFile(null);
    setUploadName("");
    setUploadDescription("");
    setAsset(null);
    togglePopup?.();
  };

  return (
    <AssetContainer isLoading={isLoading || uploadPercentage > 0}>
      <UploadButton onClick={togglePopup}>Exit</UploadButton>
      {(isLoading || uploadPercentage > 0) && (
        <LoaderContainer>
          <Spinner
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          {uploadPercentage > 0 && (
            <UploadProgress progress={uploadPercentage} />
          )}
        </LoaderContainer>
      )}

      <InputPreviewContainer>
        {asset ? (
          <div className="flex-col">
            <AssetPlayer title={asset.name} playbackId={asset.playbackId} />
          </div>
        ) : (
          <div className="flex-col">
            {previewURL?.length > 0 && activeFile?.type === "video/mp4" && (
              <>{renderPreview(previewURL, activeFile.type)}</>
            )}
            <DropZoneContainer {...getRootProps()} isPreview={previewURL}>
              <input {...getInputProps()} />
              <p>Drag & drop a MP4 or PDF file here, or click to select one</p>
            </DropZoneContainer>
          </div>
        )}

        {asset ? (
          <AnimatePresence>
            <div className="flex-col">
              <AssetDisplay asset={asset} />
              <ConcludeButton onClick={concludeUpload}>Conclude</ConcludeButton>
            </div>
          </AnimatePresence>
        ) : (
          activeFile && (
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
          )
        )}
      </InputPreviewContainer>
    </AssetContainer>
  );
};

export default MediaUpload;
