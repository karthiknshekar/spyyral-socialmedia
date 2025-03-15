import React from 'react';
import { Navbar, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <Navbar className="bg-white border-bottom shadow-sm fixed-top">
      <Container fluid className="px-3">
        <Navbar.Brand as={Link} to="/feed" className="d-flex align-items-center">
          <span className="h4 mb-0">Spyyral</span>
        </Navbar.Brand>
        
        <Link 
          to="/profile" 
          className="text-decoration-none d-flex align-items-center text-dark"
        >
          <Image
            src="https://randomuser.me/api/portraits/men/1.jpg"
            roundedCircle
            width={32}
            height={32}
            className="border"
          />
        </Link>
      </Container>
    </Navbar>
  );
};

export default Header; 