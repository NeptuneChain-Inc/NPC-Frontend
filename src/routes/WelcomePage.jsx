import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { auth } from '../apis/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import appLogo from '../assets/logo.png';
import { environmentalRotation } from '../assets/animations';
import * as THREE from 'three';


const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #89CFF0a1;
  color: #FFF; 
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 1);

  .rememberPrompt {
    margin-top: 15px;
    font-size: 0.8rem;
    color: #222;
  }
`;

const WelcomeContainer = styled(motion.div)`

`;

const BackgroundAnimation = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.5s ease-in-out;
  ${({ loading }) => loading ? `
  background-color: #fff;
  z-index: 100;
  `: `
  display: none;
  `}
  
`;

// Background div for Three.js
const ThreeBackground = styled(motion.div)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #fff;
  overflow: hidden;
`;

const WelcomeMessage = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 20px;
  z-index: 1;
  // background: #ffffff50;
  // backdrop-filter: blur(20px);
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.img`
  height: 50px;
  width: auto;
  margin-bottom: 10px;
  z-index: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const StyledLink = styled(Link)`
  margin: 20px;
  text-decoration: none;
  color: #FFF;
  background-color: #0077b6;
  padding: 15px 30px;
  border-radius: 50px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056b3;
    color: white;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
`;

const StyledButton = styled.button`
  background-color: #0e76a8;
  color: #FFF;
  padding: 15px 30px;
  border-radius: 50px;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #084461;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
`;

const containerVariant = {
  hidden: { opacity: 0, y: '-10vh' },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '10vh' },
};

export default function WelcomePage() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('Guest');
  const [isLoading, setIsLoading] = useState(true);
  const threeRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeRef.current.appendChild(renderer.domElement);

    // Set the background color to a deep ocean blue
    scene.background = new THREE.Color(0x87CEEB);

    // Add basic ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);

    const geometry = new THREE.BufferGeometry();

    // Number of divisions along each axis
    const widthSegments = 32;
    const heightSegments = 32;

    // Size of the plane
    const width = 5;
    const height = 5;

    // Array to hold vertices
    const _vertices = [];

    for (let i = 0; i <= widthSegments; i++) {
      const x = (i / widthSegments) * width - width / 2;

      for (let j = 0; j <= heightSegments; j++) {
        const y = (j / heightSegments) * height - height / 2;

        // Push x, y, and z coordinates for each vertex
        _vertices.push(x, y, 0);
      }
    }

    const vertices = new Float32Array(_vertices);

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    // Change material color to a shade of blue
    const material = new THREE.MeshBasicMaterial({ color: 0x1a74da, wireframe: true });
    const water = new THREE.Mesh(geometry, material);
    water.rotation.x = -Math.PI / 2;  // Make sure the plane is rotated correctly
    scene.add(water);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      // Manipulate vertices here
      const vertices = water.geometry.attributes.position.array;
      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        const distance = Math.sqrt(x * x + y * y);
        vertices[i + 2] = Math.sin(distance + Date.now() * 0.001) * 0.2;
      }

      water.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    // Handle window resize
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    }

    window.addEventListener('resize', handleResize);

    animate();

    return () => {
      renderer.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle user authentication state
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user && user.username) {
      setLoggedIn(true);
      setUsername(user.username);
    }

    if (Cookies.get('skipWelcome')) {
      navigate('/main');
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Do something with the user object
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    //Dummy Loading
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, [])


  // Dynamic welcome message based on time of day
  const getDynamicWelcomeMessage = (username) => {
    const hours = new Date().getHours();
    let timeOfDay = 'Day';
    if (hours < 12) {
      timeOfDay = 'Morning';
    } else if (hours < 18) {
      timeOfDay = 'Afternoon';
    } else {
      timeOfDay = 'Evening';
    }
    return `Good ${timeOfDay}, ${username}`;
  };

  // Define Lottie options
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: environmentalRotation,
  };

  const handleOpen = () => {
    navigate('/main');
  };

  const handleSkip = (e) => {
    Cookies.set('skipWelcome', String(e.target.checked), { expires: 7 });
  };

  return (
    <Container>
      <ThreeBackground 
      ref={threeRef}
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      />
      <BackgroundAnimation loading={isLoading}>
        <Lottie options={lottieOptions} height={100} width={100} />
      </BackgroundAnimation>
      {!isLoading && (
        <WelcomeContainer
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <WelcomeMessage>{getDynamicWelcomeMessage(username)}</WelcomeMessage>
          <Logo src={appLogo} alt="NeptuneChain Logo" />
          <ButtonContainer>
            {!loggedIn && (
              <>
                <StyledLink to="/register">Register</StyledLink>
                <StyledLink to="/login">Log In</StyledLink>
              </>
            )}
            {loggedIn && <StyledButton onClick={handleOpen}>Open Dashboard</StyledButton>}
          </ButtonContainer>
          {loggedIn && (
            <div className='rememberPrompt'>
              <input type="checkbox" onChange={handleSkip} />
              <label>Skip Welcome Page Next Time</label>
            </div>
          )}
        </WelcomeContainer>
      )}
    </Container>
  );
}
