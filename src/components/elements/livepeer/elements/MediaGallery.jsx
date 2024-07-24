import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {logoColors} from "../../../../styles/colors";
import MediaUpload from "../MediaUpload";
import {UserAPI} from "../../../../scripts/back_door";
import {logDev} from "../../../../scripts/helpers";
import { ButtonPrimary } from "../../../shared/button/Button";



const MediaGallery = ({APP}) => {
  const [isMediaUpload, setIsMediaUpload] = useState(false);
  const [media, setMedia] = useState([]);

  const { user } = APP?.STATES || {};
  const { setVerificationUIOpen, setVerificationData } = APP?.ACTIONS || {};

  useEffect(() => {
    if(user){
      getMedia(user.uid);
    }
  }, [])
  

  useEffect(() => {
    if(media){
      logDev("MediaGallery: user media", {media})
    }
  }, [media])
  

  //Get User Media
  const getMedia = async (userUID) => {
    const {user_media} = await UserAPI.get.media(userUID);
    setMedia(user_media);
  }

  const toggleMediaUpload = () => setIsMediaUpload(!isMediaUpload);

  const handleAssetVerification = (assetID) => {
    setVerificationUIOpen?.(true);
    setVerificationData?.({
      assetID
    })
  }

  return (
    <PageContainer>

    <Gallery>

{media?.map((data, index) => {
  const { assetID, playbackID, metadata } = data || {};
  const { name, description, tags, thumbnailUrl } = metadata || {};
  

  if (metadata) {
    return (
      <div key={index}>
        <input type="radio" name="slide" id={`c${index}`} />
        <label htmlFor={`c${index}`} className="card" style={{backgroundImage: `url(${thumbnailUrl?.[0]})`}}>
          <div className="row">
            <div className="icon">{index}</div>
            <div className="metadata">
              <h4>{name}</h4>
              <p>{description}</p>
              <div className="tags"> 
              {tags?.map((tag, index) => {
                <span key={index}>{tag}</span>
              })}
            </div>
              <VerificationButton onClick={() => handleAssetVerification(assetID)}>Verification</VerificationButton>
            </div>
          </div>
        </label>
      </div>
    );
  } else{
    return null
  }
})}
</Gallery>


        <MediaUpload togglePopup={toggleMediaUpload} APP={APP}/>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  h1 {
  font-size: 1.5rem;
  }
`;

export const UploadButton = styled.div`
  background: ${logoColors.primary};
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
  padding: 0.8rem 1.3rem;
  background: ${logoColors.primary};
  color: #fff;
  }
`;




const Gallery = styled.div`
width: 90%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  box-sizing: border-box;
  overflow-x: auto;

  ul {
    list-style-type: none;
  }

  img {
    height: auto;
  }

  .card {
    width: 100px;
    height: 55vh;
    border-radius: 0.75rem;
    background-size: cover;
    cursor: pointer;
    overflow: hidden;
    border-radius: 2rem;
    margin: 0 10px;
    display: flex;
    align-items: flex-end;
    transition: 0.6s cubic-bezier(0.28, -0.03, 0, 0.99);
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.8);
  }

  .card > .row {
  width: 100%;
    color: white;
    display: flex;
    flex-wrap: nowrap;
  padding: 0.5rem;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  background: #00000080;
  backdrop-filter: blur(0.2rem);
  }

  .card > .row > .icon {
    background: #000;
   box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(255, 255, 255, 0.5) 0px -3px 0px inset;
    color: white;
    border-radius: 10px;
    width: 10%;
    min-width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px;
  }

  .card > .row > .metadata {
  flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    opacity: 0;
    transform: translateY(30px);
    transition-delay: 0.3s;
    transition: all 0.3s ease;

  }

  .metadata p {
    color: #b0b0ba;
    padding-top: 5px;
    margin: 0;
  }

  .metadata h4 {
    text-transform: uppercase;
    margin: 0;

  }

    .metadata p {

  }

  input {
    display: none;
  }

  input:checked + label {
    width: 600px;
  }

  input:checked + label .metadata {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;

const VerificationButton = styled(UploadButton)`
  width: 50%;
  margin: auto;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px inset, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px ;
`;

const media = [
  {
    id: "1",
    name: "Test",
    description: "TestDescription",
    url: "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    name: "Test 2",
    description: "TestDescription",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    name: "Test 3",
    description: "TestDescription",
    url: "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "4",
    name: "Test",
    description: "TestDescription",
    url: "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "5",
    name: "Test 2",
    description: "TestDescription",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "6",
    name: "Test 3",
    description: "TestDescription",
    url: "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "7",
    name: "Test",
    description: "TestDescription",
    url: "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  // {
  //   id: "8",
  //   name: "Test 2",
  //   description: "TestDescription",
  //   url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
  // {
  //   id: "9",
  //   name: "Test 3",
  //   description: "TestDescription",
  //   url: "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
  // {
  //   id: "10",
  //   name: "Test",
  //   description: "TestDescription",
  //   url: "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
  // {
  //   id: "11",
  //   name: "Test 2",
  //   description: "TestDescription",
  //   url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
  // {
  //   id: "12",
  //   name: "Test 3",
  //   description: "TestDescription",
  //   url: "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
  // {
  //   id: "13",
  //   name: "Test",
  //   description: "TestDescription",
  //   url: "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
  // {
  //   id: "14",
  //   name: "Test 2",
  //   description: "TestDescription",
  //   url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
  // {
  //   id: "15",
  //   name: "Test 3",
  //   description: "TestDescription",
  //   url: "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
];

export default MediaGallery;
