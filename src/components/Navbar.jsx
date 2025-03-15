import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaComments, FaCamera, FaGlobe } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const handleCameraClick = () => {
    // Check if the device has camera access
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          // Here you can implement the camera UI/functionality
          // For now, we'll just open the file input with camera as source
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.capture = 'environment';
          input.click();
          
          // Clean up the stream when done
          stream.getTracks().forEach(track => track.stop());
        })
        .catch((err) => {
          console.error("Error accessing camera:", err);
          alert("Unable to access camera. Please check your camera permissions.");
        });
    } else {
      alert("Sorry, your device doesn't support camera access");
    }
  };

  const navItemClass = (path) => `
    text-decoration-none 
    d-flex 
    flex-column 
    align-items-center 
    justify-content-center 
    w-100
    ${isActive(path) ? 'text-dark' : 'text-secondary'}
  `;

  return (
    <Nav className="fixed-bottom bg-white border-top" style={{ 
      height: '65px',
      paddingBottom: 'env(safe-area-inset-bottom)'  // For iOS devices with home indicator
    }}>
      <div className="d-flex justify-content-between align-items-center w-100 h-100 px-3">
        <Nav.Item style={{ width: '48px' }}>
          <Link to="/feed" className={navItemClass('/feed')}>
            <FaHome size={20} className="mb-1" />
            <small style={{ fontSize: '0.65rem', lineHeight: 1 }}>Home</small>
          </Link>
        </Nav.Item>

        <Nav.Item style={{ width: '48px' }}>
          <Link to="/friends" className={navItemClass('/friends')}>
            <FaUsers size={20} className="mb-1" />
            <small style={{ fontSize: '0.65rem', lineHeight: 1 }}>Friends</small>
          </Link>
        </Nav.Item>

        <Nav.Item style={{ width: '48px' }}>
          <div 
            onClick={handleCameraClick}
            className="d-flex flex-column align-items-center justify-content-center w-100"
            style={{ cursor: 'pointer' }}
          >
            <div className="bg-dark rounded-circle d-flex align-items-center justify-content-center" 
                 style={{ width: '38px', height: '38px' }}>
              <FaCamera size={18} className="text-white" />
            </div>
          </div>
        </Nav.Item>

        <Nav.Item style={{ width: '48px' }}>
          <Link to="/messages" className={navItemClass('/messages')}>
            <FaComments size={20} className="mb-1" />
            <small style={{ fontSize: '0.65rem', lineHeight: 1 }}>Messages</small>
          </Link>
        </Nav.Item>

        <Nav.Item style={{ width: '48px' }}>
          <Link to="/communities" className={navItemClass('/communities')}>
            <FaGlobe size={20} className="mb-1" />
            <small style={{ fontSize: '0.65rem', lineHeight: 1 }}>Communities</small>
          </Link>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default Navbar; 