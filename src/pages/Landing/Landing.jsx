import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const Landing = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Container fluid className="vh-100 p-0 overflow-hidden">
      <Row className="h-100 g-0">
        {/* Mobile Header */}
        <div className="d-md-none bg-dark text-white text-center py-4">
          <h2>Welcome to Spyyral</h2>
          <p className="mb-0">Your Local Community Hub</p>
        </div>

        {/* Left Side */}
        <Col md={6} className="d-none d-md-flex bg-dark text-white align-items-center">
          <div className="p-5">
            <h1 className="display-4 mb-4">Welcome to Spyyral</h1>
            <p className="lead mb-4">
              Connect with your local community, share experiences, and discover what's happening in your neighborhood.
            </p>
            <div className="d-flex flex-column gap-4">
              <div className="p-4 rounded bg-opacity-10 bg-white">
                <h5>🌟 Hyper-Local Connection</h5>
                <p className="mb-0 text-white-50">Connect with people and events in your immediate vicinity.</p>
              </div>
              <div className="p-4 rounded bg-opacity-10 bg-white">
                <h5>🗺️ Location-Based Feed</h5>
                <p className="mb-0 text-white-50">See posts and updates from your neighborhood first.</p>
              </div>
              <div className="p-4 rounded bg-opacity-10 bg-white">
                <h5>👥 Community Building</h5>
                <p className="mb-0 text-white-50">Create and join local communities based on shared interests.</p>
              </div>
            </div>
          </div>
        </Col>

        {/* Right Side */}
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center bg-white py-4">
          <div className="w-100 px-4" style={{ maxWidth: '400px', perspective: '1000px' }}>
            <div style={{ 
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
              position: 'relative'
            }}>
              {/* Login Form */}
              <Card className="border-0 shadow-sm" style={{
                backfaceVisibility: 'hidden',
                position: isFlipped ? 'absolute' : 'relative',
                top: 0,
                width: '100%'
              }}>
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <h2 className="h3">Sign In</h2>
                    <p className="text-muted">Access your Spyyral account</p>
                  </div>

                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        size="lg"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        size="lg"
                      />
                    </Form.Group>

                    <div className="text-end mb-3">
                      <Link to="/forgot-password" className="text-decoration-none">
                        Forgot Password?
                      </Link>
                    </div>

                    <Button variant="dark" className="w-100 py-2 mb-3">
                      Sign In
                    </Button>

                    <Button variant="outline-dark" className="w-100 py-2 d-flex align-items-center justify-content-center gap-2">
                      <FaGoogle /> Continue with Google
                    </Button>

                    <div className="text-center mt-4">
                      <p className="mb-0">
                        Don't have an account?{' '}
                        <Button 
                          variant="link" 
                          className="text-decoration-none p-0" 
                          onClick={() => setIsFlipped(true)}
                        >
                          Sign up
                        </Button>
                      </p>
                    </div>
                  </Form>
                </Card.Body>
              </Card>

              {/* Signup Form */}
              <Card className="border-0 shadow-sm" style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                position: !isFlipped ? 'absolute' : 'relative',
                top: 0,
                width: '100%'
              }}>
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <h2 className="h3">Create Account</h2>
                    <p className="text-muted">Join the Spyyral community</p>
                  </div>

                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        size="lg"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        size="lg"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Create a password"
                        size="lg"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm your password"
                        size="lg"
                      />
                    </Form.Group>

                    <Button variant="dark" className="w-100 py-2 mb-3">
                      Create Account
                    </Button>

                    <Button variant="outline-dark" className="w-100 py-2 d-flex align-items-center justify-content-center gap-2">
                      <FaGoogle /> Continue with Google
                    </Button>

                    <div className="text-center mt-4">
                      <p className="mb-0">
                        Already have an account?{' '}
                        <Button 
                          variant="link" 
                          className="text-decoration-none p-0" 
                          onClick={() => setIsFlipped(false)}
                        >
                          Sign in
                        </Button>
                      </p>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
