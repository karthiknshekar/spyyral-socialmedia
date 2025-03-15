import { useState } from 'react';
import { Container, Card, Form, Button, InputGroup, Nav, Badge } from 'react-bootstrap';
import { FaSearch, FaUserPlus, FaComment } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Dummy data for demonstration
const dummyFriends = [
  {
    id: 1,
    name: 'John Doe',
    username: '@johndoe',
    avatar: 'https://via.placeholder.com/50',
    mutualFriends: 5,
    online: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: '@janesmith',
    avatar: 'https://via.placeholder.com/50',
    mutualFriends: 3,
    online: false,
  },
  // Add more dummy friends as needed
];

const dummyRequests = [
  {
    id: 1,
    name: 'Alice Johnson',
    username: '@alicej',
    avatar: 'https://via.placeholder.com/50',
    mutualFriends: 2,
  },
  // Add more dummy requests as needed
];

const dummySuggestions = [
  {
    id: 1,
    name: 'Bob Wilson',
    username: '@bobw',
    avatar: 'https://via.placeholder.com/50',
    mutualFriends: 4,
  },
  // Add more dummy suggestions as needed
];

const Friends = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('friends');
  const [searchQuery, setSearchQuery] = useState('');

  const handleMessage = (userId) => {
    navigate(`/messages?user=${userId}`);
  };

  return (
    <div className="pb-5 mb-5">
      <Container className="py-3">
        {/* Search */}
        <InputGroup className="mb-4">
          <InputGroup.Text className="bg-white border-end-0">
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-start-0"
          />
        </InputGroup>

        {/* Tabs */}
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'friends'}
              onClick={() => setActiveTab('friends')}
            >
              Friends
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'requests'}
              onClick={() => setActiveTab('requests')}
            >
              Requests <Badge bg="primary">2</Badge>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'suggestions'}
              onClick={() => setActiveTab('suggestions')}
            >
              Suggestions
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Content */}
        <div className="d-flex flex-column gap-3">
          {activeTab === 'friends' &&
            dummyFriends.map((friend) => (
              <Card key={friend.id}>
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <div className="position-relative">
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="rounded-circle me-3"
                        width="50"
                        height="50"
                      />
                      {friend.online && (
                        <div
                          className="position-absolute bottom-0 end-0 bg-success rounded-circle"
                          style={{ width: '12px', height: '12px' }}
                        />
                      )}
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{friend.name}</h6>
                      <p className="mb-1 text-muted small">{friend.username}</p>
                      <p className="mb-0 text-muted small">
                        {friend.mutualFriends} mutual friends
                      </p>
                    </div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleMessage(friend.id)}
                    >
                      <FaComment /> Message
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}

          {activeTab === 'requests' &&
            dummyRequests.map((request) => (
              <Card key={request.id}>
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <img
                      src={request.avatar}
                      alt={request.name}
                      className="rounded-circle me-3"
                      width="50"
                      height="50"
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{request.name}</h6>
                      <p className="mb-1 text-muted small">{request.username}</p>
                      <p className="mb-0 text-muted small">
                        {request.mutualFriends} mutual friends
                      </p>
                    </div>
                    <div className="d-flex gap-2">
                      <Button variant="primary" size="sm">
                        Accept
                      </Button>
                      <Button variant="outline-secondary" size="sm">
                        Decline
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}

          {activeTab === 'suggestions' &&
            dummySuggestions.map((suggestion) => (
              <Card key={suggestion.id}>
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <img
                      src={suggestion.avatar}
                      alt={suggestion.name}
                      className="rounded-circle me-3"
                      width="50"
                      height="50"
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{suggestion.name}</h6>
                      <p className="mb-1 text-muted small">{suggestion.username}</p>
                      <p className="mb-0 text-muted small">
                        {suggestion.mutualFriends} mutual friends
                      </p>
                    </div>
                    <Button variant="primary" size="sm">
                      <FaUserPlus className="me-1" /> Add Friend
                    </Button>
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

export default Friends; 