import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-wrap: nowrap;
`;

const ProfilePicture = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const ProfileDropMenuContainer = styled.div`
  display: flex;
  width: auto;
  min-width: 150px;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  position: relative;
  transition: 0.3s ease-in-out;

  @media (max-width: 767px){
    width: 80%;
  }
 

  span {
    font-size: 1rem;
    white-space: nowrap;
  overflow: hidden;
    width: 100px;
    margin-right: 0.5rem;
    text-overflow: ellipsis;
     border-bottom: 1px solid #33333380;
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

  return (
    <UserProfile>
    <ProfileDropMenuContainer onClick={() => setIsOpen(!isOpen)}>
    <ProfilePicture
          alt="image"
          src="https://play.teleporthq.io/static/svg/default-img.svg"
        />
        <span>{user?.username ? user.username : user?.email ? user.email : 'logged out'}</span>
        <Icon icon={faCaretDown}/>
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
                <SectionHeader>Settings</SectionHeader>
                <ListItem>Change Password</ListItem>
                <ListItem>Privacy Settings</ListItem>
              </DropdownSection>
          </ProfileDropMenuItems>
        )}
      </AnimatePresence>
    </ProfileDropMenuContainer>
    </UserProfile>
  );
};


export default ProfileDropMenu;