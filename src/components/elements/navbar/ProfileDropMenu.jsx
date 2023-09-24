import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
// import { testFunction } from '../../../functions/verifierFunctions';

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 50px;
  justify-content: flex-start;
  cursor: pointer;
  flex-wrap: nowrap;
  z-index: 999;

  .user-type {
    display: flex;
    justify-content: flex-start;
    font-size: 0.7rem;
    //border: 1px solid black;

  }

  .error {
    color: red;
    font-size: 0.5rem;
  }
`;

const ProfilePicture = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const ProfileDropMenuContainer = styled.div`
  display: flex;
  width: auto;
  min-width: 150px;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: nowrap;
  position: relative;
  transition: 0.3s ease-in-out;
  padding-bottom: 4px;
  border-bottom: 1px solid #33333380;

  @media (max-width: 767px){
    width: 80%;
  }
 

  span {
    font-size: 0.8rem;
    white-space: nowrap;
  overflow: hidden;
    width: 100px;
    margin-right: 0.5rem;
    text-overflow: ellipsis;

  }
`;

const ProfileDropMenuItems = styled(motion.div)`
  position: absolute;
  width: 100%;
  top: 3rem;  /* Updated based on the new sizes */
  z-index: 1;
  background-color: #fff;
  border: 1px solid #ccc;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 1rem;
  transition: transform 0.3s ease-in-out;
  transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const ListItem = styled.div`
  padding: 5px;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const DropdownSection = styled.div`
  border-top: 1px solid #ccc;
  `;

const SectionHeader = styled.p`
  font-size: 0.8rem;
  color: #999;
`;


const variants = {
  open: { opacity: 1, height: 'auto' },
  closed: { opacity: 0, height: 0 }
};

export const ProfileDropMenu = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate();

  return (
    <UserProfile>
    <ProfileDropMenuContainer onClick={() => setIsOpen(!isOpen)}>
    <ProfilePicture
          alt="image"
          src="https://play.teleporthq.io/static/svg/default-img.svg"
        />
        <span>{user?.username ? user.username : user?.email ? user.email : 'logged out'}</span>
        <Icon icon={faCaretDown} isOpen={isOpen}/>
      <AnimatePresence>
        {isOpen && (
          <ProfileDropMenuItems
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
          >
            <DropdownSection>
                <SectionHeader>Profile</SectionHeader>
                <ListItem>View Profile</ListItem>
                <ListItem>Edit Profile</ListItem>
              </DropdownSection>
              <DropdownSection>
                <SectionHeader>Media</SectionHeader>
                <ListItem onClick={()=>navigate('/features/upload-video')}>Upload Video</ListItem>
                <ListItem onClick={()=>navigate('/features/stream')}>Start Stream</ListItem>
              </DropdownSection>
              <DropdownSection>
                <SectionHeader>Settings</SectionHeader>
                <ListItem>Alert settings</ListItem>
                <ListItem>Change Password</ListItem>
                <ListItem>Data Sharing</ListItem>
                <ListItem>Privacy Settings</ListItem>
                {/* <ListItem onClick={testFunction}>Test Verifier Function</ListItem> */}
              </DropdownSection>
          </ProfileDropMenuItems>
        )}
      </AnimatePresence>
    </ProfileDropMenuContainer>
    <div className={`user-type ${!user?.type && 'error'}`}>{user?.type ? user.type : 'account type not defined'}</div>
    </UserProfile>
  );
};


export default ProfileDropMenu;