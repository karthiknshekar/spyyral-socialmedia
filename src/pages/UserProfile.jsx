import { useState } from 'react';
import { Container, Card, Button, Image, Nav, Dropdown } from 'react-bootstrap';
import { FaEllipsisV, FaHeart, FaComment, FaEye, FaShare } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Dummy data for demonstration
const dummyUser = {
  id: 1,
  name: 'John Doe',
  username: '@johndoe',
  avatar: 'https://via.placeholder.com/150',
  coverImage: 'https://via.placeholder.com/1200x300',
  bio: 'Tech enthusiast | Coffee lover | Always learning',
  location: 'New York, USA',
  interests: ['Technology', 'Coffee', 'Travel', 'Photography'],
  friends: 245,
  posts: 89,
};

const dummyPosts = [
  {
    id: 1,
    content: 'Just discovered an amazing local café! The coffee is incredible. 🍵',
    image: 'https://via.placeholder.com/600x400',
    likes: 24,
    comments: 5,
    views: 120,
    timestamp: '2h ago',
  },
  {
    id: 2,
    content: 'Beautiful sunset at the park today! 🌅',
    image: 'https://via.placeholder.com/600x400',
    likes: 45,
    comments: 12,
    views: 230,
    timestamp: '1d ago',
  },
  // Add more dummy posts as needed
];

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');
  const isOwnProfile = true; // TODO: Implement actual check

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/login');
  };

  return (
    <div className="pb-5 mb-5">
      <Container className="py-3">
        {/* Cover Image */}
        <div
          className="rounded-3 mb-3"
          style={{
            height: '200px',
            backgroundImage: `url(${dummyUser.coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Profile Info */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="d-flex">
                <Image
                  src={dummyUser.avatar}
                  alt={dummyUser.name}
                  roundedCircle
                  width={100}
                  height={100}
                  className="border"
                  style={{ marginTop: '-50px' }}
                />
                <div className="ms-3 mt-2">
                  <h4 className="mb-1">{dummyUser.name}</h4>
                  <p className="text-muted mb-2">{dummyUser.username}</p>
                  <p className="mb-2">{dummyUser.bio}</p>
                  <p className="text-muted mb-0">
                    <small>📍 {dummyUser.location}</small>
                  </p>
                </div>
              </div>

              {isOwnProfile ? (
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="profile-actions">
                    <FaEllipsisV />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Edit Profile</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button variant="primary">Add Friend</Button>
              )}
            </div>

            <div className="d-flex gap-3 mb-3">
              <div className="text-center">
                <h6 className="mb-1">{dummyUser.friends}</h6>
                <small className="text-muted">Friends</small>
              </div>
              <div className="text-center">
                <h6 className="mb-1">{dummyUser.posts}</h6>
                <small className="text-muted">Posts</small>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2">
              {dummyUser.interests.map((interest, index) => (
                <span
                  key={index}
                  className="badge bg-light text-dark border"
                >
                  {interest}
                </span>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* Tabs */}
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'posts'}
              onClick={() => setActiveTab('posts')}
            >
              Posts
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'media'}
              onClick={() => setActiveTab('media')}
            >
              Media
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'likes'}
              onClick={() => setActiveTab('likes')}
            >
              Likes
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Posts */}
        <div className="d-flex flex-column gap-3">
          {dummyPosts.map((post) => (
            <Card key={post.id}>
              <Card.Body>
                <Card.Text>{post.content}</Card.Text>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post content"
                    className="img-fluid rounded mb-3"
                  />
                )}

                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-3">
                    <Button variant="outline-primary" size="sm">
                      <FaHeart className="me-1" />
                      {post.likes}
                    </Button>
                    <Button variant="outline-primary" size="sm">
                      <FaComment className="me-1" />
                      {post.comments}
                    </Button>
                    <Button variant="outline-primary" size="sm">
                      <FaEye className="me-1" />
                      {post.views}
                    </Button>
                    <Button variant="outline-primary" size="sm">
                      <FaShare />
                    </Button>
                  </div>
                  {isOwnProfile && (
                    <Dropdown>
                      <Dropdown.Toggle variant="light" size="sm">
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>Edit Post</Dropdown.Item>
                        <Dropdown.Item className="text-danger">
                          Delete Post
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>

      <Navbar />
    </div>
  );
};

export default UserProfile; 