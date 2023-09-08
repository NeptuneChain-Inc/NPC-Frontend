import React, { useState } from 'react'
import styled from 'styled-components'
import appIcon from '../assets/icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown, faSearch, faXmark, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

const Navbar = ({ handleSidebar, sidebarOpen }) => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <NavbarContainer data-thq="thq-navbar">
      {sidebarOpen ? (
        <Icon icon={faXmark} onClick={handleSidebar}/>
      ) : (
        <Logo alt="logo" src={appIcon} onClick={handleSidebar}/>
      )}
      <HeaderSearchContainer>
        <SearchIcon icon={faSearch} />
        <Searchbar
          type="text"
          name="searcg"
          placeholder="Search..."
          projVariant="input"
        />
      </HeaderSearchContainer>
      <DesktopMenu>
        <NotificationIcon icon={faBell} />
        <UserProfile>
          <ProfilePicture
            alt="image"
            src="https://play.teleporthq.io/static/svg/default-img.svg"
          />
          <ProfileDropMenu>
            <DropdownToggle data-thq="thq-dropdown-toggle">
              <Text>username</Text>
              <DropdownArrow data-thq="thq-dropdown-arrow">
                <Icon icon={faCaretDown} />
              </DropdownArrow>
            </DropdownToggle>
            <DropdownList data-thq="thq-dropdown-list">
              <Dropdown data-thq="thq-dropdown" projVariant="listItem">
                <DropdownToggle1 data-thq="thq-dropdown-toggle">
                  <Text01>Sub-menu Item</Text01>
                </DropdownToggle1>
              </Dropdown>
              <Dropdown1 data-thq="thq-dropdown" projVariant="listItem">
                <DropdownToggle2 data-thq="thq-dropdown-toggle">
                  <Text02>Sub-menu Item</Text02>
                </DropdownToggle2>
              </Dropdown1>
              <Dropdown2 data-thq="thq-dropdown" projVariant="listItem">
                <DropdownToggle3 data-thq="thq-dropdown-toggle">
                  <Text03>Sub-menu Item</Text03>
                </DropdownToggle3>
              </Dropdown2>
            </DropdownList>
          </ProfileDropMenu>
        </UserProfile>
        <LogOutButton>Logout</LogOutButton>
      </DesktopMenu>
      <BurgerMenu icon={faBars} onClick={() => setIsMobileMenuOpen(true)} />
      <MobileMenu isOpen={isMobileMenuOpen}>
        <CloseMenu icon={faTimes} onClick={() => setIsMobileMenuOpen(false)} />
        <Nav>
          <Top>
            <Logo1
              alt="image"
              src="https://presentation-website-assets.teleporthq.io/logos/logo.png"
            />
            <CloseMenu data-thq="thq-close-menu">
              <Icon icon={faXmark} />
            </CloseMenu>
          </Top>
          <Links>
            <Text04>About</Text04>
            <Text05>Features</Text05>
            <Text06>Pricing</Text06>
            <Text07>Team</Text07>
            <Text08>Blog</Text08>
          </Links>
          <Buttons1>
            <Login projVariant="button">Login</Login>
            <Register projVariant="button">Register</Register>
          </Buttons1>
        </Nav>
        <div>
          <Icon10 viewBox="0 0 950.8571428571428 1024">
            <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
          </Icon10>
          <Icon12 viewBox="0 0 877.7142857142857 1024">
            <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
          </Icon12>
          <Icon14 viewBox="0 0 602.2582857142856 1024">
            <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
          </Icon14>
        </div>
      </MobileMenu>
    </NavbarContainer>
  )
}

const NavbarContainer = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  box-shadow: 0px 2px 2px 0px #d4d4d4;
  max-height: 75px;
  align-items: center;
  padding: 1rem;
  justify-content: space-between;
  background-color: #ffffff;

  box-sizing: border-box;
  
  border: 2px solid yellow;

  @media (max-width: 767px) {
    padding: 2rem;
  }

  @media (max-width: 479px) {
    padding: 1rem;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  width: 1rem;
  margin: auto;
  transition: 0.3s ease-in-out;

  &:hover {
    scale: 1.15;
  }
`;

const Logo = styled.img`
  width: 40px;
  height: auto;
`;

const HeaderSearchContainer = styled.div`
  flex: 0 0 auto;
  width: 288px;
  height: 30px;
  display: flex;
  align-items: flex-start;
  border-radius: 4px;
  background-color: #eeeeee;
  margin-left: 0.5rem;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  width: auto;
  height: 60%;
  margin: auto;
  margin-left: 5px;
  padding: 5px;
  transition: 0.3s ease-in-out;

  &:hover {
    scale: 1.15;
  }
`;

const Searchbar = styled.input`
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-family: 'Work Sans';
  border-width: 0px;
  padding-left: 0.5rem;
  border-radius: 2px;
  background-color: transparent;
`;

const DesktopMenu = styled.div`
  flex: 1;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 767px) {
    display: none;
  }
`;

const Buttons = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  padding-left: 0px;
  padding-right: 0px;
  flex-direction: row;
  justify-content: space-between;
`;

const NotificationIcon = styled(Icon)`
  height: 100%;
  
  margin: 0 0.25rem;
`;

const UserProfile = styled.div`
  flex: 0 0 auto;
  width: auto;
  height: 80%;
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  justify-content: flex-start;
`;

const ProfilePicture = styled.img`
  width: auto;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const ProfileDropMenu = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  border-radius: 2px;
`;

const DropdownToggle = styled.div`
  fill: #595959;
  color: #595959;
  width: 100%;
  display: inline-flex;
  align-items: center;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  border-radius: 2px;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
`;

const Text = styled.span`
  font-size: 14px;
  font-style: normal;
  text-align: center;
  font-family: 'Work Sans';
  font-weight: 500;
  margin-right: 4px;
  vertical-align: middle;
`;

const DropdownArrow = styled.div`
  transition: 0.3s;
`;

const Icon04 = styled.svg`
  width: 18px;
  height: 18px;
  margin-top: auto;
  transform: rotate(90deg);
  margin-bottom: auto;
`;

const DropdownList = styled.ul`
  left: 0%;
  width: max-content;
  z-index: 100;
  display: none;
  min-width: 100%;
  position: absolute;
  align-items: stretch;
  transition: 0.3s;
  border-color: #D9D9D9;
  border-width: 1px;
  border-radius: 4px;
  flex-direction: column;
  list-style-type: none;
  background-color: grey;
  list-style-position: inside;
`;

const Dropdown = styled.li`
  cursor: pointer;
  display: inline-block;
  position: relative;
  border-radius: 2px;
`;

const DropdownToggle1 = styled.div`
  fill: #595959;
  color: #595959;
  width: 100%;
  display: inline-flex;
  align-items: center;
  padding-top: 0.5rem;
  transition: 0.3s;
  padding-left: 1rem;
  border-radius: 4px;
  padding-right: 1rem;
  padding-bottom: 0.5rem;

  &:hover {
    fill: #fff;
    color: #fff;
    background-color: #595959;
  }
`;

const Text01 = styled.span`
  width: 100%;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;

const Dropdown1 = styled.li`
  cursor: pointer;
  display: inline-block;
  position: relative;
  border-radius: 2px;
`;

const DropdownToggle2 = styled.div`
  fill: #595959;
  color: #595959;
  width: 100%;
  display: inline-flex;
  align-items: center;
  padding-top: 0.5rem;
  transition: 0.3s;
  padding-left: 1rem;
  border-radius: 4px;
  padding-right: 1rem;
  padding-bottom: 0.5rem;

  &:hover {
    fill: #fff;
    color: #fff;
    background-color: #595959;
  }
`;

const Text02 = styled.span`
  width: 100%;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;

const Dropdown2 = styled.li`
  cursor: pointer;
  display: inline-block;
  position: relative;
  border-radius: 2px;
`;

const DropdownToggle3 = styled.div`
  fill: #595959;
  color: #595959;
  width: 100%;
  display: inline-flex;
  align-items: center;
  padding-top: 0.5rem;
  transition: 0.3s;
  padding-left: 1rem;
  border-radius: 4px;
  padding-right: 1rem;
  padding-bottom: 0.5rem;

  &:hover {
    fill: #fff;
    color: #fff;
    background-color: #595959;
  }
`;

const Text03 = styled.span`
  width: 100%;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;

const LogOutButton = styled.button`
  color: #ffffff;
  height: 100%;
  font-size: 12px;
  font-family: 'Work Sans';
  background-color: #134b5f;
`;

const BurgerMenu = styled(FontAwesomeIcon)`
  display: none;

  @media (max-width: 768px) {
    display: block;
    font-size: 1.2rem;
  }
`;

const Icon06 = styled.svg`
  width: 1rem;
  height: 1rem;
`;


const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CloseMenu = styled(FontAwesomeIcon)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
`;

const Nav = styled.div`
display: flex;
align-items: flex-start;
flex-direction: column;
`;

const Top = styled.div`
width: 100%;
display: flex;
align-items: center;
margin-bottom: 3rem;
justify-content: space-between;
`;

const Logo1 = styled.img`
height: 2rem;
`;

// const CloseMenu = styled.div`
// display: flex;
// align-items: center;
// justify-content: center;
// `;

const Icon08 = styled.svg`
width: 1rem;
height: 1rem;
`;

const Links = styled.nav`
flex: 0 0 auto;
display: flex;
align-self: flex-start;
align-items: flex-start;
flex-direction: column;
`;

const Text04 = styled.span`
margin-bottom: 1rem;

@media (max-width: 767px) {
  margin-bottom: 1rem;
}
`;

const Text05 = styled.span`
margin-bottom: 1rem;

@media (max-width: 767px) {
  margin-left: 0;
  margin-bottom: 1rem;
}
`;

const Text06 = styled.span`
margin-bottom: 1rem;

@media (max-width: 767px) {
  margin-left: 0;
  margin-bottom: 1rem;
}
`;

const Text07 = styled.span`
margin-bottom: 1rem;

@media (max-width: 767px) {
  margin-left: 0;
  margin-bottom: 1rem;
}
`;

const Text08 = styled.span`
margin-bottom: 1rem;

@media (max-width: 767px) {
  margin-left: 0;
  margin-bottom: 1rem;
}
`;

const Buttons1 = styled.div`
display: flex;
margin-top: 1rem;
align-items: center;
flex-direction: row;
justify-content: space-between;
`;

const Login = styled.button`
margin-right: 2rem;
`;

const Register = styled.button``;

const Icon10 = styled.svg`
width: 1rem;
height: 1rem;
margin-right: 2rem;
`;

const Icon12 = styled.svg`
width: 1rem;
height: 1rem;
margin-right: 2rem;
`;

const Icon14 = styled.svg`
width: 1rem;
height: 1rem;
`;

export default Navbar