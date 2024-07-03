import React, {useState} from "react";
import styled from "styled-components";
import {logoColors} from "../../../../styles/colors";
import MediaUpload from "../MediaUpload";



const MediaGallery = () => {
  const [isMediaUpload, setIsMediaUpload] = useState(false);

  const toggleMediaUpload = () => setIsMediaUpload(!isMediaUpload);
  return (
    <PageContainer>
      <UploadButton onClick={toggleMediaUpload}>Upload Media</UploadButton>
      <GalleryBanner>
      <h1>Uploaded Media</h1>
      <input type="text" />
      </GalleryBanner>
    <Gallery>
{media.map((content, index) => {
  const { id, name, description, url } = content || {};

  if (url) {
    return (
      <div key={id}>
        <input type="radio" name="slide" id={`c${id}`} />
        <label htmlFor={`c${id}`} className="card" style={{backgroundImage: `url(${url})`}}>
          <div className="row">
            <div className="icon">{id}</div>
            {/* <div className="description">
              <h4>{name}</h4>
              <p>{description}</p>
            </div> */}
          </div>
        </label>
      </div>
    );
  }
})}
</Gallery>

      {isMediaUpload && (
        <MediaUpload togglePopup={toggleMediaUpload}/>
      )}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
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


const GalleryBanner = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;

  input {
  width: 250px;
  margin: 0;
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
    color: white;
    display: flex;
    flex-wrap: nowrap;
  }

  .card > .row > .icon {
    background: #223;
    color: white;
    border-radius: 50%;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px;
  }

  .card > .row > .description {
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    height: 80px;
    width: 520px;
    opacity: 0;
    transform: translateY(30px);
    transition-delay: 0.3s;
    transition: all 0.3s ease;
  }

  .description p {
    color: #b0b0ba;
    padding-top: 5px;
  }

  .description h4 {
    text-transform: uppercase;
  }

  input {
    display: none;
  }

  input:checked + label {
    width: 600px;
  }

  input:checked + label .description {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
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
