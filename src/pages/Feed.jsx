import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ButtonGroup, Form, Image } from 'react-bootstrap';
import { FaHeart, FaComment, FaEye, FaShare, FaImage } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

const distanceOptions = ['1km', '5km', '10km', '25km', '50km', 'All'];

const dummyPosts = [
  {
    id: 1,
    user: { name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    content: 'Just discovered an amazing local café! The coffee is incredible. 🍵',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    likes: 24,
    comments: 5,
    views: 120,
    distance: '0.5km',
    timestamp: '2h ago',
  },
  {
    id: 2,
    user: { name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    content: 'Community cleanup event this weekend! Join us in making our neighborhood better. 🌿',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b',
    likes: 45,
    comments: 12,
    views: 230,
    distance: '1.2km',
    timestamp: '4h ago',
  },
  {
    id: 3,
    user: { name: 'Mike Johnson', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    content: 'Beautiful sunset at our local park today! 🌅',
    image: 'https://images.unsplash.com/photo-1472120435266-53107fd0c44a',
    likes: 89,
    comments: 15,
    views: 340,
    distance: '0.8km',
    timestamp: '5h ago',
  },
];

const Feed = () => {
  const [distance, setDistance] = useState(1);
  const [newPost, setNewPost] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const feedRef = useRef(null);

  // Handle scroll event to adjust distance
  useEffect(() => {
    const handleScroll = () => {
      if (feedRef.current) {
        const scrollPosition = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / maxScroll) * 100;
        
        // Adjust distance based on scroll percentage (max 50km)
        const newDistance = Math.min(Math.max(Math.round(scrollPercentage / 2), 1), 50);
        setDistance(newDistance);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDistance = (value) => {
    return `${value}km`;
  };

  const handleDistanceChange = (e) => {
    setDistance(Number(e.target.value));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL for images
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim() || selectedFile) {
      // Here you would typically send the post and file to your backend
      console.log('New post:', newPost);
      console.log('Selected file:', selectedFile);
      setNewPost('');
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Header />
      <div className="pb-5 mb-5 pt-5 mt-2" ref={feedRef}>
        <Container className="px-0 px-md-2">
          <Row className="justify-content-center mx-0">
            <Col xs={12} md={8} lg={6} className="px-0 px-md-3">
              {/* Quick Post */}
              <Card className="shadow-sm mb-3">
                <Card.Body>
                  <Form onSubmit={handlePostSubmit}>
                    <div className="d-flex gap-3">
                      <Image 
                        src="https://randomuser.me/api/portraits/men/1.jpg" 
                        roundedCircle 
                        width={40} 
                        height={40} 
                      />
                      <div className="flex-grow-1">
                        <Form.Control
                          as="textarea"
                          placeholder="What's happening in your area?"
                          rows={2}
                          className="mb-3 border-0 bg-light"
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                        />
                        
                        {/* Preview selected image */}
                        {previewUrl && (
                          <div className="position-relative mb-3">
                            <Image 
                              src={previewUrl} 
                              fluid 
                              rounded 
                              style={{ maxHeight: '200px', objectFit: 'cover' }}
                            />
                            <Button
                              variant="dark"
                              size="sm"
                              className="position-absolute top-0 end-0 m-2 rounded-circle"
                              onClick={clearSelectedFile}
                            >
                              ×
                            </Button>
                          </div>
                        )}

                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex gap-2">
                            <Form.Control
                              type="file"
                              ref={fileInputRef}
                              className="d-none"
                              accept="image/*,video/*"
                              onChange={handleFileSelect}
                            />
                            <Button 
                              variant="outline-dark" 
                              size="sm"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <FaImage className="me-2" />
                              Add Media
                            </Button>
                          </div>
                          <Button
                            variant="dark"
                            type="submit"
                            disabled={!newPost.trim() && !selectedFile}
                            className="px-4 rounded-pill"
                          >
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                </Card.Body>
              </Card>

              {/* Distance Filter */}
              <div className="sticky-top bg-white py-3 px-3 border-bottom shadow-sm" style={{ top: '56px' }}>
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">Distance Range:</h6>
                    <span className="text-primary fw-bold">{formatDistance(distance)}</span>
                  </div>
                  <RangeSlider
                    value={distance}
                    onChange={handleDistanceChange}
                    min={1}
                    max={50}
                    tooltip='off'
                    variant='primary'
                    className="distance-slider"
                  />
                  <small className="text-muted text-center mt-1">
                    Scroll down to see posts from further away
                  </small>
                </div>
              </div>

              {/* Posts */}
              {dummyPosts
                .filter(post => parseFloat(post.distance) <= distance)
                .map((post) => (
                <Card key={post.id} className="shadow-sm mb-3">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <Image src={post.user.avatar} roundedCircle width={40} height={40} className="me-2" />
                      <div>
                        <div className="fw-bold">{post.user.name}</div>
                        <small className="text-muted">
                          {post.distance} • {post.timestamp}
                        </small>
                      </div>
                    </div>

                    <p className="mb-3">{post.content}</p>
                    {post.image && (
                      <div className="mb-3">
                        <Image src={post.image} fluid rounded style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }} />
                      </div>
                    )}

                    {/* Engagement Stats */}
                    <div className="d-flex flex-wrap gap-2">
                      <Button variant="outline-dark" size="sm">
                        <FaHeart className="me-2" />
                        <span className="d-none d-sm-inline">Like</span>
                        <span className="ms-1">{post.likes}</span>
                      </Button>
                      <Button variant="outline-dark" size="sm">
                        <FaComment className="me-2" />
                        <span className="d-none d-sm-inline">Comment</span>
                        <span className="ms-1">{post.comments}</span>
                      </Button>
                      <Button variant="outline-dark" size="sm">
                        <FaEye className="me-2" />
                        <span className="d-none d-sm-inline">Views</span>
                        <span className="ms-1">{post.views}</span>
                      </Button>
                      <Button variant="outline-dark" size="sm">
                        <FaShare className="me-2" />
                        <span className="d-none d-sm-inline">Share</span>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </Container>

        <Navbar />
      </div>
    </>
  );
};

export default Feed;
